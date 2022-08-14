import { AuthAction, withAuthUser } from "next-firebase-auth";

import { IndexPage as HomePage } from "./index";

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(HomePage);
