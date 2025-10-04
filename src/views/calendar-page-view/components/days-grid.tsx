import type { CalendarExam } from "@/types/data-access/calendar";
import { toZonedTime } from "date-fns-tz";
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
    const getItemsForDay = (day: Date) => {
        return calendarExams.filter((exam) => {
            const examDate = toZonedTime(new Date(exam.date), "Europe/Warsaw");

            return (
                examDate.getDate() === day.getDate() &&
                examDate.getMonth() === day.getMonth() &&
                examDate.getFullYear() === day.getFullYear()
            );
        });
    };

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
