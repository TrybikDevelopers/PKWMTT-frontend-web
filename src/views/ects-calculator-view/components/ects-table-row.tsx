"use client";

type EctsTableRowProps = {
    name: string;
    ects: number | string;
    grade: number;
    checked?: boolean;
    onToggle?: () => void;
};

export default function EctsTableRow({
    name,
    ects,
    grade,
    checked = false,
    onToggle,
}: EctsTableRowProps) {
    return (
        <div className="bg-button mt-4 flex min-h-12 items-center rounded-2xl p-1">
            <div className="w-12 px-4 py-2 text-center">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onToggle}
                    className="size-4 align-middle accent-current"
                    aria-label={`Select ${name}`}
                />
            </div>
            <div className="flex-1 px-4 py-2 text-center">{name}</div>
            <div className="flex-1 px-4 py-2 text-center">{ects}</div>
            <div className="flex-1 px-4 py-2 text-center">{grade}</div>
        </div>
    );
}
