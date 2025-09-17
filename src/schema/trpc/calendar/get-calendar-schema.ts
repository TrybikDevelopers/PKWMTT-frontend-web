import z from "zod/mini";

export const getCalendarSchema = z.object({
    generalGroup: z.string().check(z.minLength(1, "Group label is required")),
    groups: z.array(
        z.string().check(z.minLength(1, "Group label is required")),
    ),
});

export type GetCalendarSchema = z.infer<typeof getCalendarSchema>;
