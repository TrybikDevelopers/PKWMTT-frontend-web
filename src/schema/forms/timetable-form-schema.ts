import type { TFunction } from "@/types/i18n";
import * as z from "zod/mini";

export const getTimetableFormSchema = (t: TFunction<"timetableForm">) => {
    const timetableFormSchema = z.object({
        generalGroup: z.string().check(z.minLength(1, t("required"))),
        groups: z
            .array(z.string(t("required")).check(z.minLength(1, t("required"))))
            .check(z.minLength(1, t("required"))),
    });

    return timetableFormSchema;
};

export type TimetableFormSchema = z.infer<
    ReturnType<typeof getTimetableFormSchema>
>;
