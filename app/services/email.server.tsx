import type { MailOptions } from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendMail(options: MailOptions) {
  return await transporter.sendMail(options);
}
