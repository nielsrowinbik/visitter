import { Button } from "@mantine/core";
import superagent from "superagent";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  homeId: string;
};

export const HomeDeleteButton = ({ homeId }: Props) => {
  const { replace } = useRouter();

  const [isBusy, setBusy] = useState(false);

  const onClickDelete = async () => {
    if (confirm("Are you sure?")) {
      setBusy(true);
      await superagent.delete(`/api/homes/${homeId}`).send();
      replace("/dashboard");
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
