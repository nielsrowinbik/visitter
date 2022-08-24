import type { GetServerSideProps } from "next";
import { Page } from "./home";
import { getSession } from "@lib/auth/session";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return { redirect: { permanent: false, destination: "/dashboard" } };
  }

  return {
    props: {},
  };
};

export default Page;
