"use client";
import { SessionProvider } from "next-auth/react";

const AuthContextProvider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthContextProvider;
