import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/_next/image") {
        return NextResponse.next();
    }

    if (
        !request.nextUrl.pathname.startsWith("/api") &&
        !request.nextUrl.pathname.startsWith("/_next") &&
        !request.nextUrl.pathname.startsWith("/_vercel") &&
        !request.nextUrl.pathname.includes(".")
    ) {
        const languageCookie = request.cookies.get("NEXT_LOCALE");
        const preferredLocale = languageCookie?.value as
            | "pl"
            | "en"
            | undefined;

        if (
            preferredLocale &&
            (preferredLocale === "pl" || preferredLocale === "en")
        ) {
            const customRouting = createMiddleware({
                ...routing,
                defaultLocale: preferredLocale,
            });
            return customRouting(request);
        }

        return handleI18nRouting(request);
    }

    return NextResponse.next();
}
