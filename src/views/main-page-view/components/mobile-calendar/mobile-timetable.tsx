"use client";

import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import { api } from "@/trpc/react";
import LessonCard from "./lesson-card";
import TimetableHeader from "./timetable-header";

type Props = {
    timetableSettings: TimetableSettingsSchema;
};

export default function MobileTimetable({ timetableSettings }: Props) {
    const [timetable] =
        api.timetable.getTimetable.useSuspenseQuery(timetableSettings);
    const [hours] = api.timetable.getAcademicHours.useSuspenseQuery(undefined);

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
