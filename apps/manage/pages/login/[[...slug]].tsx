import type { ClientSafeProvider } from "next-auth/react";
import type { GetServerSideProps } from "next/types";
import { MagicLinkSignInForm } from "@components/MagicLinkSignInForm";
import { filter } from "lodash";
import { getProviders } from "next-auth/react";
import { getSession } from "@lib/auth/session";

type PageProps = {
  providers: ClientSafeProvider[];
};

const Page = ({ providers }: PageProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-1/4 space-y-8">
        <section>
          <MagicLinkSignInForm />
        </section>
        <section className="hidden">
          {/* TODO: Add alternative sign-in methods, see pages/api/[[...nextauth]].ts */}
        </section>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return { redirect: { permanent: false, destination: "/dashboard" } };
  }

  const providers = filter(await getProviders(), (provider) => {
    return !["credentials", "email"].includes(provider.type);
  });

  return {
    props: { providers },
  };
};

export default Page;
