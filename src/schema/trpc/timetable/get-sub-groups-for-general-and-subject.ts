import { z } from "zod/mini";

export const getSubGroupsForGeneralAndSubjectSchema = z.object({
    generalGroup: z.string().check(z.minLength(1, "Group label is required")),
    subject: z.string().check(z.minLength(1, "Subject label is required")),
});

export type GetSubGroupsForGeneralAndSubjectSchema = z.infer<
    typeof getSubGroupsForGeneralAndSubjectSchema
>;
