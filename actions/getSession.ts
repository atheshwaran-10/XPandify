import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authoptionsfile";

export default async function getSession() {
  return await getServerSession(authOptions);
}