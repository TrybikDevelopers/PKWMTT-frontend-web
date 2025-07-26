import type { routing } from "@/i18n/routing";

export type NavigationItemHref = keyof Pick<
    typeof routing.pathnames,
    "/" | "/calendar" | "/ects-calculator" | "/settings"
>;

export type NavigationItem = {
    href: NavigationItemHref;
    label: string;
    icon: React.ReactNode;
};
