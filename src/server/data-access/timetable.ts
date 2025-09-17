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
import { generateFetchUrl, getGenericHeaders } from ".";

export const fetchGeneralGroups =
    async (): Promise<FetchGeneralGroupsResult> => {
        const headers = getGenericHeaders();

        const url = generateFetchUrl("/timetables/groups/general");

        const response = await fetch(url, {
            method: "GET",
            headers,
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
    const url = generateFetchUrl(`/timetables/groups/${generalGroupLabel}`);

    const headers = getGenericHeaders();

    const response = await fetch(url, {
        method: "GET",
        headers,
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
        const url = generateFetchUrl("/timetables/hours");

        const headers = getGenericHeaders();

        const response = await fetch(url, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            console.log(await response.text());
            return {
                academicHours: null,
                error: "UnknownError",
            };
        }

        const data = (await response.json()) as AcademicHours;

        return {
            academicHours: data,
            error: null,
        };
    };

export const fetchTimetable = async (
    generalGroup: string,
    subGroups: string[],
): Promise<FetchTimetableResult> => {
    const url = generateFetchUrl(`/timetables/${generalGroup}`);

    const headers = getGenericHeaders();

    subGroups.forEach((subGroup) => {
        url.searchParams.append("sub", subGroup);
    });

    const response = await fetch(url, {
        method: "GET",
        headers,
    });

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
