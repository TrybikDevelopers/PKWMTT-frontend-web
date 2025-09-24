"use client";

import { useTranslations } from "next-intl";

type Props = {
    name: string;
    ects: number | string;
    grade: string;
    checked: boolean;
    onToggle?: () => void;
};

export default function EctsTableRow({
    name,
    ects,
    grade,
    checked,
    onToggle,
}: Props) {
    const t = useTranslations("ectsCalculator.form");

    return (
        <div className="bg-button xs:p-1 mt-4 rounded-2xl p-3">
            {/* Mobile */}
            <div className="xs:hidden block">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 pt-1">
                        <input
                            className="size-4 align-middle accent-current"
                            type="checkbox"
                            checked={checked}
                            onChange={onToggle}
                            aria-label={`Select ${name}`}
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-foreground mb-2 text-sm font-medium break-words">
                            {name}
                        </div>
                        <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs">
                            <div className="flex items-center gap-1">
                                <span className="font-medium">
                                    {t("ectsLabelShort")}
                                </span>
                                <span>{ects}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-medium">
                                    {t("gradeLabelShort")}
                                </span>
                                <span>{grade}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop */}
            <div className="xs:flex xs:min-h-10 xs:items-center hidden">
                <div className="w-12 px-2 py-2 text-center">
                    <input
                        className="size-4 align-middle accent-current"
                        type="checkbox"
                        checked={checked}
                        onChange={onToggle}
                        aria-label={`Select ${name}`}
                    />
                </div>
                <div className="flex-1 px-4 py-2 text-center">{name}</div>
                <div className="flex-1 px-4 py-2 text-center">{ects}</div>
                <div className="flex-1 px-4 py-2 text-center">{grade}</div>
                <div className="w-12 px-2 py-2 text-center">
                    <button
                        className="size-4 align-middle accent-current"
                        type="submit"
                    />
                </div>
            </div>
        </div>
    );
}
