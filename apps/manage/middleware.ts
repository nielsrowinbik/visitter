export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/account", "/homes/:path*", "/[homeId]/:path*"],
};
