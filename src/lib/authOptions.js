import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.model";
import { connectToDatabase } from "./db"; // Make sure this points correctly to your Mongoose connection
import bcrypt from "bcryptjs";

export const authOptions = {
  // 🔥 Fix 1: Key is lowercase: `providers`, not `Providers`
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error("Email and password are required.");
        }

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("No user found with the given email.");
        }

        if (!user.isVerified) {
          const error = new Error("Email not verified");
          error.code = "EMAIL_NOT_VERIFIED";
          console.log("Email not verified", error);
          throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error("Invalid credentials.");
        }

        // 🚨 You should return only safe data here — avoid returning full Mongoose object
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || "", // Optional
        };
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
        token.id = user.id;
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
