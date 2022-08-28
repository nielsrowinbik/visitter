import { Button } from "@mantine/core";
import Router from "next/router";
import { mutate } from "swr";
import superagent from "superagent";
import { useState } from "react";

type Props = {
  homeId: string;
};

export const HomeDeleteButton = ({ homeId }: Props) => {
  const [isBusy, setBusy] = useState(false);

  const onClickDelete = async () => {
    if (confirm("Are you sure?")) {
      setBusy(true);
      await superagent.delete(`/api/homes/${homeId}`).send();
      await mutate(`/api/homes`);
      Router.replace("/dashboard");
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
