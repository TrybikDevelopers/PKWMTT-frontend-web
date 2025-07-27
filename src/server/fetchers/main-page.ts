import "server-only";

import { api } from "@/trpc/server";
import type { GeneralGroups, Timetable } from "@/types/data-access/timetable";
import { getTimetableSettings } from "../cookies";
import { fetchGeneralGroups } from "../data-access/timetable";

type MainPageData =
    | {
          timetable: Timetable;
          generalGroups: null;
      }
    | {
          timetable: null;
          generalGroups: GeneralGroups;
      };

export const fetchMainPageData = async (): Promise<MainPageData> => {
    const timetableSettings = await getTimetableSettings();

    if (timetableSettings) {
        const timetableData =
            await api.timetable.getTimetable(timetableSettings);

        return {
            timetable: timetableData,
            generalGroups: null,
        };
    }

    const { generalGroups, error } = await fetchGeneralGroups();

    if (error) {
        throw new Error("Failed to fetch general groups");
    }

    return {
        timetable: null,
        generalGroups,
    };
};
