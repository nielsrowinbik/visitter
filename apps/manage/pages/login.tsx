import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "ui";

import { signInWithGoogle, signInWithLink } from "../lib/auth";

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type FormValues = {
  email: string;
};

const LoginPage = () => {
  // const {
  //   formState: { errors },
  //   handleSubmit,
  //   register,
  // } = useForm<FormValues>({ mode: "onTouched" });
  // const onSubmit = handleSubmit(({ email }) => signInWithLink(email));

  return (
    <div>
      <Button onClick={() => signInWithGoogle()}>Sign in with Google</Button>
      {/* <hr />
      <form onSubmit={onSubmit}>
        <div>
          <input
            {...register("email", {
              pattern: {
                value: EMAIL_PATTERN,
                message: "Please fill in a valid e-mail address.",
              },
              required: "Please fill in your e-mail address.",
            })}
            placeholder="hi@example.com"
          />
          <ErrorMessage errors={errors} name="email" />
        </div>
        <Button type="submit">Sign in with magic link</Button>
      </form> */}
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  // Don't allow users to get to this page when they're logged in:
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser({
  // Don't allow users to get to this page when they're logged in:
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(LoginPage);
