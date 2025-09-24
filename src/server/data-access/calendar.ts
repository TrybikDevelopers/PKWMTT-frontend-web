import "server-only";

import type { CalendarExam } from "@/types/data-access/calendar";
import { generateFetchUrl } from "./generate-fetch-url";
import { getGenericHeaders } from "./get-generic-headers";

export const fetchCalendarByGroups = async (
    generalGroup: string,
    subGroups: string[],
): Promise<
    | {
          calendarExams: null;
          error: "UnknownError";
      }
    | {
          calendarExams: CalendarExam[];
          error: null;
      }
> => {
    const headers = getGenericHeaders();

    const url = generateFetchUrl(`/exams/by-groups`);
    url.searchParams.append("generalGroups", generalGroup);

    subGroups.forEach((subGroup) => {
        url.searchParams.append("subgroups", subGroup);
    });

    const response = await fetch(url, {
        method: "GET",
        headers,
        next: {
            revalidate: 60 * 5, // 5 minutes
        },
    });

    if (!response.ok) {
        console.log(await response.text());

        return {
            calendarExams: null,
            error: "UnknownError",
        };
    }

    const data = (await response.json()) as CalendarExam[];

    return {
        calendarExams: data,
        error: null,
    };
};
