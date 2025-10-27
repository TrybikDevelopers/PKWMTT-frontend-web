import useHideLectures from "@/hooks/use-hide-lectures";
import type { Timetable } from "@/types/data-access/timetable";
import { useCallback } from "react";
import LessonsCard from "./lessons-card";

type Props = {
    hours: string[];
    currentDayData: Timetable["data"][number];
    weekDayIndex: number;
    weekParity: "EVEN" | "ODD";
};

const useLessonsCards = (
    currentDayData: Timetable["data"][number],
    weekParity: "EVEN" | "ODD",
) => {
    const { hideLectures } = useHideLectures();

    const getLessons = useCallback(
        (index: number) => {
            const classData =
                weekParity === "EVEN"
                    ? currentDayData.even
                    : currentDayData.odd;

            // filter and sort (to make sure that the lessons are in the same order)
            const lessons = classData
                .filter((l) => l.rowId === index)
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
        [currentDayData, weekParity, hideLectures],
    );

    return { getLessons };
};

export default function LessonsCards({
    hours,
    currentDayData,
    weekDayIndex,
    weekParity,
}: Props) {
    const { getLessons } = useLessonsCards(currentDayData, weekParity);

    return (
        <div className="xxs:mt-6 *:border-border-muted *:first:border-t-border-muted mt-4 flex flex-col px-2 pb-10 *:border-b-1 *:first:border-t-1">
            {hours.map((hour, index) => (
                <LessonsCard
                    key={`timetable-lesson-${index}`}
                    lessons={getLessons(index)}
                    hour={hour}
                    weekDayIndex={weekDayIndex}
                />
            ))}
        </div>
    );
}
