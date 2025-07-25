import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "pl"],

    defaultLocale: "pl",

    localePrefix: {
        mode: "never",
    },

    pathnames: {
        "/": {
            en: "/",
            pl: "/",
        },
        "/calendar": {
            en: "/calendar",
            pl: "/kalendarz",
        },
        "/year-organization": {
            en: "/year-organization",
            pl: "/organizacja-roku",
        },
        "/settings": {
            en: "/settings",
            pl: "/ustawienia",
        },
        "/api/trpc": {
            en: "/api/trpc",
            pl: "/api/trpc",
        },
    },
});
