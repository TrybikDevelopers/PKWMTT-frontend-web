"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    id: string;
    subject: string;
    generalGroup: string;
    subGroup?: string;
    onRemove: (id: string) => void;
};

export default function CustomSubjectItem({
    id,
    subject,
    generalGroup,
    subGroup,
    onRemove,
}: Props) {
    const t = useTranslations("settings.customSubjects");

    return (
        <div className="border-border bg-background flex items-center justify-between rounded-lg border p-4 transition-colors">
            <div className="flex-1 space-y-1">
                <h3 className="text-foreground font-medium">{subject}</h3>
                <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <span>
                        <span className="font-medium">
                            {t("generalGroupLabel")}:
                        </span>{" "}
                        {generalGroup}
                    </span>
                    {subGroup && (
                        <span>
                            <span className="font-medium">
                                {t("subGroupLabel")}:
                            </span>{" "}
                            {subGroup}
                        </span>
                    )}
                </div>
            </div>
            <Button
                type="button"
                variant="destructive"
                size="sm"
                className="ml-4 cursor-pointer"
                onClick={() => onRemove(id)}
            >
                <Trash2 className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">
                    {t("removeButton")}
                </span>
            </Button>
        </div>
    );
}
