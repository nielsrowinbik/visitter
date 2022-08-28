export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/account", "/dashboard/:path*", "/new", "/[homeId]/:path*"],
};
