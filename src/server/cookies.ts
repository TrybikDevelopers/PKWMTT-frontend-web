import "server-only";

import { env } from "@/env";
import {
    type TimetableSettingsSchema,
    timetableSettingsSchema,
} from "@/schema/timetable-settings-schema";
import { cookies } from "next/headers";

export const TIMETABLE_SETTINGS_COOKIE_KEY = "NEXT_TIMETABLE_SETTINGS" as const;

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
            secure: !!env.ALLOW_UNSECURE_COOKIES
                ? true
                : env.NEXT_PUBLIC_IS_PROD,
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
