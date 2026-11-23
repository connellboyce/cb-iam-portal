import { redirect } from "next/navigation";
import { cache } from "react";
import { getSession } from "@/lib/session";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export const getCurrentUser = cache(async (): Promise<User> => {
  const session = await getSession();
  // Sessions created before these fields existed are sent through sign-in again
  if (!session?.user?.username) redirect("/login");
  const { id, username, firstName, lastName, email, roles } = session.user;
  return { id, username, firstName, lastName, email, roles };
});

export function fullName(u: Pick<User, "firstName" | "lastName">) {
  return `${u.firstName} ${u.lastName}`;
}
