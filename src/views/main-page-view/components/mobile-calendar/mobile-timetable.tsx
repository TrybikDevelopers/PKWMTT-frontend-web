import type { AcademicHours, Timetable } from "@/types/data-access/timetable";
import LessonCard from "./lesson-card";
import TimetableHeader from "./timetable-header";

type Props = {
    timetable: Timetable;
    hours: AcademicHours;
};

export default function MobileTimetable({ timetable, hours }: Props) {
    console.log(timetable, hours);
    return (
        <div className="mx-auto flex h-full w-full max-w-2xl flex-col">
            <TimetableHeader />
            <div className="xxs:mt-6 mt-4 flex flex-col px-2 pb-10 *:border-b-1 *:border-[#5A5B5C] *:first:border-t-1 *:first:border-t-[#5A5B5C]">
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
            </div>
        </div>
    );
}
