"use client";

import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import useMobileTimetable from "../../hooks/use-mobile-timetable";
import LessonsCards from "./lessons-cards";
import TimetableHeader from "./timetable-header";

type Props = {
    timetableSettings: TimetableSettingsSchema;
};

export default function MobileTimetable({ timetableSettings }: Props) {
    const {
        hours,
        currentDayData,
        selectedDayIndex,
        incrementDayIndex,
        decrementDayIndex,
    } = useMobileTimetable(timetableSettings);

    return (
        <div className="mx-auto flex h-full w-full max-w-2xl flex-col lg:hidden">
            <TimetableHeader
                incrementDayIndex={incrementDayIndex}
                decrementDayIndex={decrementDayIndex}
                selectedDayIndex={selectedDayIndex}
            />
            <LessonsCards hours={hours} currentDayData={currentDayData} />
        </div>
    );
}
