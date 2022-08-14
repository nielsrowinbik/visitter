import { Button } from "@mantine/core";
import type { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

export const IndexPage = ({
  homes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const user = useAuthUser();

  return (
    <>
      <nav>
        {user.id === null && (
          <Link href="/login" passHref>
            <a>
              <Button>Get started</Button>
            </a>
          </Link>
        )}
      </nav>
      <main>
        <h1>Visitter</h1>
        <p>Landing page with some marketing material</p>
      </main>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthed: AuthAction.RENDER,
})();

export default withAuthUser<
  InferGetServerSidePropsType<typeof getServerSideProps>
>({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(IndexPage);
