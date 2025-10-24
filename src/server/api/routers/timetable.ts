import "server-only";

import { MAX_CUSTOM_SUBJECTS } from "@/constants/custom-subjects";
import { getCustomSubjectFormSchema } from "@/schema/forms/custom-subject-form-schema";
import { getTimetableFormSchema } from "@/schema/forms/timetable-form-schema";
import { CustomSubjectSchema } from "@/schema/timetable-settings-schema";
import { getSubGroupsForGeneralAndSubjectSchema } from "@/schema/trpc/timetable/get-sub-groups-for-general-and-subject";
import { getSubGroupsSchema } from "@/schema/trpc/timetable/get-sub-groups-schema";
import { getSubjectsForGeneralGroupSchema } from "@/schema/trpc/timetable/get-subjects-for-general-group-schema";
import { getTimetableSchema } from "@/schema/trpc/timetable/get-timetable-schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { setTimetableSettings } from "@/server/cookies";
import {
    fetchAcademicHours,
    fetchGeneralGroups,
    fetchSubGroupsForGeneralAndSubject,
    fetchSubGroupsForGeneralGroup,
    fetchSubjectsForGeneralGroup,
    fetchTimetable,
    getValidTimetableSettings,
} from "@/server/data-access/timetable";
import { TRPCError } from "@trpc/server";
import { getTranslations } from "next-intl/server";

export const timetableRouter = createTRPCRouter({
    getGeneralGroups: publicProcedure.query(async () => {
        const { generalGroups, error } = await fetchGeneralGroups();

        if (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to fetch general groups",
            });
        }

        return generalGroups;
    }),
    getSubGroups: publicProcedure
        .input(getSubGroupsSchema)
        .query(async ({ input }) => {
            const { subGroups, error } = await fetchSubGroupsForGeneralGroup(
                input.generalGroup,
            );

            if (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to fetch subgroups",
                });
            }

            const groupedSubGroups: Map<string, Set<string>> = new Map();

            subGroups.forEach((subGroup) => {
                const firstLetter = subGroup.charAt(0);

                if (!groupedSubGroups.has(firstLetter)) {
                    groupedSubGroups.set(firstLetter, new Set([subGroup]));
                }

                groupedSubGroups.get(firstLetter)?.add(subGroup);
            });

            return Array.from(groupedSubGroups).map(
                ([firstLetter, subGroupSet]) => ({
                    firstLetter,
                    subGroups: Array.from(subGroupSet),
                }),
            );
        }),
    getAcademicHours: publicProcedure.query(async () => {
        const { academicHours, error } = await fetchAcademicHours();

        if (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to fetch academic hours",
            });
        }

        return academicHours;
    }),
    getTimetable: publicProcedure
        .input(getTimetableSchema)
        .query(async ({ input }) => {
            const { timetable, error } = await fetchTimetable(
                input.generalGroup,
                input.groups,
                input.customSubjects,
            );

            if (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to fetch timetable",
                });
            }

            return timetable;
        }),
    submitTimetableForm: publicProcedure
        .input(async (value) =>
            getTimetableFormSchema(
                await getTranslations("timetableForm"),
            ).parse(value),
        )
        .mutation(async ({ input }) => {
            const { timetableSettings } = await getValidTimetableSettings();

            await setTimetableSettings({
                generalGroup: input.generalGroup,
                groups: input.groups,
                customSubjects: timetableSettings?.customSubjects || [],
            });

            return {
                success: true,
            };
        }),
    submitCustomSubjectsForm: publicProcedure
        .input(async (value) =>
            getCustomSubjectFormSchema(
                await getTranslations("settings.customSubjects"),
            ).parse(value),
        )
        .mutation(async ({ input }) => {
            const { timetableSettings } = await getValidTimetableSettings();

            if (!timetableSettings) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message:
                        "Timetable settings are required to submit custom subjects",
                });
            }

            const newCustomSubjects: CustomSubjectSchema[] = [
                ...timetableSettings.customSubjects,
                {
                    subject: input.subject,
                    generalGroup: input.generalGroup,
                    subGroup: input.subGroup,
                },
            ];

            if (newCustomSubjects.length > MAX_CUSTOM_SUBJECTS) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: `You can only add up to ${MAX_CUSTOM_SUBJECTS} custom subjects`,
                });
            }

            await setTimetableSettings({
                generalGroup: timetableSettings.generalGroup,
                groups: timetableSettings.groups,
                customSubjects: newCustomSubjects,
            });

            return {
                success: true,
            };
        }),
    getSubjectsForGeneralGroup: publicProcedure
        .input(getSubjectsForGeneralGroupSchema)
        .query(async ({ input }) => {
            const { subjects, error } = await fetchSubjectsForGeneralGroup(
                input.generalGroup,
            );

            if (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to fetch subjects",
                });
            }

            return subjects;
        }),
    getSubGroupsForGeneralAndSubject: publicProcedure
        .input(getSubGroupsForGeneralAndSubjectSchema)
        .query(async ({ input }) => {
            const { subGroups, error } =
                await fetchSubGroupsForGeneralAndSubject(
                    input.generalGroup,
                    input.subject,
                );

            if (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to fetch sub groups",
                });
            }

            return subGroups;
        }),
});
