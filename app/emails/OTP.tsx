import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
  render,
} from "@react-email/components";

type OTPEmailProps = {
  code: string;
};

// TODO: Improve styling, especially in dark mode

export const OTPEmail = ({ code }: OTPEmailProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>{`Sign in to Visitter using code ${code}`}</Preview>
      <Body className="bg-white font-sans dark:bg-zinc-900">
        <Container
          className="mx-auto my-0 w-full max-w-xl"
          style={{
            padding: "20px 0 48px",
          }}
        >
          <Img
            alt="Visitter"
            className="h-10 w-10 rounded-full"
            src={`https://visitter.app/static/visitter-logo.png`}
          />
          <Heading className="my-8 text-2xl tracking-tight">
            {`Sign in to Visitter using code ${code}`}
          </Heading>

          <Text
            style={{
              margin: "0 0 15px",
              fontSize: "15px",
              lineHeight: "1.4",
              color: "#3c4149",
            }}
          >
            Use the code below to finish signing in to Visitter. This code can
            be used once and will expire in 15 minutes.
          </Text>
          <code className="bg-zinc-400 px-2 py-1 font-mono text-xl font-bold dark:bg-zinc-700">
            {code}
          </code>
          <Hr className="mb-4 mt-8 border-zinc-300" />
          <Link className="text-sm text-zinc-400" href="https://visitter.app">
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
