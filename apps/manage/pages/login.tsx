import type { ClientSafeProvider } from "next-auth/react";
import type { GetStaticProps } from "next/types";
import { MagicLinkSignInForm } from "@components/MagicLinkSignInForm";
import { filter } from "lodash";
import { getProviders } from "next-auth/react";

type PageProps = {
  providers: ClientSafeProvider[];
};

const Page = ({ providers }: PageProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-sm space-y-8">
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

export const getStaticProps: GetStaticProps = async (context) => {
  const providers = filter(await getProviders(), (provider) => {
    return !["credentials", "email"].includes(provider.type);
  });

  return {
    props: {
      providers,
    },
  };
};

export default Page;
