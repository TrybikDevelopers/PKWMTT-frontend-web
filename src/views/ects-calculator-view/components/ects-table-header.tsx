"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

type Props = {
    allSelected: boolean;
    someSelected: boolean;
    onToggleAll: () => void;
};

export default function EctsTableHeader({
    allSelected,
    someSelected,
    onToggleAll,
}: Props) {
    const t = useTranslations("ectsCalculator.form");
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = !allSelected && someSelected;
        }
    }, [allSelected, someSelected]);

    return (
        <div className="bg-table-header flex min-h-12 items-center rounded-2xl p-1">
            <div className="w-12 flex-shrink-0 px-2 py-2 text-center">
                <input
                    ref={checkboxRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={onToggleAll}
                    className="size-4 align-middle accent-current"
                    aria-label={t("selectAll")}
                />
            </div>
            <div className="xs:text-base flex-1 px-2 py-2 text-center text-sm sm:px-4">
                {t("tableHeaderName")}
            </div>
            <div className="xs:text-base flex-1 px-2 py-2 text-center text-sm sm:px-4">
                {t("tableHeaderEcts")}
            </div>
            <div className="xs:text-base flex-1 px-2 py-2 text-center text-sm sm:px-4">
                {t("tableHeaderGrade")}
            </div>
            <div className="w-12 flex-shrink-0 px-2 py-2 text-center"></div>
        </div>
    );
}
