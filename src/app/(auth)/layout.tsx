import { getServerUser } from "@/lib/get-server-user";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();
  if (user) redirect("/monitors");
  return children;
}
