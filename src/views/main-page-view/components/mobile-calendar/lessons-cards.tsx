import useWeekParity from "@/hooks/use-week-parity";
import type { Timetable } from "@/types/data-access/timetable";
import { useCallback } from "react";
import LessonCard from "./lesson-card";

type Props = {
    hours: string[];
    currentDayData: Timetable["data"][number];
};

const useLessonsCards = (currentDayData: Timetable["data"][number]) => {
    const { weekParity } = useWeekParity();

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

export default function LessonsCards({ hours, currentDayData }: Props) {
    const { getLesson } = useLessonsCards(currentDayData);

    return (
        <div className="xxs:mt-6 mt-4 flex flex-col px-2 pb-10 *:border-b-1 *:border-[#5A5B5C] *:first:border-t-1 *:first:border-t-[#5A5B5C]">
            {hours.map((hour, index) => (
                <LessonCard
                    key={`timetable-lesson-${index}`}
                    lesson={getLesson(index)}
                    hour={hour}
                />
            ))}
        </div>
    );
}
