import { Authenticator } from "remix-auth";
import { OTPStrategy } from "remix-auth-otp";
import type { User } from "@prisma/client";
import { db } from "~/utils/prisma.server";
import { findUserByEmail } from "./users.server";
import { otpEmail } from "~/emails/OTP";
import { sendMail } from "~/services/email.server";
import { sessionStorage } from "~/services/session.server";

const secret = process.env.OTP_SECRET;
if (!secret) throw new Error("Missing OTP_SECRET env variable.");

export type SessionUser = {
  id: User["id"];
};

const auth = new Authenticator<SessionUser>(sessionStorage);

auth.use(
  new OTPStrategy(
    {
      secret,
      magicLinkGeneration: {
        enabled: false,
      },
      async storeCode(code) {
        await db.otp.create({ data: { code, active: true } });
      },
      async sendCode({ email, code, user, form, request }) {
        await sendMail({
          to: email,
          subject: "Your login code for Visitter",
          from: "noreply@visitter.app",
          sender: "Visitter",
          html: otpEmail({ code }),
        });
      },
      async validateCode(code) {
        const otp = await db.otp.findUniqueOrThrow({ where: { code } });

        return otp;
      },
      async invalidateCode(code, active, attempts) {
        await db.otp.update({ where: { code }, data: { active, attempts } });
      },
    },
    async ({ email, form }) => {
      const dbUser = await findUserByEmail(email);
      const name = form?.get("name");

      const user = await db.user.upsert({
        where: { email },
        create: {
          email,
        },
        // @ts-ignore
        update: {
          ...(name && { name }),
          emailVerified: dbUser?.emailVerified || new Date(),
        },
      });

      return { id: user.id };
    }
  )
);

export { auth };
