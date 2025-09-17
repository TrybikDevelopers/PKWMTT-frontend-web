import { fetchCalendarPageData } from "@/server/fetchers/calendar-page";
import CalendarPageView from "@/views/calendar-page-view/calendar-page-view";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("calendar.metadata");

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function CalendarPage() {
    const calendarDataPromise = fetchCalendarPageData();

    return <CalendarPageView calendarDataPromise={calendarDataPromise} />;
}
