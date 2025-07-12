import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    try {
        return {
            locale,
            messages: (await import(`../../messages/${locale}.json`)).default,
        };
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";

        throw new Error(
            `Failed to load messages for locale "${locale}": ${message}`,
        );
    }
});
