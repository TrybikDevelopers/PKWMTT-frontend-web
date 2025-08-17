import useCurrentDayIndex from "@/hooks/use-current-day-index";
import useWeekParity from "@/hooks/use-week-parity";
import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import { api } from "@/trpc/react";
import { useCallback, useMemo, useState } from "react";

const useMobileTimetable = (timetableSettings: TimetableSettingsSchema) => {
    const [timetable] =
        api.timetable.getTimetable.useSuspenseQuery(timetableSettings);
    const [hours] = api.timetable.getAcademicHours.useSuspenseQuery(undefined);

    const { weekParity: realWeekParity } = useWeekParity();

    const [weekParity, setWeekParity] = useState(realWeekParity);
    const [selectedDayIndex, setSelectedDayIndex] =
        useState(useCurrentDayIndex);

    const toggleWeekParity = useCallback(() => {
        setWeekParity((prev) => (prev === "EVEN" ? "ODD" : "EVEN"));
    }, []);

    const incrementDayIndex = useCallback(() => {
        setSelectedDayIndex((prev) => (prev + 1 >= 5 ? 0 : prev + 1));
    }, []);

    const decrementDayIndex = useCallback(() => {
        setSelectedDayIndex((prev) => (prev - 1 < 0 ? 4 : prev - 1));
    }, []);

    const currentDayData = useMemo(() => {
        return timetable.data[selectedDayIndex];
    }, [timetable.data, selectedDayIndex]);

    return {
        incrementDayIndex,
        decrementDayIndex,
        toggleWeekParity,
        weekParity,
        selectedDayIndex,
        hours,
        currentDayData,
    };
};

export default useMobileTimetable;
