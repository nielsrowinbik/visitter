import { Box, Button, Space, Stack, Tabs, Text, Title } from "@mantine/core";
import {
  findCurrentAndFutureBookingsByHomeId,
  findPastBookingsByHomeId,
} from "@lib/bookings";
import { format, fromUnixTime } from "date-fns";

import { ArrowLeftIcon } from "@heroicons/react/outline";
import type { Booking } from "@lib/bookings";
import { DeleteBookingButton } from "@components/DeleteBookingButton";
import { DeleteHomeButton } from "@components/DeleteHomeButton";
import type { GetServerSideProps } from "next/types";
import type { Home } from "@lib/homes";
import { HomeShareSelect } from "@components/HomeShareSelect";
import Link from "next/link";
import { findHomeById } from "@lib/homes";
import { getSession } from "@lib/auth/session";
import { rangeToDates } from "@lib/helpers";
import { useRouter } from "next/router";

type PageProps = {
  home: Home;
  past: Booking[];
  upcoming: Booking[];
};

const Page = ({ home, past, upcoming }: PageProps) => {
  const { query } = useRouter();
  const { homeId } = query;

  const unavailability = upcoming.reduce((res: Date[], booking: Booking) => {
    return [...res, ...rangeToDates(booking.startDate, booking.endDate)];
  }, []);

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
      <Tabs defaultValue="upcoming">
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
      </Tabs>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { permanent: false, destination: "/sign-in" } };
  }

  // const homeId = ctx.query.homeId as string;

  // // Attempt to fetch the home from the database:
  // const home = await findHomeById(homeId);

  // // If the requested home does not exist, return a 404:
  // if (!home)
  return {
    notFound: true,
  };

  // // Fetch all upcoming bookings:
  // const upcoming = await findCurrentAndFutureBookingsByHomeId(homeId);
  // const past = await findPastBookingsByHomeId(homeId);

  // return {
  //   props: {
  //     home,
  //     past,
  //     upcoming,
  //   },
  // };
};

export default Page;
