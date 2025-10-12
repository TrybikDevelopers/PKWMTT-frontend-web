import useCalculateInitialWeekParity from "@/hooks/use-calculate-initial-week-parity";
import useCurrentDayIndex from "@/hooks/use-current-day-index";
import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import { api } from "@/trpc/react";
import { useCallback, useMemo, useState } from "react";

const useMobileTimetable = (timetableSettings: TimetableSettingsSchema) => {
    const [timetable] =
        api.timetable.getTimetable.useSuspenseQuery(timetableSettings);
    const [hours] = api.timetable.getAcademicHours.useSuspenseQuery(undefined);

    const { currentDayIndex } = useCurrentDayIndex();

    const { calculatedInitialWeekParity } = useCalculateInitialWeekParity();

    const [selectedDayIndex, setSelectedDayIndex] = useState(currentDayIndex);
    const [weekParity, setWeekParity] = useState(calculatedInitialWeekParity);

    const toggleWeekParity = useCallback(() => {
        setWeekParity((prev) => (prev === "EVEN" ? "ODD" : "EVEN"));
    }, []);

    const incrementDayIndex = useCallback(() => {
        const newIndex = selectedDayIndex + 1 >= 5 ? 0 : selectedDayIndex + 1;

        setSelectedDayIndex(newIndex);

        // when switching from sunday to monday, toggle week parity
        if (newIndex === 0 && selectedDayIndex === 4) {
            toggleWeekParity();
        }
    }, [selectedDayIndex, toggleWeekParity]);

    const decrementDayIndex = useCallback(() => {
        const newIndex = selectedDayIndex - 1 < 0 ? 4 : selectedDayIndex - 1;

        setSelectedDayIndex(newIndex);

        // when switching from monday to sunday, toggle week parity
        if (newIndex === 4 && selectedDayIndex === 0) {
            toggleWeekParity();
        }
    }, [selectedDayIndex, toggleWeekParity]);

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
