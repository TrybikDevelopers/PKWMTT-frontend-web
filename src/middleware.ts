import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    if (
        request.nextUrl.pathname.match(
            "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
        )
    ) {
        return handleI18nRouting(request);
    }

    return NextResponse.next();
}
