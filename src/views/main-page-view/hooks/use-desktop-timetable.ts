import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import { api } from "@/trpc/react";

const useDesktopTimetable = (timetableSettings: TimetableSettingsSchema) => {
    const [timetable] =
        api.timetable.getTimetable.useSuspenseQuery(timetableSettings);
    const [hours] = api.timetable.getAcademicHours.useSuspenseQuery(undefined);

    return {
        hours,
        timetableData: timetable.data,
    };
};

export default useDesktopTimetable;
