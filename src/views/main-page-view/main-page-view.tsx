import DownloadMobileAppDialog from "@/components/download-mobile-app-dialog";
import { getValidTimetableSettings } from "@/server/data-access/timetable";
import { api, HydrateClient } from "@/trpc/server";
import DesktopTimetable from "./components/desktop-timetable/desktop-timetable";
import MobileTimetable from "./components/mobile-timetable/mobile-timetable";
import TimetableForm from "./components/timetable-form/timetable-form";

export default async function MainPageView() {
    const { timetableSettings } = await getValidTimetableSettings();

    if (!timetableSettings) {
        void api.timetable.getGeneralGroups.prefetch();

        return (
            <HydrateClient>
                <TimetableForm />
            </HydrateClient>
        );
    }

    void api.timetable.getTimetable.prefetch({
        generalGroup: timetableSettings.generalGroup,
        groups: timetableSettings.groups,
        customSubjects: timetableSettings.customSubjects,
    });
    void api.timetable.getAcademicHours.prefetch();

    return (
        <>
            <HydrateClient>
                <div className="text-foreground flex h-full w-full flex-col">
                    <MobileTimetable timetableSettings={timetableSettings} />

                    <DesktopTimetable timetableSettings={timetableSettings} />
                </div>
            </HydrateClient>
            <DownloadMobileAppDialog />
        </>
    );
}
