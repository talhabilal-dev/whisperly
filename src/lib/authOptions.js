import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.model";
import { connectToDatabase } from "./db";
import bcrypt from "bcryptjs";

export const authOptions = {
  Providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDatabase();

        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Email and password are required.");
        }

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("No user found with the given email.");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
