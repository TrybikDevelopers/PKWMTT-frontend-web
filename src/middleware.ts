import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/_next/image") {
        return NextResponse.next();
    }

    // request.nextUrl.pathname.match(
    //         "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    //     )
    if (
        !request.nextUrl.pathname.startsWith("/api") &&
        !request.nextUrl.pathname.startsWith("/trpc") &&
        !request.nextUrl.pathname.startsWith("/_next") &&
        !request.nextUrl.pathname.startsWith("/_vercel") &&
        !request.nextUrl.pathname.includes(".")
    ) {
        return handleI18nRouting(request);
    }

    return NextResponse.next();
}
