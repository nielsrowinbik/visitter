import { Button } from "ui";
import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import { HomesGrid } from "@components/HomesGrid";
import Link from "next/link";
import { SWRConfig } from "swr";

const Page = () => (
  <>
    <section className="flex justify-between">
      <h1>Your vacation homes</h1>
      <Link href="/homes/new" passHref>
        <Button as="a">Add a vacation home</Button>
      </Link>
    </section>
    <section>
      <HomesGrid />
    </section>
  </>
);

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
