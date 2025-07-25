import "server-only";

import type {
    AcademicHours,
    FetchAcademicHoursResult,
    FetchGeneralGroupsResult,
    FetchSubGroupsResult,
    FetchTimetableResult,
    GeneralGroups,
    SubGroups,
    Timetable,
} from "@/types/data-access/timetable";
import { generateFetchUrl } from ".";

export const fetchGeneralGroups =
    async (): Promise<FetchGeneralGroupsResult> => {
        const url = generateFetchUrl("/groups/general");

        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            console.log(await response.text());

            return {
                generalGroups: null,
                error: "UnknownError",
            };
        }

        const data = (await response.json()) as GeneralGroups;

        return {
            generalGroups: data,
            error: null,
        };
    };

export const fetchSubGroupsForGeneralGroup = async (
    generalGroupLabel: string,
): Promise<FetchSubGroupsResult> => {
    const url = generateFetchUrl(`/groups/${generalGroupLabel}`);

    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) {
        console.log(await response.text());

        return {
            subGroups: null,
            error: "UnknownError",
        };
    }

    const data = (await response.json()) as SubGroups;

    return {
        subGroups: data,
        error: null,
    };
};

export const fetchAcademicHours =
    async (): Promise<FetchAcademicHoursResult> => {
        const url = generateFetchUrl("/hours");

        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            console.log(await response.text());
            return {
                academicHours: null,
                error: "UnknownError",
            };
        }

        const data = (await response.json()) as { hours: AcademicHours };

        return {
            academicHours: data.hours,
            error: null,
        };
    };

export const fetchTimetable = async (
    generalGroup: string,
    subGroups: string[],
): Promise<FetchTimetableResult> => {
    const url = generateFetchUrl(`/${generalGroup}`);

    subGroups.forEach((subGroup) => {
        url.searchParams.append("sub", subGroup);
    });

    const response = await fetch(url);

    if (!response.ok) {
        console.log(await response.text());

        return {
            timetable: null,
            error: "UnknownError",
        };
    }

    const data = (await response.json()) as Timetable;

    return {
        timetable: data,
        error: null,
    };
};
