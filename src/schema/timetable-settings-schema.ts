import * as z from "zod/mini";

export const customSubjectsSchema = z.object({
    subject: z.string().check(z.minLength(1)),
    generalGroup: z.string().check(z.minLength(1)),
    subGroup: z.optional(z.string()), // wait for api fix and then fix this
});

export const timetableSettingsSchema = z.object({
    generalGroup: z.string().check(z.minLength(1)),
    groups: z.array(z.string().check(z.minLength(1))),
    customSubjects: z.array(customSubjectsSchema),
});

export type TimetableSettingsSchema = z.infer<typeof timetableSettingsSchema>;
export type CustomSubjectSchema = z.infer<typeof customSubjectsSchema>;
