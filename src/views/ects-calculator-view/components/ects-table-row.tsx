"use client";

import type { EctsEntrySchema } from "@/schema/forms/ects-form-schema";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import EditEntryDialog from "./edit-entry-dialog";

type Props = {
    entry: EctsEntrySchema;
    index: number;
    checked: boolean;
    onToggle: () => void;
    onEdit: (value: EctsEntrySchema, index: number) => void;
    subjects: string[];
};

export default function EctsTableRow({
    entry,
    index,
    checked,
    subjects,
    onToggle,
    onEdit,
}: Props) {
    const t = useTranslations("ectsCalculator.form");

    const [open, setOpen] = useState(false);

    const updateOpen = (state: boolean) => {
        setOpen(state);
    };

    return (
        <div className="bg-button xs:p-1 mt-4 rounded-2xl p-3">
            {/* Mobile */}
            <div className="xs:hidden block">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 pt-1">
                        <input
                            className="size-4 align-middle accent-current"
                            type="checkbox"
                            checked={checked}
                            onChange={onToggle}
                            aria-label={`Select ${entry.name}`}
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-foreground mb-2 text-sm font-medium break-words">
                            {entry.name}
                        </div>
                        <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs">
                            <div className="flex items-center gap-1">
                                <span className="font-medium">
                                    {t("ectsLabelShort")}
                                </span>
                                <span>{entry.ects}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-medium">
                                    {t("gradeLabelShort")}
                                </span>
                                <span>{entry.grade}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex min-h-11 w-12 flex-shrink-0 items-center justify-center px-2 py-2">
                        <button
                            className="text-primary inline-flex cursor-pointer items-center justify-center"
                            type="button"
                            onClick={() => updateOpen(true)}
                            aria-label={t("editButton")}
                            title={t("editButton")}
                        >
                            <Pencil className="size-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop */}
            <div className="xs:flex xs:min-h-10 xs:items-center hidden">
                <div className="w-12 flex-shrink-0 px-2 py-2 text-center">
                    <input
                        className="size-4 align-middle accent-current"
                        type="checkbox"
                        checked={checked}
                        onChange={onToggle}
                        aria-label={`Select ${entry.name}`}
                    />
                </div>
                <div className="xs:text-base flex-1 px-2 py-1 text-center text-sm sm:px-4">
                    {entry.name}
                </div>
                <div className="xs:text-base flex-1 px-2 py-1 text-center text-sm sm:px-4">
                    {entry.ects}
                </div>
                <div className="xs:text-base flex-1 px-2 py-1 text-center text-sm sm:px-4">
                    {entry.grade}
                </div>
                <div className="flex w-12 flex-shrink-0 items-center justify-center px-2 py-2">
                    <button
                        className="text-primary inline-flex cursor-pointer items-center justify-center"
                        type="button"
                        onClick={() => updateOpen(true)}
                        aria-label={t("editButton")}
                        title={t("editButton")}
                    >
                        <Pencil className="size-4" />
                    </button>
                </div>
            </div>

            <EditEntryDialog
                open={open}
                entry={entry}
                index={index}
                editEntry={onEdit}
                onOpenChange={setOpen}
                subjects={subjects}
            />
        </div>
    );
}
