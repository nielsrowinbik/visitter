import { Input } from "ui";
import { fetcher } from "@lib/fetch";
import useSWR from "swr";

type Props = {
  id: string;
};

export const HomeSettingsSection = ({ id }: Props) => {
  const { data: home } = useSWR(`/api/homes/${id}`, fetcher);

  return (
    <section>
      <Input
        disabled
        id="name"
        label="Vacation home name"
        type="text"
        value={home.name}
      />
    </section>
  );
};
