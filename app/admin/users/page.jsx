"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import TabCollection from "../../_components/TabCollection";
import { usersPageTabsData } from "../../data";
import User from "../../_components/User";
import { setAdminUsers } from "../../GlobalRedux/user/userSlice";
import axios from "axios";

const MosqueAdminUsers = () => {
  // redirect to this page after login
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login?callbackUrl=/profile");
    },
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { adminUsers } = useSelector((store) => store.user);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/admin/`, {
          next: {
            invalidate: 0,
          },
        });
        dispatch(setAdminUsers(data.adminUsers));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  // useEffect(() => {}, [adminUsers]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center justify-items-center">
        <FaSpinner className="text-xl animate-spin" />
      </div>
    );
  }
  const approvedAdmins = adminUsers?.filter((user) => user.verified === true);
  const suspendedAdmins = adminUsers?.filter(
    (user) => user.verified === true && user.active === false
  );

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <TabCollection tabDataArray={usersPageTabsData}>
        <div>
          <div className="flex gap-3 flex-col">
            {adminUsers?.map((user, index) => (
              <User user={user} key={index} />
            ))}
          </div>
        </div>
        <div>
          {approvedAdmins.length > 0 ? (
            <div>
              {approvedAdmins?.map((user, index) => (
                <User user={user} key={index} />
              ))}
            </div>
          ) : (
            <p>No approved admin users</p>
          )}
        </div>
        <div>
          {suspendedAdmins.length > 0 ? (
            <div>
              {suspendedAdmins?.map((user, index) => (
                <User user={user} key={index} />
              ))}
            </div>
          ) : (
            <p>No suspended user</p>
          )}
        </div>
      </TabCollection>
    </div>
  );
};

export default MosqueAdminUsers;
