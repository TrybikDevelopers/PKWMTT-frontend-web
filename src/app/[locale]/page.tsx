import { getTimetableSettings } from "@/server/cookies";
import { api, HydrateClient } from "@/trpc/server";
import TimetableForm from "@/views/main-page-view/components/timetable-form/timetable-form";
import MainPageView from "@/views/main-page-view/main-page-view";

export default async function Home() {
    const timetableSettings = await getTimetableSettings();

    if (!timetableSettings) {
        void api.timetable.getGeneralGroups.prefetch();

        return (
            <HydrateClient>
                <main className="h-full w-full">
                    <TimetableForm />
                </main>
            </HydrateClient>
        );
    }

    void api.timetable.getTimetable.prefetch({
        generalGroup: timetableSettings.generalGroup,
        groups: timetableSettings.groups,
    });
    void api.timetable.getAcademicHours.prefetch();

    return (
        <HydrateClient>
            <main className="h-full w-full">
                <MainPageView timetableSettings={timetableSettings} />
            </main>
        </HydrateClient>
    );
}
