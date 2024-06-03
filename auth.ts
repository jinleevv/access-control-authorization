import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { compare } from "bcryptjs";

// const convertUTCToLocal = (utcDateString: string) => {
//   const localDate = new Date(utcDateString);
//   return localDate.toString(); // Local time string
// };

// const calculateExpiry = (maxAge: number) => {
//   const now = new Date();
//   now.setSeconds(now.getSeconds() + maxAge);
//   console.log("NOWW: ", now.toISOString());
//   console.log("Local Expiry Time:", convertUTCToLocal(now.toISOString()));
//   return now.toISOString();
// };

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials === null) return null;

        const user_email: any = credentials.email;
        const user_password: any = credentials.password;

        const user = await prisma.user.findUnique({
          where: {
            email: user_email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordCorrect = await compare(user_password, user.password);

        if (passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour in seconds
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour in seconds
  },
  callbacks: {
    async jwt({ token, user }) {
      // First time JWT callback is run, `user` object will be available
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token properties to the session
      session.user.id = token.id;
      return session;
    },
  },
});
