import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

const LOGIN_ROUTE = "/login";
const REGISTER_ROUTE = "/get-started";
const AUTH_ROUTES = [LOGIN_ROUTE, REGISTER_ROUTE];
const DASHBOARD_ROUTE = "/homes";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = AUTH_ROUTES.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    );

    if (isAuthPage) {
      if (!isAuth) return null;

      return NextResponse.redirect(new URL(DASHBOARD_ROUTE, req.url));
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/account", "//login", "/get-started", "/homes", "/home/:path*"],
};
