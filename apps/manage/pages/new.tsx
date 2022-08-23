import { Button, Group, Space, TextInput, Title } from "@mantine/core";

import type { GetServerSideProps } from "next/types";
import type { Home } from "@lib/homes";
import Link from "next/link";
import { getSession } from "@lib/auth/session";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

// TODO: Get all user's homes, and show a message if it's more than one (this will be a paid feature)

type FormValues = {
  name: string;
};

const Page = () => {
  const router = useRouter();

  const [isBusy, setBusy] = useState(false);

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit = handleSubmit(async (data) => {
    setBusy(true);
    // TODO: Error handling
    // const token = (await user.getIdToken()) as string;
    const response = await fetch("/api/homes", {
      body: JSON.stringify(data),
      // headers: { Authorization: token },
      method: "POST",
    });
    const home = (await response.json()) as Home;
    router.replace(`/${home.id}`);
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
