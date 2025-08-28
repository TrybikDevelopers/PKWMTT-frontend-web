"use client";

import { useEffect, useRef } from "react";

type EctsTableHeaderProps = {
    allSelected: boolean;
    someSelected: boolean;
    onToggleAll: () => void;
};

export default function EctsTableHeader({
    allSelected,
    someSelected,
    onToggleAll,
}: EctsTableHeaderProps) {
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = !allSelected && someSelected;
        }
    }, [allSelected, someSelected]);

    return (
        <div className="flex min-h-12 items-center rounded-2xl bg-[#161415] p-1">
            <div className="w-12 px-4 py-2 text-center">
                <input
                    ref={checkboxRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={onToggleAll}
                    className="size-4 align-middle accent-current"
                    aria-label="Select all"
                />
            </div>
            <div className="flex-1 px-4 py-2 text-center">Nazwa</div>
            <div className="flex-1 px-4 py-2 text-center">Wartość ECTS</div>
            <div className="flex-1 px-4 py-2 text-center">Ocena</div>
        </div>
    );
}
