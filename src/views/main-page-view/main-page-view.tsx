import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import DesktopTimetable from "./components/desktop-timetable/desktop-timetable";
import MobileTimetable from "./components/mobile-calendar/mobile-timetable";

type Props = {
    timetableSettings: TimetableSettingsSchema;
};

export default function MainPageView({ timetableSettings }: Props) {
    return (
        <div className="text-foreground flex h-full w-full flex-col">
            {/* Mobile view - hidden on lg and up */}
            <div className="lg:hidden">
                <MobileTimetable timetableSettings={timetableSettings} />
            </div>

            {/* Desktop view - visible on lg and up (1024px+) */}
            <div className="hidden lg:block">
                <DesktopTimetable timetableSettings={timetableSettings} />
            </div>
        </div>
    );
}
