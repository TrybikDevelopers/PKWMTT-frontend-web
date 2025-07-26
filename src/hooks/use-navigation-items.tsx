import CalculatorSVG from "@/components/svg/calculator-svg";
import CalendarSVG from "@/components/svg/calendar-svg";
import SettingsSVG from "@/components/svg/settings-svg";
import TimetableSVG from "@/components/svg/timetable-svg";
import type { NavigationItem } from "@/types/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function useNavigationItems() {
    const t = useTranslations("navigation");

    const navigationItems: NavigationItem[] = useMemo(() => {
        return [
            {
                href: "/",
                label: t("timetable"),
                icon: <TimetableSVG />,
            },
            {
                href: "/calendar",
                label: t("calendar"),
                icon: <CalendarSVG />,
            },
            {
                href: "/ects-calculator",
                label: t("ectsCalculator"),
                icon: <CalculatorSVG />,
            },
            {
                href: "/settings",
                label: t("settings"),
                icon: <SettingsSVG />,
            },
        ];
    }, [t]);

    return { navigationItems };
}
