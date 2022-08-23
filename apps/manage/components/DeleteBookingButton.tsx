import { ActionIcon, Button } from "@mantine/core";
import { useCallback, useState } from "react";

import { TrashIcon } from "@heroicons/react/outline";
import { useAuthUser } from "next-firebase-auth";
import { useRouter } from "next/router";

type Props = {
  bookingId: string;
};

export const DeleteBookingButton = ({ bookingId }: Props) => {
  const { asPath, replace } = useRouter();
  const user = useAuthUser();

  const [isBusy, setBusy] = useState(false);

  const onDeleteClick = useCallback(async () => {
    if (confirm("Are you sure?")) {
      setBusy(true);

      const token = (await user.getIdToken()) as string;
      await fetch(`/api/bookings/${bookingId}`, {
        headers: { Authorization: token },
        method: "DELETE",
      });
      // TODO: Fix this ugly hack to make a change show up in realtime. Probably should implement SWR on the front-end and use mutate to trigger this change.
      replace(asPath, undefined, { shallow: false });
    }
  }, [asPath, bookingId, replace, user]);

  return (
    <Button
      color="red"
      compact
      leftIcon={<TrashIcon height={12} width={12} />}
      loading={isBusy}
      onClick={onDeleteClick}
      variant="subtle"
    >
      Delete booking
    </Button>
  );
};
