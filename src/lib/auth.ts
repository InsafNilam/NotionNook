import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const currentSession = async () => {
  const session = await auth();
  return session;
};
