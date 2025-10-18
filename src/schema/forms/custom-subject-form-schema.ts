import type { TFunction } from "@/types/i18n";
import { z } from "zod/mini";

export const getCustomSubjectFormSchema = (
    t: TFunction<"settings.customSubjects">,
) => {
    const customSubjectSchema = z.object({
        subject: z.string().check(z.minLength(1, t("required"))),
        generalGroup: z.string().check(z.minLength(1, t("required"))),
        subGroup: z.string().check(z.minLength(1, t("required"))),
    });

    return customSubjectSchema;
};

export type CustomSubjectFormSchema = z.infer<
    ReturnType<typeof getCustomSubjectFormSchema>
>;
