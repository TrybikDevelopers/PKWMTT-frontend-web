import type { TFunction } from "@/types/i18n";
import * as z from "zod/mini";

export const getModeratorPanelFormSchema = (
    t: TFunction<"moderatorPanel.moderatorDialog">,
) => {
    const moderatorPanelEntrySchema = z.object({
        group: z.string().check(z.minLength(1, t("groupRequired"))),
        email: z
            .string()
            .check(
                z.minLength(1, t("emailRequired")),
                z.email(t("emailInvalid")),
            ),
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
