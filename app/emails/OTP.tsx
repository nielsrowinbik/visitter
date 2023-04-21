import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
  render,
} from "@react-email/components";

import { Icon } from "~/components/Icon";

type OTPEmailProps = {
  code: string;
};

export const OTPEmail = ({ code }: OTPEmailProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Your login code for Visitter</Preview>
      <Body className="bg-white font-sans dark:bg-zinc-900">
        <Container className="mx-auto my-10 w-full max-w-xl px-3">
          <Icon.Logo className="h-8 w-8" />
          <Heading className="my-8 text-2xl font-semibold">
            Your login code for Visitter
          </Heading>
          <Text>
            Use the code below to finish signing in to Visitter. This code can
            be used once and will expire in 15 minutes.
          </Text>
          <code className="rounded bg-zinc-200 px-2 py-1 font-[monospace] text-2xl font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
            {code}
          </code>
          <Hr className="mb-4 mt-6 !border-zinc-400/20" />
          <Link className="text-sm !text-zinc-400" href="https://visitter.app">
            Visitter
          </Link>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default OTPEmail;
export function otpEmail(props: OTPEmailProps) {
  return render(<OTPEmail {...props} />);
}
