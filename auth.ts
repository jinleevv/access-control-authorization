import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import { compare } from "bcryptjs";

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
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber,
            company: user.company,
            admin: user.admin,
            security: user.security,
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
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.dateOfBirth = user.dateOfBirth;
        token.phoneNumber = user.phoneNumber;
        token.company = user.company;
        token.admin = user.admin;
        token.security = user.security;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token properties to the session
      const token_id: any = token.id;
      session.user.id = token_id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.dateOfBirth = token.dateOfBirth;
      session.user.phoneNumber = token.phoneNumber;
      session.user.company = token.company;
      session.user.admin = token.admin;
      session.user.security = token.security;

      return session;
    },
  },
});
