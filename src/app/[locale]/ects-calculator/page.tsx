import {
    fetchSubjectsForGeneralGroup,
    getValidTimetableSettings,
} from "@/server/data-access/timetable";
import { api } from "@/trpc/server";
import ECTSCalculatorView from "@/views/ects-calculator-view/ects-calculator-view";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("ectsCalculator.metadata");

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function ECTSCalculatorPage() {
    const { timetableSettings } = await getValidTimetableSettings();

    let subjects: string[] = [];

    if (timetableSettings) {
        const { subjects: fetchedSubjects } =
            await fetchSubjectsForGeneralGroup(timetableSettings.generalGroup);

        if (fetchedSubjects) {
            subjects = fetchedSubjects;
        }
    }

    return <ECTSCalculatorView subjects={subjects} />;
}
