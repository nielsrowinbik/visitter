import type { FC } from "react";
import Link from "next/link";
import { Logo } from "@components/Logo";

export const FormPageLayout: FC = ({ children }) => (
  <>
    <div className="my-8 w-full text-center">
      <Link href="/homes" passHref>
        <a className="inline-block">
          <Logo />
        </a>
      </Link>
    </div>
    <div className="mx-auto mt-4 flex w-full max-w-3xl">{children}</div>
    <p className="py-8 text-center text-xs text-gray-500">
      &copy; 2022 Visitter. All rights reserved.
    </p>
  </>
);
