import { signIn, useSession } from "next-auth/react";

import type { ReactNode } from "react";
import router from "next/router";
import { useEffect } from "react";
// import Loader from "@components/Loader";

type Props = {
  children: ReactNode;
  options?: {
    redirectTo?: string;
  };
};

const WithAuth = ({ children, options }: Props) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    // Do nothing while loading
    if (status === "loading") {
      return;
    }

    // If not authenticated, redirect to provided url or
    if (!isUser) {
      if (options?.redirectTo) {
        router.push(options.redirectTo);
      } else {
        signIn();
      }
    }
  }, [isUser, options?.redirectTo, status]);

  if (isUser) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div className="h-screen w-screen flex flex-col justify-center content-center items-center">
      {/* TODO: Replace with an actual loading indicator */}
      {/* <Loader className="h-6 w-6" /> */}
      <h1>Loading...</h1>
    </div>
  );
};

export default WithAuth;
