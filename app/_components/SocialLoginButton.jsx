"use client";
import { styles } from "../styles";
import Image from "next/image";
import { signIn } from "next-auth/react";

const SocialLoginButton = ({ socialIcon, text, provider }) => {
  return (
    <div className="flex flex-col lg:flex-row p-0 w-full text-black">
      <button
        onClick={() => signIn(provider)}
        className={`${styles.buttonFluidPlain} flex gap-2 items-center justify-center text-black bg-purple-900 shadow-lg w-full`}>
        <Image
          src={socialIcon}
          width={10}
          height={10}
          className="w-[30px]"
          alt="social-icon"
        />
        {text}
      </button>
    </div>
  );
};

export default SocialLoginButton;
