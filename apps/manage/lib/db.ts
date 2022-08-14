import { getFirebaseAdmin } from "next-firebase-auth";
export { Timestamp } from "firebase-admin/firestore";

import { initAuth } from "./auth";

initAuth();

const admin = getFirebaseAdmin();
const db = admin.firestore();

export default db;
