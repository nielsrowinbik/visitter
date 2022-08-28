export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/account",
    "/admin/:path*",
    "/dashboard/:path*",
    "/new",
    "/[homeId]/:path*",
  ],
};