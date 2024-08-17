import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     * 5. / root route
     */
    "/",
    "/((?!auth/|api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};


export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // set header to access url in server components
  const newHeaders = new Headers(req.headers);
  newHeaders.set("x-url", req.url);

  // get hostname of request (e.g demo.localhost:3000), does not change what's in header but extracts domain
  // replaces .localhost:3000 with the production root domain
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // get path and search params (e.g. /, /about, /about?id=4)
  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url), {
    headers: newHeaders,
  });
}
