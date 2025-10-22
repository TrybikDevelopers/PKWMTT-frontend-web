import { getModeratorAuthFormSchema } from "@/schema/forms/moderator-auth-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

export default function useModeratorAuth() {
    const t = useTranslations("moderatorPanel.loginForm");
    const locale = useLocale();

    const { moderatorAuthSchema } = getModeratorAuthFormSchema(t);

    const form = useForm<{
        login: string;
        password: string;
    }>({
        resolver: zodResolver(moderatorAuthSchema),
        defaultValues: { login: "", password: "" },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onSubmit = (values: { login: string; password: string }) => {
        if (locale === "pl") {
            redirect("/moderator/starosci");
        } else {
            redirect("/moderator/representatives");
        }
    };

    return { form, onSubmit } as const;
}
