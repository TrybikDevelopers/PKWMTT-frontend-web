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
    return <div>CalendarPage</div>;
}
