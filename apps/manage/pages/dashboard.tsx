import {
  Box,
  Button,
  Container,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import { findHomesByUserId } from "../lib/homes";
import { ArrowRightIcon, LogoutIcon } from "@heroicons/react/outline";

const DashboardPage = ({
  homes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const user = useAuthUser();

  return (
    <Container>
      <Button
        compact
        onClick={() => user.signOut()}
        rightIcon={<LogoutIcon height={12} width={12} />}
        variant="subtle"
      >
        Sign out
      </Button>
      <Title>Visitter</Title>
      <Space h="md" />
      <Title order={2}>Your vacation homes</Title>
      <Space h="sm" />
      {homes.length === 0 && (
        <>
          <Text>
            You do not currently have any vacation homes. Why not add one?
          </Text>
          <Space h="sm" />
          <Link href="/new" passHref>
            <Button component="a" variant="light">
              Add your vacation home
            </Button>
          </Link>
        </>
      )}
      {homes.length !== 0 && (
        <Stack>
          {homes.map((home) => (
            <Link href={`/${home.id}`} key={home.id} passHref>
              <Box
                component="a"
                key={home.id}
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                  display: "block",
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                  cursor: "pointer",
                  height: "100%",
                  textDecoration: "none",
                  color: "inherit",

                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[5]
                        : theme.colors.gray[1],
                  },
                })}
              >
                <Title order={3}>
                  {home.name} <ArrowRightIcon height={16} width={16} />
                </Title>
              </Box>
            </Link>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  // Redirect the user to the "about" page instead of the login page when hitting the main page unauthed:
  authPageURL: "/about",
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser: user }) => {
  const { id: userId } = user;
  const homes = await findHomesByUserId(userId as string);

  return {
    props: {
      homes,
    },
  };
});

export default withAuthUser<
  InferGetServerSidePropsType<typeof getServerSideProps>
>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
})(DashboardPage);
