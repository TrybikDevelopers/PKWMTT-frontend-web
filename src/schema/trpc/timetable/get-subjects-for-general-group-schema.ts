import * as z from "zod/mini";

export const getSubjectsForGeneralGroupSchema = z.object({
    generalGroup: z.string().check(z.minLength(1, "Group label is required")),
});

export type GetSubjectsForGeneralGroupSchema = z.infer<
    typeof getSubjectsForGeneralGroupSchema
>;
