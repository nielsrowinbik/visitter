import { Button, Input } from "ui";

import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import type { GetServerSideProps } from "next/types";
import type { User } from "@prisma/client";
import { getSession } from "@lib/auth/session";

type PageProps = {
  user: User;
};

const Page = ({ user }: PageProps) => (
  <>
    <form className="space-y-6">
      <Input
        disabled
        id="name"
        label="Name"
        type="text"
        value={user.name as string}
      />
      <Input
        disabled
        id="email"
        label="Email"
        type="email"
        value={user.email as string}
      />
      <hr />
      <Button disabled type="submit">
        Save changes
      </Button>
    </form>
  </>
);

Page.getLayout = (page: any) => (
  <DashboardLayout title="Settings">{page}</DashboardLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { permanent: false, destination: "/login" } };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default Page;
