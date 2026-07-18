import type { User } from "@/lib/types";
import { cookies } from "next/headers";

export async function getServerUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: { Cookie: `session_token=${token.value}` },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("getServerUser: failed to reach backend", err);
    return null;
  }
}
