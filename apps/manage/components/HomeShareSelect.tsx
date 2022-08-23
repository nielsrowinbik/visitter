import { NativeSelect } from "@mantine/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  homeId: string;
  shared: boolean;
};

type FormValues = {
  sharing: "private" | "shared";
};

export const HomeShareSelect = ({ homeId, shared }: Props) => {
  const { handleSubmit, register, watch } = useForm<FormValues>({
    defaultValues: { sharing: shared ? "shared" : "private" },
  });
  const onSubmit = async ({ sharing }: FormValues) => {
    if (sharing === "shared") {
      // const token = (await user.getIdToken()) as string;
      // await fetch(`/api/homes/${homeId}`, {
      //   body: JSON.stringify({ shared: true }),
      //   headers: { Authorization: token },
      //   method: "PATCH",
      // });
      return;
    }

    if (sharing === "private") {
      // const token = (await user.getIdToken()) as string;
      // await fetch(`/api/homes/${homeId}`, {
      //   body: JSON.stringify({ shared: false }),
      //   headers: { Authorization: token },
      //   method: "PATCH",
      // });
      return;
    }
  };

  useEffect(() => {
    // @ts-ignore Typing error, code works
    const subscription = watch(handleSubmit(onSubmit));
    // @ts-ignore Typing error, code works
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]); // eslint-disable-line

  return (
    <>
      <form>
        <NativeSelect
          {...register("sharing")}
          data={[
            {
              label: "Private",
              value: "private",
            },
            {
              label: "Shared",
              value: "shared",
            },
          ]}
        >
          <option value="private">Private</option>
          <option value="shared">Shared</option>
        </NativeSelect>
      </form>
    </>
  );
};
