import { Button, Group, Space, Title } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import type { InferGetServerSidePropsType } from "next";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type FormValues = {
  startDate: Date;
  endDate: Date;
  period: [Date, Date];
};

const NewBookingPage = () => {
  const router = useRouter();
  const { homeId } = router.query;

  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const isValid = range.every((val) => val !== null);

  const [isBusy, setBusy] = useState(false);

  const user = useAuthUser();

  const onSaveClick = async () => {
    // TODO: Error handling
    // TODO: Deal with dates possibly being null
    setBusy(true);
    const token = (await user.getIdToken()) as string;
    await fetch(`/api/homes/${homeId}/bookings`, {
      body: JSON.stringify({
        // @ts-ignore
        endDate: range[1].getTime(), // eslint-disable-line
        // @ts-ignore
        startDate: range[0].getTime(), // eslint-disable-line
      }),
      headers: { Authorization: token },
      method: "POST",
    });
    router.replace(`/${homeId}`);
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

export const getServerSideProps = withAuthUserTokenSSR({
  // Redirect the user to the login page when unauthed:
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser<
  InferGetServerSidePropsType<typeof getServerSideProps>
>({
  // Wait for Firebase to have initialised before doing anything with the login state:
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  // Redirect the user to the login page when unauthed:
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(NewBookingPage);
