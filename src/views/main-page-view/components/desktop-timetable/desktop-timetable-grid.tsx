import useHideLectures from "@/hooks/use-hide-lectures";
import type { Timetable } from "@/types/data-access/timetable";
import { useCallback } from "react";
import DesktopLessonsCard from "./desktop-lessons-card";

type Props = {
    hours: string[];
    timetableData: Timetable["data"];
    weekParity: "EVEN" | "ODD";
};

const useDesktopTimetableGrid = (
    timetableData: Timetable["data"],
    weekParity: "EVEN" | "ODD",
) => {
    const { hideLectures } = useHideLectures();

    const getLessons = useCallback(
        (dayIndex: number, hourIndex: number) => {
            const dayData = timetableData[dayIndex];
            if (!dayData) return [];

            const classData =
                weekParity === "EVEN" ? dayData.even : dayData.odd;

            // filter and sort (to make sure that the lessons are in the same order)
            const lessons = classData
                .filter((l) => l.rowId === hourIndex)
                .filter((l) => {
                    // Hide lectures if the setting is enabled
                    if (hideLectures && l.type === "LECTURE") {
                        return false;
                    }
                    return true;
                })
                .sort((a, b) => a.name.localeCompare(b.name));

            return lessons;
        },
        [timetableData, weekParity, hideLectures],
    );

    return { getLessons };
};

export default function DesktopTimetableGrid({
    hours,
    timetableData,
    weekParity,
}: Props) {
    const { getLessons } = useDesktopTimetableGrid(timetableData, weekParity);

    return (
        <div className="flex-1 pb-4">
            <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] gap-4">
                {/* Time column */}
                <div className="flex flex-col">
                    {hours.map((hour, index) => (
                        <div
                            key={`time-${index}`}
                            className="border-border-muted text-foreground flex min-h-20 items-center justify-center border-b text-sm font-normal first:border-t"
                        >
                            {hour.replace(/\s+/g, "")}
                        </div>
                    ))}
                </div>

                {/* Days columns */}
                {Array.from({ length: 5 }, (_, dayIndex) => (
                    <div
                        key={`day-${dayIndex}`}
                        className="flex h-full flex-col"
                    >
                        {hours.map((hour, hourIndex) => (
                            <div
                                key={`cell-${dayIndex}-${hourIndex}`}
                                className="border-border-muted min-h-20 border-b p-1 first:border-t"
                            >
                                <DesktopLessonsCard
                                    lessons={getLessons(dayIndex, hourIndex)}
                                    hour={hour}
                                    weekDayIndex={dayIndex}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
