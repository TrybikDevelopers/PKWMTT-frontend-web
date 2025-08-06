"use client";

import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import useDesktopTimetable from "../../hooks/use-desktop-timetable";
import DesktopTimetableGrid from "./desktop-timetable-grid";
import DesktopTimetableHeader from "./desktop-timetable-header";

type Props = {
    timetableSettings: TimetableSettingsSchema;
};

export default function DesktopTimetable({ timetableSettings }: Props) {
    const { hours, timetableData } = useDesktopTimetable(timetableSettings);

    return (
        <div className="mx-auto flex h-full w-full max-w-[1920px] flex-col p-4">
            <DesktopTimetableHeader />
            <DesktopTimetableGrid hours={hours} timetableData={timetableData} />
        </div>
    );
}
