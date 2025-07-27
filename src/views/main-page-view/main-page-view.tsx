import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import MobileTimetable from "./components/mobile-calendar/mobile-timetable";

type Props = {
    timetableSettings: TimetableSettingsSchema;
};

export default function MainPageView({ timetableSettings }: Props) {
    return (
        <div className="text-foreground flex h-full w-full flex-col">
            <MobileTimetable timetableSettings={timetableSettings} />
        </div>
    );
}
