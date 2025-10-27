import { fetchGeneralGroups } from "@/server/data-access/timetable";
import ModeratorPanelView from "@/views/moderator-panel-view/moderator-panel-view";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("moderatorPanel.metadata");

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function ModeratorPanelPage() {
    const { generalGroups, error } = await fetchGeneralGroups();

    if (error) {
        throw new Error("Failed to fetch general groups");
    }

    return <ModeratorPanelView generalGroups={generalGroups} />;
}
