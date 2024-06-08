"use client";

import { Suspense, useEffect, useState } from "react";
import TabCollection from "../_components/TabCollection";
import { notificationPageTabsData } from "../data";
import { getAPIPayload } from "../utils/api";
import { Notification } from "../_components/Notification";

const Page = async () => {
  const [notifications, setNotifications] = useState([]);

  const getData = async () => {
    const response = await getAPIPayload("/api/notification");
    setNotifications(response?.notifications);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">Notifications</h2>
      <TabCollection tabDataArray={notificationPageTabsData}>
        <div>
          <Suspense
            fallback={
              <div>
                <span>Loading ...</span>
              </div>
            }>
            {notifications ? (
              <div>
                {notifications?.map((notification) => (
                  <Notification {...notification} key={notification._id} />
                ))}
              </div>
            ) : (
              <p>You have no nofitications</p>
            )}
          </Suspense>
        </div>
        <div>
          <p>You have no hidden nofitications</p>
        </div>
      </TabCollection>
    </div>
  );
};

export default Page;
