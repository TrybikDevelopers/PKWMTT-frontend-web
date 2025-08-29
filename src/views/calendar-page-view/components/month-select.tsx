import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    month: number;
    monthNames: string[];
    updateMonth: (month: number) => void;
    incrementMonth: () => void;
    decrementMonth: () => void;
};

export default function MonthSelect({
    month,
    monthNames,
    updateMonth,
    incrementMonth,
    decrementMonth,
}: Props) {
    return (
        <>
            {/* Mobile: Select dropdown */}
            <div className="mt-6 flex items-center justify-center md:hidden">
                <Select
                    value={month.toString()}
                    onValueChange={(v) => updateMonth(Number(v))}
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

            {/* Desktop: Nav + Month Grid Picker */}
            <div className="mt-8 hidden items-center justify-center gap-4 md:flex xl:gap-6">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementMonth}
                    className="cursor-pointer p-0"
                >
                    <ChevronLeft className="h-5 w-5 xl:h-6 xl:w-6" />
                </Button>

                <Popover>
                    <PopoverTrigger className="min-w-34 cursor-pointer text-xl xl:text-2xl">
                        {monthNames[month]}
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-fit shrink-0 p-3"
                        sideOffset={12}
                    >
                        <div className="grid grid-cols-3 gap-2">
                            {monthNames.map((label, idx) => (
                                <Button
                                    key={label}
                                    variant={
                                        idx === month ? "default" : "outline"
                                    }
                                    className={cn(
                                        "w-full cursor-pointer border border-transparent px-3 py-2 text-sm whitespace-nowrap",
                                        idx === month &&
                                            "bg-accent text-accent-foreground hover:bg-accent border-accent",
                                    )}
                                    onClick={() => updateMonth(idx)}
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementMonth}
                    className="cursor-pointer p-0"
                >
                    <ChevronRight className="h-5 w-5 xl:h-6 xl:w-6" />
                </Button>
            </div>
        </>
    );
}
