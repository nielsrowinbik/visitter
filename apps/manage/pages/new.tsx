import { Button, Group, Space, TextInput, Title } from "@mantine/core";
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
import { useForm } from "react-hook-form";
import type { Home } from "../lib/homes";

// TODO: Get all user's homes, and show a message if it's more than one (this will be a paid feature)

type FormValues = {
  name: string;
};

const NewHomePage = () => {
  const router = useRouter();
  const user = useAuthUser();

  const [isBusy, setBusy] = useState(false);

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit = handleSubmit(async (data) => {
    setBusy(true);
    // TODO: Error handling
    const token = (await user.getIdToken()) as string;
    const response = await fetch("/api/homes", {
      body: JSON.stringify(data),
      headers: { Authorization: token },
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
            <Link href="/" passHref>
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
})(NewHomePage);
