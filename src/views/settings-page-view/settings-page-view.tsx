import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import ApplicationAppearance from "./components/application-appearance";
import CustomSubjects from "./components/custom-subjects/custom-subjects";
import MobileAppDownload from "./components/mobile-app-download";
import StudentGroups from "./components/student-groups";

type Props = {
    timetableSettings: TimetableSettingsSchema | null;
};

export default function SettingsPageView({ timetableSettings }: Props) {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="space-y-8">
                <StudentGroups timetableSettings={timetableSettings} />

                {timetableSettings && (
                    <CustomSubjects timetableSettings={timetableSettings} />
                )}

                <ApplicationAppearance />

                <MobileAppDownload />
            </div>
        </div>
    );
}
