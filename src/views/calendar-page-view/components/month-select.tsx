import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    month: number;
    monthNames: string[];
    onMonthChange: (month: number) => void;
};

export default function MonthSelect({
    month,
    monthNames,
    onMonthChange,
}: Props) {
    return (
        <div className="mt-10 flex items-center justify-center">
            <Select
                value={month.toString()}
                onValueChange={(v) => onMonthChange(Number(v))}
            >
                <SelectTrigger className="h-fit! min-w-56 cursor-pointer rounded-lg px-4 py-2 text-base">
                    <SelectValue placeholder={monthNames[month]} />
                </SelectTrigger>
                <SelectContent>
                    {monthNames.map((label, idx) => (
                        <SelectItem key={idx} value={String(idx)}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
