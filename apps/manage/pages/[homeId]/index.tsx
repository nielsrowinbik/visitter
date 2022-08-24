import { Button, Space, Title } from "@mantine/core";

import { ArrowLeftIcon } from "@heroicons/react/outline";
import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import { DeleteHomeButton } from "@components/DeleteHomeButton";
import type { GetServerSideProps } from "next/types";
import Link from "next/link";
import { fetcher } from "@lib/fetch";
import { getSession } from "@lib/auth/session";
import prisma from "@db";
import { useRouter } from "next/router";
import useSWR from "swr";

type PageProps = {
  // home: Home;
  // past: Booking[];
  // upcoming: Booking[];
};

const Page = ({}: PageProps) => {
  const { query } = useRouter();
  const { homeId } = query;

  const { data: home } = useSWR(
    homeId ? `/api/homes/${homeId}` : null,
    fetcher
  );

  if (!home) return <div>Loading...</div>;

  return (
    <main>
      <Link href="/dashboard" passHref>
        <Button
          compact
          component="a"
          variant="subtle"
          leftIcon={<ArrowLeftIcon height={12} width={12} />}
        >
          Back to overview
        </Button>
      </Link>
      <Title>{home.name}</Title>
      <Space h="md" />
      <Title order={2}>Bookings</Title>
      <Space h="sm" />
      {/* <Tabs defaultValue="upcoming">
        <Tabs.List>
          <Tabs.Tab value="upcoming">Upcoming</Tabs.Tab>
          <Tabs.Tab value="past">Past bookings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="upcoming" pt="xs">
          <Stack>
            {upcoming.map((booking: Booking) => (
              <Box
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                  height: "100%",
                })}
                key={booking.id}
              >
                <Text>
                  From{" "}
                  <strong>
                    {format(fromUnixTime(booking.startDate / 1000), "d MMMM y")}
                  </strong>{" "}
                  until{" "}
                  <strong>
                    {format(fromUnixTime(booking.endDate / 1000), "d MMMM y")}
                  </strong>
                  .
                </Text>
                <DeleteBookingButton bookingId={booking.id} />
              </Box>
            ))}
          </Stack>
          <Space h="sm" />
          <Link href={`/${homeId}/booking/new`} passHref>
            <Button component="a" variant="light">
              Add new booking
            </Button>
          </Link>
        </Tabs.Panel>

        <Tabs.Panel value="past" pt="xs">
          <Stack>
            {past.map((booking: Booking) => (
              <Box
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                  height: "100%",
                })}
                key={booking.id}
              >
                <Text>
                  From{" "}
                  <strong>
                    {format(fromUnixTime(booking.startDate / 1000), "d MMMM y")}
                  </strong>{" "}
                  until{" "}
                  <strong>
                    {format(fromUnixTime(booking.endDate / 1000), "d MMMM y")}
                  </strong>
                  .
                </Text>
                <DeleteBookingButton bookingId={booking.id} />
              </Box>
            ))}
          </Stack>
        </Tabs.Panel>
      </Tabs> */}
      <Space h="xl" />
      <Title order={2}>Settings</Title>
      {/* <Space h="md" />
      <Title order={3}>Sharing</Title>
      <Space h="sm" />
      <Text>
        Share the availability of your vacation home by setting the below option
        to Shared. If you no longer wish to share the availability, simply set
        it back to Private.
      </Text>
      <Space h="sm" />
      <HomeShareSelect homeId={homeId as string} shared={home.shared} />
      <Space h="sm" />
      <CopyButton value={`http://localhost:3000/${homeId}`}>
        {({ copied, copy }) => (
          <Button
            color={copied ? "teal" : "blue"}
            onClick={copy}
            variant="light"
          >
            {copied ? "Copied!" : "Copy link"}
          </Button>
          )}
        </CopyButton> */}
      <Space h="md" />
      <Title order={3}>Danger zone</Title>
      <Space h="sm" />
      <DeleteHomeButton homeId={homeId as string} />
    </main>
  );
};

Page.getLayout = (children: any) => (
  <DashboardLayout>{children}</DashboardLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { permanent: false, destination: "/login" } };
  }

  const homeId = context.params?.homeId as string;
  const home = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
  });

  return {
    props: {
      fallback: {
        [`/api/${homeId}`]: JSON.parse(JSON.stringify(home)),
      },
    },
  };
};

export default Page;
