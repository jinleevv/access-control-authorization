// next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    department: string;
    admin: boolean;
    security: boolean;
    departmentIT: boolean;
    department: string;
  }

  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      department: string;
      admin: boolean;
      security: boolean;
      departmentIT: boolean;
      department: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    department: string;
    admin: boolean;
    security: boolean;
    departmentIT: boolean;
    department: string;
  }
}
