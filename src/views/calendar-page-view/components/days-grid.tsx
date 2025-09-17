import type { CalendarExam } from "@/types/data-access/calendar";
import { useCallback } from "react";
import CalendarDay from "./calendar-day";

type Props = {
    cells: {
        date: Date;
        inCurrentMonth: boolean;
        isToday: boolean;
    }[];
    calendarExams: CalendarExam[];
};

export default function DaysGrid({ cells, calendarExams }: Props) {
    const getItemsForDay = useCallback(
        (day: Date) => {
            return calendarExams.filter((exam) => {
                const examDate = new Date(exam.date);

                return (
                    examDate.getDate() === day.getDate() &&
                    examDate.getMonth() === day.getMonth() &&
                    examDate.getFullYear() === day.getFullYear()
                );
            });
        },
        [calendarExams],
    );

    return (
        <>
            {cells.map((cell, index) => (
                <CalendarDay
                    key={`day-${index}`}
                    day={cell}
                    items={getItemsForDay(cell.date)}
                />
            ))}
        </>
    );
}
