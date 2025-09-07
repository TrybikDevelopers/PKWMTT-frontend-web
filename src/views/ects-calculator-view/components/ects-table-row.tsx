"use client";

type Props = {
    name: string;
    ects: number | string;
    grade: number;
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
    return (
        <div className="bg-button mt-4 flex min-h-12 items-center rounded-2xl p-1">
            <div className="xs:px-4 w-12 px-2 py-2 text-center">
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
        </div>
    );
}
