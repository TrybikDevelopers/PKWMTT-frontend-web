import type { TFunction } from "@/types/i18n";
import * as z from "zod/mini";

export const getModeratorPanelFormSchema = (
    t: TFunction<"moderatorPanel.ModeratorDialog">,
) => {
    const moderatorPanelEntrySchema = z.object({
        group: z.string().check(z.minLength(1, t("groupRequired"))),
        email: z
            .string()
            .check(z.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t("emailInvalid")))
            .check(z.minLength(1, t("emailRequired"))),
    });

    const entriesArraySchema = z.array(moderatorPanelEntrySchema);

    return {
        moderatorPanelEntrySchema,
        entriesArraySchema,
    };
};

export type ModeratorPanelEntrySchema = z.infer<
    ReturnType<typeof getModeratorPanelFormSchema>["moderatorPanelEntrySchema"]
>;
