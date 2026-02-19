"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const COOKIE_NAME = "kademix_admin";
const COOKIE_VALUE = "1";

export type LoginResult =
  | { error: string; email?: string }
  | { redirect: string }
  | null;

export async function login(formData: FormData): Promise<LoginResult> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return { error: "Server auth not configured" };
  }

  if (!email || !password) {
    return { error: "Email and password are required", email: email ?? "" };
  }

  if (email !== adminEmail || password !== adminPassword) {
    return { error: "Invalid email or password", email };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { redirect: "/admin" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/");
}
