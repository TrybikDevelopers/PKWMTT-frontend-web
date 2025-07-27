import "server-only";

import { api } from "@/trpc/server";
import type {
    AcademicHours,
    GeneralGroups,
    Timetable,
} from "@/types/data-access/timetable";
import { getTimetableSettings } from "../cookies";
import { fetchGeneralGroups } from "../data-access/timetable";

type MainPageData =
    | {
          timetable: Timetable;
          hours: AcademicHours;
          generalGroups: null;
      }
    | {
          timetable: null;
          hours: null;
          generalGroups: GeneralGroups;
      };

export const fetchMainPageData = async (): Promise<MainPageData> => {
    const timetableSettings = await getTimetableSettings();

    if (timetableSettings) {
        const [timetableData, hoursData] = await Promise.all([
            api.timetable.getTimetable(timetableSettings),
            api.timetable.getAcademicHours(),
        ]);

        return {
            timetable: timetableData,
            hours: hoursData,
            generalGroups: null,
        };
    }

    const { generalGroups, error } = await fetchGeneralGroups();

    if (error) {
        throw new Error("Failed to fetch general groups");
    }

    return {
        timetable: null,
        hours: null,
        generalGroups,
    };
};
