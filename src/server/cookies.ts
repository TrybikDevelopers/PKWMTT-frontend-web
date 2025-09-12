import "server-only";

import { env } from "@/env";
import {
    type TimetableSettingsSchema,
    timetableSettingsSchema,
} from "@/schema/timetable-settings-schema";
import { cookies } from "next/headers";

export const TIMETABLE_SETTINGS_COOKIE_KEY = "NEXT_TIMETABLE_SETTINGS" as const;
export const ECTS_CALCULATOR_COOKIE_KEY = "NEXT_ECTS_CALCULATOR" as const;

export const filterTimetableSettingsInput = (
    data: TimetableSettingsSchema,
): TimetableSettingsSchema => {
    // filter out potential unwanted keys
    // for now 27.07.2025 there are no unwanted keys but may be in the future
    return {
        generalGroup: data.generalGroup,
        groups: data.groups,
    };
};

export const setTimetableSettings = async (data: TimetableSettingsSchema) => {
    const timetableSettingsString = JSON.stringify(
        filterTimetableSettingsInput(data),
    );

    (await cookies()).set(
        TIMETABLE_SETTINGS_COOKIE_KEY,
        timetableSettingsString,
        {
            path: "/",
            maxAge: 60 * 60 * 24 * 365, // 1 year
            httpOnly: true,
            sameSite: "lax",
            secure: env.NEXT_PUBLIC_IS_PROD,
        },
    );
};

export const getTimetableSettings =
    async (): Promise<TimetableSettingsSchema | null> => {
        const timetableSettingsCookie = (await cookies()).get(
            TIMETABLE_SETTINGS_COOKIE_KEY,
        );
        if (!timetableSettingsCookie) return null;

        try {
            const parsedJson = JSON.parse(timetableSettingsCookie.value);
            if (!timetableSettingsSchema.safeParse(parsedJson).success)
                return null;

            return parsedJson;
        } catch {
            return null;
        }
    };

type EctsEntry = {
    name: string;
    ects: number;
    grade: number;
};

export const setEctsCalculatorData = async (data: EctsEntry[]) => {
    const ectsDataString = JSON.stringify(data);
    (await cookies()).set(ECTS_CALCULATOR_COOKIE_KEY, ectsDataString, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: false,
        sameSite: "lax",
        secure: env.NEXT_PUBLIC_IS_PROD,
    });
};

export const getEctsCalculatorData = async (): Promise<EctsEntry[] | null> => {
    const ectsCookie = (await cookies()).get(ECTS_CALCULATOR_COOKIE_KEY);
    if (!ectsCookie) return null;

    try {
        const parsedData = JSON.parse(ectsCookie.value);
        if (!Array.isArray(parsedData)) return null;

        const isValid = parsedData.every(
            (item) =>
                typeof item === "object" &&
                typeof item.name === "string" &&
                typeof item.ects === "number" &&
                typeof item.grade === "number",
        );

        return isValid ? parsedData : null;
    } catch {
        return null;
    }
};
