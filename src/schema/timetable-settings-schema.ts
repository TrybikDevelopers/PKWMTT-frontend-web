import * as z from "zod/mini";

export const timetableSettingsSchema = z.object({
    generalGroup: z.string().check(z.minLength(1)),
    groups: z.array(z.string().check(z.minLength(1))),
});

export type TimetableSettingsSchema = z.infer<typeof timetableSettingsSchema>;
