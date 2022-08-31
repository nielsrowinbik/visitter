import type { ClientSafeProvider } from "next-auth/react";
import { Container } from "ui";
import type { GetStaticProps } from "next/types";
import { MagicLinkSignInForm } from "@components/MagicLinkSignInForm";
import { filter } from "lodash";
import { getProviders } from "next-auth/react";

type PageProps = {
  providers: ClientSafeProvider[];
};

const Page = ({ providers }: PageProps) => {
  return (
    <Container className="prose prose-lg max-w-5xl space-y-56 text-center prose-p:font-medium prose-ul:font-medium sm:prose-xl md:prose-2xl">
      <section>
        <MagicLinkSignInForm />
      </section>
      <section className="hidden">
        {/* TODO: Add alternative sign-in methods, see pages/api/[[...nextauth]].ts */}
      </section>
    </Container>
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
