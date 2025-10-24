import { customSubjectsSchema } from "@/schema/timetable-settings-schema";
import * as z from "zod/mini";

export const getTimetableSchema = z.object({
    generalGroup: z.string().check(z.minLength(1, "Group label is required")),
    groups: z.array(z.string().check(z.minLength(1))),
    customSubjects: z.array(customSubjectsSchema),
});
