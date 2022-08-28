import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";

import { Button } from "ui";
import { DashboardLayout } from "@components/Layouts/DashboardLayout";
import { Fragment } from "react";
import { HomeAddButton } from "@components/HomeAddButton";
import { HomesList } from "@components/HomesList";

const Page = () => (
  <>
    <div className="flex flex-col-reverse justify-end gap-y-3 space-x-6 md:flex-row md:items-end">
      <HomeAddButton />
    </div>
    <HomesList />
  </>
);

Page.getLayout = (page: any) => (
  <DashboardLayout title="Overview">{page}</DashboardLayout>
);

export default Page;
