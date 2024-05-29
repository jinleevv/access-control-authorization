import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
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
});
