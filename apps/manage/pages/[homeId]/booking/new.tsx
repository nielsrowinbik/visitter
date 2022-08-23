import { Button, Group, Space, Title } from "@mantine/core";

import { DateRangePicker } from "@mantine/dates";
import type { GetServerSideProps } from "next/types";
import Link from "next/link";
import { getSession } from "@lib/auth/session";
import { useRouter } from "next/router";
import { useState } from "react";

type FormValues = {
  startDate: Date;
  endDate: Date;
  period: [Date, Date];
};

const Page = () => {
  const router = useRouter();
  const { homeId } = router.query;

  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const isValid = range.every((val) => val !== null);

  const [isBusy, setBusy] = useState(false);

  const onSaveClick = async () => {
    // TODO: Error handling
    // TODO: Deal with dates possibly being null
    setBusy(true);
    // const token = (await user.getIdToken()) as string;
    // await fetch(`/api/homes/${homeId}/bookings`, {
    //   body: JSON.stringify({
    //     // @ts-ignore
    //     endDate: range[1].getTime(), // eslint-disable-line
    //     // @ts-ignore
    //     startDate: range[0].getTime(), // eslint-disable-line
    //   }),
    //   headers: { Authorization: token },
    //   method: "POST",
    // });
    // router.replace(`/${homeId}`);
  };

  return (
    <>
      <nav></nav>
      <main>
        <Title>Add a new booking</Title>
        <Space h="sm" />
        <DateRangePicker
          description="Period during which your vacation home is unavailable."
          label="Period"
          required
          value={range}
          onChange={(val) => setRange(val)}
        />
        <Space h="md" />
        <Group>
          <Button
            disabled={!isValid}
            loading={isBusy}
            onClick={onSaveClick}
            variant="light"
          >
            Add booking
          </Button>
          <Link href={`/${homeId}`} passHref>
            <Button color="red" component="a" variant="subtle">
              Cancel
            </Button>
          </Link>
        </Group>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { permanent: false, destination: "/sign-in" } };
  }

  return {
    props: {},
  };
};

export default Page;
