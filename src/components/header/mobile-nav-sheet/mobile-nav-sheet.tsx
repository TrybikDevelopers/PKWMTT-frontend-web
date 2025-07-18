import CalendarSVG from "@/components/svg/calendar-svg";
import SettingsSVG from "@/components/svg/settings-svg";
import TimetableSVG from "@/components/svg/timetable-svg";
import YearOrganizationSVG from "@/components/svg/year-organization";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import MobileNavLink from "./mobile-nav-link";

export default function MobileNavSheet() {
    const t = useTranslations("mobileNavSheet");

    return (
        <Sheet>
            <SheetTrigger className="ml-auto flex h-fit w-fit cursor-pointer flex-col space-y-1 p-2">
                <div className="h-0.5 w-6 bg-current"></div>
                <div className="h-0.5 w-6 bg-current"></div>
                <div className="h-0.5 w-6 bg-current"></div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="border-b">
                    <SheetTitle className="text-left text-xl font-semibold">
                        {t("navigation")}
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        {t("navigation")}
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-3 px-2">
                    <MobileNavLink href="/">
                        <TimetableSVG />
                        <span>{t("timetable")}</span>
                    </MobileNavLink>
                    <MobileNavLink href="/calendar">
                        <CalendarSVG />
                        <span>{t("calendar")}</span>
                    </MobileNavLink>
                    <MobileNavLink href="/year-organization">
                        <YearOrganizationSVG />
                        <span>{t("yearOrganization")}</span>
                    </MobileNavLink>
                    <MobileNavLink href="/settings">
                        <SettingsSVG />
                        <span>{t("settings")}</span>
                    </MobileNavLink>
                </div>
            </SheetContent>
        </Sheet>
    );
}
