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
        "/ects-calculator": {
            en: "/ects-calculator",
            pl: "/kalkulator-ects",
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
