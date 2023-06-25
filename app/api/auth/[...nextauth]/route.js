import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import dbConnect from "../../lib/dbConnect";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
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
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
});

export { handler as GET, handler as POST };
