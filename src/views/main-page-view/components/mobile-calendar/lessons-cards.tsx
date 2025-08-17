import type { Timetable } from "@/types/data-access/timetable";
import { useCallback } from "react";
import LessonCard from "./lesson-card";

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
    const getLesson = useCallback(
        (index: number) => {
            const classData =
                weekParity === "EVEN"
                    ? currentDayData.even
                    : currentDayData.odd;

            const lesson = classData.find((l) => l.rowId === index) || null;

            return lesson;
        },
        [currentDayData, weekParity],
    );

    return { getLesson };
};

export default function LessonsCards({
    hours,
    currentDayData,
    weekDayIndex,
    weekParity,
}: Props) {
    const { getLesson } = useLessonsCards(currentDayData, weekParity);

    return (
        <div className="xxs:mt-6 mt-4 flex flex-col px-2 pb-10 *:border-b-1 *:border-[#5A5B5C] *:first:border-t-1 *:first:border-t-[#5A5B5C]">
            {hours.map((hour, index) => (
                <LessonCard
                    key={`timetable-lesson-${index}`}
                    lesson={getLesson(index)}
                    hour={hour}
                    weekDayIndex={weekDayIndex}
                />
            ))}
        </div>
    );
}
