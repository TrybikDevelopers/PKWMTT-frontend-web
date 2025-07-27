import type { Timetable } from "@/types/data-access/timetable";
import MobileTimetable from "./components/mobile-calendar/mobile-timetable";

type Props = {
    timetable: Timetable;
};

export default function MainPageView({ timetable }: Props) {
    return (
        <div className="text-foreground flex h-full w-full flex-col">
            <pre>{JSON.stringify(timetable, null, 2)}</pre>
            <MobileTimetable />
        </div>
    );
}
