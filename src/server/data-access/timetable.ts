import "server-only";

import type {
    CustomSubjectSchema,
    TimetableSettingsSchema,
} from "@/schema/timetable-settings-schema";
import type {
    AcademicHours,
    FetchAcademicHoursResult,
    FetchGeneralGroupsResult,
    FetchSubGroupsResult,
    FetchSubjectsForGeneralGroupResult,
    FetchTimetableResult,
    GeneralGroups,
    SubGroups,
    Timetable,
} from "@/types/data-access/timetable";
import { getTimetableSettings } from "../cookies";
import { generateFetchUrl } from "./generate-fetch-url";
import { getGenericHeaders } from "./get-generic-headers";

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

export const fetchSubjectsForGeneralGroup = async (
    generalGroupLabel: string,
): Promise<FetchSubjectsForGeneralGroupResult> => {
    const url = generateFetchUrl(`/timetables/${generalGroupLabel}/list`);

    const headers = getGenericHeaders();

    const response = await fetch(url, {
        method: "GET",
        headers,
    });

    if (!response.ok) {
        console.log(await response.text());
        return {
            subjects: null,
            error: "UnknownError",
        };
    }

    const data = (await response.json()) as string[];

    return {
        subjects: data,
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

export const fetchSubGroupsForGeneralAndSubject = async (
    generalGroup: string,
    subject: string,
): Promise<FetchSubGroupsResult> => {
    const url = generateFetchUrl(
        `/timetables/groups/${generalGroup}/${subject}`,
    );

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
    customSubjects: CustomSubjectSchema[],
): Promise<FetchTimetableResult> => {
    const url = generateFetchUrl(`/timetables/${generalGroup}`);

    const headers = getGenericHeaders();
    headers.set("Content-Type", "application/json");

    subGroups.forEach((subGroup) => {
        url.searchParams.append("sub", subGroup);
    });

    const body: {
        generalGroup: string;
        name: string;
        subGroup?: string;
    }[] = customSubjects.map((customSubject) => ({
        generalGroup: customSubject.generalGroup,
        name: customSubject.subject,
        subGroup: customSubject.subGroup,
    }));
    console.log(body);
    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
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

/**
 * Validates the timetable settings by checking if the general group and subgroups exist in the API.
 * @param timetableSettings - The timetable settings to validate.
 * @returns The timetable settings if valid, null otherwise.
 */

export const getValidTimetableSettings = async (): Promise<{
    timetableSettings: TimetableSettingsSchema | null;
}> => {
    const timetableSettings = await getTimetableSettings();

    if (!timetableSettings) {
        return { timetableSettings: null };
    }

    const subGroupsFromApi = await fetchSubGroupsForGeneralGroup(
        timetableSettings.generalGroup,
    );

    if (subGroupsFromApi.error) {
        return { timetableSettings: null };
    }

    for (const group of timetableSettings.groups) {
        if (!subGroupsFromApi.subGroups.includes(group)) {
            return { timetableSettings: null };
        }
    }

    return { timetableSettings };
};
