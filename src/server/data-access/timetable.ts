import "server-only";

import type {
    FetchAcademicHoursResult,
    FetchGeneralGroupsResult,
    FetchSubGroupsResult,
    FetchTimetableResult,
} from "@/types/data-access/timetable";
import { generateFetchUrl } from ".";

// TODO: work on types

export const fetchGeneralGroups =
    async (): Promise<FetchGeneralGroupsResult> => {
        const url = generateFetchUrl("/groups/general");

        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            console.log(await response.text());

            return {
                data: null,
                error: "UnknownError",
            };
        }

        const data = await response.json();

        return {
            data,
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
            data: null,
            error: "UnknownError",
        };
    }

    const data = await response.json();

    return {
        data,
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
                data: null,
                error: "UnknownError",
            };
        }

        const data = await response.json();

        return {
            data,
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
            data: null,
            error: "UnknownError",
        };
    }

    const data = await response.json();

    return {
        data,
        error: null,
    };
};
