import { Button, Group, Space, TextInput, Title } from "@mantine/core";

import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import type { GetServerSideProps } from "next/types";
import type { Home } from "@lib/homes";
import Link from "next/link";
import Router from "next/router";
import { getSession } from "@lib/auth/session";
import superagent from "superagent";
import { useForm } from "react-hook-form";
import { useState } from "react";

// TODO: Get all user's homes, and show a message if it's more than one (this will be a paid feature)

type FormValues = {
  name: string;
};

const Page = () => {
  const [isBusy, setBusy] = useState(false);

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit = handleSubmit(async ({ name }) => {
    setBusy(true);
    const { body: home } = await superagent.post("/api/homes").send({
      name,
    });
    Router.replace(`/${home.id}`);
  });

  return (
    <>
      <nav></nav>
      <main>
        <Title>Add a new vacation home</Title>
        <Space h="sm" />
        <form onSubmit={onSubmit}>
          <div>
            <TextInput
              {...register("name", {
                required: "Please give your vacation home a name.",
              })}
              description="The name of your vacation home to use. You can always change this later."
              error={errors.name?.message}
              label="Name"
              required
            />
          </div>
          <Space h="md" />
          <Group>
            <Button
              disabled={!isValid}
              loading={isBusy}
              type="submit"
              variant="light"
            >
              Add home
            </Button>
            <Link href="/dashboard" passHref>
              <Button color="red" component="a" variant="subtle">
                Cancel
              </Button>
            </Link>
          </Group>
        </form>
      </main>
    </>
  );
};

Page.getLayout = (children: any) => (
  <DashboardLayout>{children}</DashboardLayout>
);

export default Page;
