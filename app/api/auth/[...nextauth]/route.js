import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import dbConnect from "../../lib/dbConnect";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../lib/mongodb";
export const authOption = {
  // adapter: MongoDBAdapter(clientPromise, {
  //   databaseName: "mosque-around-me",
  //   collections: { Accounts: "accounts", Sessions: "sessions", Users: "users" },
  // }),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        await dbConnect();

        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Email and password required");
        }
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid Email or password");
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      await dbConnect();
      const user = await User.findOne({ email: session.user.email });
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
