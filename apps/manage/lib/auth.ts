import { init } from "next-firebase-auth";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";

const firebaseAdminInitConfig = {
  credential: {
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  },
  databaseURL: "", // Empty because we don't use the realtime database.
};

const firebaseClientInitConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
};

export const initAuth = () => {
  init({
    appPageURL: "/",
    authPageURL: "/login",
    cookies: {
      name: "Visitter",
      signed: false, // FIXME: Change this, we should use signed cookies.
    },
    firebaseAdminInitConfig,
    firebaseClientInitConfig,
    loginAPIEndpoint: "/api/auth/login",
    logoutAPIEndpoint: "/api/auth/logout",
  });
};

const app = initializeApp(firebaseClientInitConfig);
const auth = getAuth(app);

export const signInWithGoogle = () =>
  signInWithPopup(auth, new GoogleAuthProvider());

export const signInWithLink = (email: string) =>
  signInWithEmailLink(auth, email);
