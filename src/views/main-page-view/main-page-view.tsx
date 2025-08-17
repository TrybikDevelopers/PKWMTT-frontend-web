import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import DesktopTimetable from "./components/desktop-timetable/desktop-timetable";
import MobileTimetable from "./components/mobile-calendar/mobile-timetable";

type Props = {
    timetableSettings: TimetableSettingsSchema;
};

export default function MainPageView({ timetableSettings }: Props) {
    return (
        <div className="text-foreground flex h-full w-full flex-col">
            <MobileTimetable timetableSettings={timetableSettings} />

            <DesktopTimetable timetableSettings={timetableSettings} />
        </div>
    );
}
