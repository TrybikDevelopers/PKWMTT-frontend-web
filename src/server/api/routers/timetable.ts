import { getSubGroupsSchema } from "@/schema/trpc/timetable/get-sub-groups-schema";
import { getTimetableSchema } from "@/schema/trpc/timetable/get-timetable-schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
    fetchAcademicHours,
    fetchGeneralGroups,
    fetchSubGroupsForGeneralGroup,
    fetchTimetable,
} from "@/server/data-access/timetable";

export const timetableRouter = createTRPCRouter({
    getGeneralGroups: publicProcedure.query(async () => {
        const { data } = await fetchGeneralGroups();

        return data;
    }),
    getSubGroups: publicProcedure
        .input(getSubGroupsSchema)
        .query(async ({ input }) => {
            const { data } = await fetchSubGroupsForGeneralGroup(
                input.generalGroupLabel,
            );

            return data;
        }),
    getAcademicHours: publicProcedure.query(async () => {
        const { data } = await fetchAcademicHours();

        return data;
    }),
    getTimetable: publicProcedure
        .input(getTimetableSchema)
        .query(async ({ input }) => {
            const { data } = await fetchTimetable(
                input.generalGroup,
                input.subGroups,
            );

            return data;
        }),
});
