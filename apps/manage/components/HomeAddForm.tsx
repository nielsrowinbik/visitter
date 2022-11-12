import { Button, Input } from "ui";

import Router from "next/router";
import { mutate } from "swr";
import superagent from "superagent";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
};

export const HomeAddForm = () => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormValues>();

  // TODO: Error handling
  const onSubmit = handleSubmit(async ({ name }) => {
    const { body: home } = await superagent.post(`/api/homes`).send({
      name,
    });
    await mutate(`/api/homes`);
    await Router.push(`/${home.id}`);
  });

  return (
    <form
      className="mx-auto flex max-w-md flex-1 flex-col space-y-8"
      onSubmit={onSubmit}
    >
      <h2>Your home&apos;s details</h2>
      <Input
        id="name"
        label="Name"
        required
        {...register("name", { required: true })}
      />

      <Button disabled={isSubmitting} type="submit">
        Add home
      </Button>
    </form>
  );
};
