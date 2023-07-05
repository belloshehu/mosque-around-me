import Image from "next/image";
import userImage from "../_images/avatar.jpg";

const MosqueAdmin = ({ user }) => {
  const { firstName, otherName, image, phoneNumber } = user;
  return (
    <div className="w-fit h-fit rounded-md text-white flex flex-col gap-3 bg-purple-950 absolute -bottom-20 right-5">
      <Image
        src={image || userImage}
        alt={firstName}
        className="w-full h-1/2 lg:w-[200px]"
      />
      <div className="p-4 text-white flex flex-col gap-1 items-center">
        <h4 className="font-semibold text-xl">
          {firstName} {otherName}
        </h4>
        <p>{phoneNumber}</p>
      </div>
    </div>
  );
};

export default MosqueAdmin;
