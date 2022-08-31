import { Container } from "ui";
import { useRouter } from "next/router";

const Page = () => {
  const { query } = useRouter();
  const { email } = query;

  return (
    <Container className="prose prose-lg max-w-5xl space-y-56 text-center prose-p:font-medium prose-ul:font-medium sm:prose-xl md:prose-2xl">
      <section>
        <h2>Please check your email.</h2>
        <p>
          We&apos;ve sent a link to <strong>{email}</strong>. Please click the
          link to sign in.
        </p>
      </section>
    </Container>
  );
};

export default Page;
