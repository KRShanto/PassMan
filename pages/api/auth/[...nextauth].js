import { MongoClient } from "mongodb";
import NextAuth, { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import EmailProvider from "next-auth/providers/email";
import clientPromise from "../../../lib/clientPromise";
import UserType from "../../../types/user";

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

export const authOptions = {
  secret: process.env.SECRET,
  // session: {
  //   strategy: "jwt",
  //   maxAge: THIRTY_DAYS,
  //   updateAge: THIRTY_MINUTES,
  // },
  adapter: MongoDBAdapter(clientPromise),
  theme: {
    colorScheme: "dark",
  },
  callbacks: {
    session: async (session) => {
      if (session?.user) {
        session.session.user._id = session.user.id;
      }
      return session.session;
    },
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
};

export default NextAuth(authOptions);
