import type { TFunction } from "@/types/i18n";
import { z } from "zod";

export function getModeratorAuthFormSchema(
    t: TFunction<"moderatorPanel.loginForm">,
) {
    const requiredMessage = t("required");

    const moderatorAuthSchema = z.object({
        login: z.string().min(1, requiredMessage),
        password: z.string().min(1, requiredMessage),
    });

    return { moderatorAuthSchema };
}

export type ModeratorAuthFormSchema = z.infer<
    ReturnType<typeof getModeratorAuthFormSchema>["moderatorAuthSchema"]
>;
