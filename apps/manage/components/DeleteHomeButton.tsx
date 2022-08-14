import { Button } from "@mantine/core";
import { useAuthUser } from "next-firebase-auth";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  homeId: string;
};

export const DeleteHomeButton = ({ homeId }: Props) => {
  const user = useAuthUser();
  const { replace } = useRouter();

  const [isBusy, setBusy] = useState(false);

  const onClickDelete = async () => {
    if (confirm("Are you sure?")) {
      setBusy(true);
      const token = (await user.getIdToken()) as string;
      await fetch(`/api/homes/${homeId}`, {
        headers: { Authorization: token },
        method: "DELETE",
      });
      replace("/");
    }
  };

  return (
    <Button
      disabled={!homeId}
      onClick={onClickDelete}
      color="red"
      loading={isBusy}
      variant="light"
    >
      Delete home
    </Button>
  );
};
