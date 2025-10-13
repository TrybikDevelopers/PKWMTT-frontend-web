import useCalculateInitialWeekParity from "@/hooks/use-calculate-initial-week-parity";
import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import { api } from "@/trpc/react";
import { useCallback, useState } from "react";

const useDesktopTimetable = (timetableSettings: TimetableSettingsSchema) => {
    const [timetable] =
        api.timetable.getTimetable.useSuspenseQuery(timetableSettings);
    const [hours] = api.timetable.getAcademicHours.useSuspenseQuery(undefined);

    const { calculatedInitialWeekParity } = useCalculateInitialWeekParity();

    const [weekParity, setParity] = useState(calculatedInitialWeekParity);

    const toggleWeekParity = useCallback(() => {
        setParity((prev) => (prev === "EVEN" ? "ODD" : "EVEN"));
    }, []);

    return {
        hours,
        timetableData: timetable.data,
        weekParity,
        toggleWeekParity,
    };
};

export default useDesktopTimetable;
