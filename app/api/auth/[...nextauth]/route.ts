import NextAuth from "next-auth"
import { authOptions } from "./authoptionsfile";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };