import "server-only";

import type { CalendarExam } from "@/types/data-access/calendar";
import { getTimetableSettings } from "../cookies";
import { fetchCalendarByGroups } from "../data-access/calendar";

export type CalendarPageData = {
    calendarExams: CalendarExam[] | null;
};

export const fetchCalendarPageData = async (): Promise<CalendarPageData> => {
    const timetableSettings = await getTimetableSettings();

    if (!timetableSettings) {
        return {
            calendarExams: null,
        };
    }

    const { calendarExams, error } = await fetchCalendarByGroups(
        timetableSettings.generalGroup,
        timetableSettings.groups,
    );

    if (error) {
        return {
            calendarExams: null,
        };
    }

    return {
        calendarExams,
    };
};
