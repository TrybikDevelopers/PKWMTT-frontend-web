import z from "zod";

export const getTimetableSchema = z.object({
    generalGroup: z.string().min(1, "Group label is required"),
    subGroups: z.array(z.string().min(1)),
});
