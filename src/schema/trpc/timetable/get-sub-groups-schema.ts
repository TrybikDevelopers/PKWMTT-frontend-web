import z from "zod";

export const getSubGroupsSchema = z.object({
    generalGroup: z.string().min(1, "Group label is required"),
});

export type GetSubGroupsSchema = z.infer<typeof getSubGroupsSchema>;
