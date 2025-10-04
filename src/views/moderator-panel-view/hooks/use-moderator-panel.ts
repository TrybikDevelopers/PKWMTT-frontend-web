import useFirstRender from "@/hooks/use-first-render";
import {
    getModeratorPanelFormSchema,
    ModeratorPanelEntrySchema,
} from "@/schema/forms/moderator-panel-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";

export default function useModeratorPanel() {
    const [open, setOpen] = useState(false);

    const t = useTranslations("moderatorPanel.moderatorDialog");

    const { isFirstRender } = useFirstRender();

    const [rows, setRows] = useLocalStorage<ModeratorPanelEntrySchema[]>(
        "moderator-panel-rows",
        [],
        {
            deserializer: (value: string): ModeratorPanelEntrySchema[] => {
                try {
                    const parsed = getModeratorPanelFormSchema(
                        t,
                    ).entriesArraySchema.parse(JSON.parse(value));

                    return parsed;
                } catch {
                    return [];
                }
            },
        },
    );

    const form = useForm<ModeratorPanelEntrySchema>({
        resolver: zodResolver(
            getModeratorPanelFormSchema(t).moderatorPanelEntrySchema,
        ),
        defaultValues: { group: "", email: "" },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onSubmit = (values: ModeratorPanelEntrySchema) => {
        setRows((prev) => [
            ...prev,
            { group: values.group, email: values.email },
        ]);

        form.reset({
            group: "",
            email: "",
        });

        setOpen(false);
    };

    const handleDialogOpenChange = (state: boolean) => {
        setOpen(state);

        if (state) {
            form.reset({
                group: "",
                email: "",
            });
        }
    };

    const handleDelete = (index: number) => {
        setRows((prev) => prev.filter((_, idx) => idx !== index));
    };

    const handleSendAgain = (index: number) => {
        const moderator = rows[index];
        if (moderator) {
            console.log(
                `Sending again for moderator: ${moderator.group} - ${moderator.email}`,
            );
        }
    };

    return {
        rows: isFirstRender ? [] : rows,
        isFirstRender,
        open,
        onSubmit,
        handleDialogOpenChange,
        handleDelete,
        handleSendAgain,
        form,
    };
}
