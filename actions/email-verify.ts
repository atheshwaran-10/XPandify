"use server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import db  from "@/libs/prismadb";
import htmlcontent from "@/public/email/new-email.mjs";

export const sendMail = async (email: string) => {
  console.log(email);
  const secret = Math.floor(100000 + Math.random() * 900000);
  const htmlContents = htmlcontent(secret);
  await db.user.update({
    where: {
      email: email,
    },
    data: {
      otp: secret.toString(),
    },
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.GMAIL_FROM,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Synapses" <your@gmail.com>',
      to: email,
      subject: `Message from`,
      text: JSON.stringify("message"),
      html: htmlContents,
    });
    console.log("Success");
    return;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500 });
  }
};
