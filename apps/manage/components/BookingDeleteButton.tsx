import { useCallback, useState } from "react";

import { ActionIcon } from "@mantine/core";
import { TrashIcon } from "@heroicons/react/outline";
import superagent from "superagent";
import { useSWRConfig } from "swr";

type Props = {
  bookingId: string;
  homeId: string;
};

export const BookingDeleteButton = ({ bookingId, homeId }: Props) => {
  const { mutate } = useSWRConfig();
  const [isBusy, setBusy] = useState(false);

  const onDeleteClick = useCallback(async () => {
    if (confirm("Are you sure?")) {
      setBusy(true);
      await superagent.delete(`/api/bookings/${bookingId}`).send();
      mutate(`/api/homes/${homeId}/bookings`);
    }
  }, [bookingId, homeId, mutate]);

  return (
    <div className="inline-block">
      <ActionIcon
        color="red"
        loading={isBusy}
        onClick={onDeleteClick}
        variant="light"
      >
        <TrashIcon height={12} width={12} />
      </ActionIcon>
    </div>
  );
};
