"use server";

import { signIn, signOut } from "@/auth";

export async function doLogout() {
  await signOut({ redirectTo: "/login" });
}

export async function doCredentialLogin(email: string, password: string) {
  try {
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    return response;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}
