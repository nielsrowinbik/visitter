import { Button, Group, Space, Title } from "@mantine/core";
import type { GetStaticPaths, GetStaticProps } from "next/types";

import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import { DateRangePicker } from "@mantine/dates";
import Link from "next/link";
import Router from "next/router";
import { isDate } from "lodash";
import superagent from "superagent";
import { useState } from "react";

type PageProps = {
  homeId: string;
};

const Page = ({ homeId }: PageProps) => {
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const isValid = range.every((val) => isDate(val));

  const [isBusy, setBusy] = useState(false);

  const onSaveClick = async () => {
    setBusy(true);
    await superagent.post(`/api/homes/${homeId}/bookings`).send({
      endDate: range[1],
      startDate: range[0],
    });
    Router.replace(`/${homeId}`);
  };

  return (
    <>
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

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export const getStaticPaths: GetStaticPaths = () => {
  return { fallback: "blocking", paths: [] };
};

export const getStaticProps: GetStaticProps = (context) => ({
  props: {
    homeId: context.params?.homeId,
  },
});

export default Page;
