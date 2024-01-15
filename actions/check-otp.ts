"use server";
import db from "@/libs/prismadb"
import { format } from "date-fns";
import { date } from "zod";
export const checkOtp = async (otp: string, email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email: email,
        otp: otp,
      },
    });

    if (user) {
      console.log("OTP MATCHES");
      await db.user.update({
        where: {
          email: email,
        },
        data: {
          emailVerified: new Date(),
        },
      });
      return true;
    } else {
      console.log("MISMATCH");
      return false;
    }
  } catch (e: any) {
    console.log(e);
    return false;
  }
};
