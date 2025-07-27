import type { AcademicHours, Timetable } from "@/types/data-access/timetable";
import MobileTimetable from "./components/mobile-calendar/mobile-timetable";

type Props = {
    timetable: Timetable;
    hours: AcademicHours;
};

export default function MainPageView({ timetable, hours }: Props) {
    return (
        <div className="text-foreground flex h-full w-full flex-col">
            <MobileTimetable timetable={timetable} hours={hours} />
        </div>
    );
}
