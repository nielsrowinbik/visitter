import Link from "next/link";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import { Button } from "ui";

export const HomePage = () => {
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

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(HomePage);
