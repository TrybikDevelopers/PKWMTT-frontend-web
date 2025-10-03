import {
    fetchGeneralGroups,
    getValidTimetableSettings,
} from "@/server/data-access/timetable";
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
    const { timetableSettings } = await getValidTimetableSettings();

    let data: string[] = [];
    let selectedGeneralGroup: string | undefined = undefined;

    if (timetableSettings) {
        const { generalGroups: fetchedData } = await fetchGeneralGroups();

        if (fetchedData) {
            data = fetchedData;
        }

        selectedGeneralGroup = timetableSettings.generalGroup;
    }

    return (
        <ModeratorPanelView
            data={data}
            selectedGeneralGroup={selectedGeneralGroup}
        />
    );
}
