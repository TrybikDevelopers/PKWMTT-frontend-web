import { cn } from "@/lib/utils";

type Props = {
    day: {
        date: Date;
        inCurrentMonth: boolean;
        isToday: boolean;
    };
};

export default function CalendarDay({ day }: Props) {
    const isToday = day.isToday;
    const isMuted = !day.inCurrentMonth;

    return (
        <div
            className={cn(
                "relative flex aspect-square items-center justify-center rounded-md",
                isMuted && "text-muted-foreground/70",
            )}
        >
            <div className="relative size-10">
                <div className="absolute top-0 right-0 size-2 rounded-full bg-[#E35D23]"></div>
                <div className="absolute top-0 right-0 size-2 translate-y-1 rounded-full bg-[#83D32E]"></div>
                <span
                    className={cn(
                        "flex h-full w-full items-center justify-center rounded-full text-lg font-light",
                        isToday && "bg-accent text-accent-foreground",
                    )}
                >
                    {day.date.getDate()}
                </span>
            </div>
        </div>
    );
}
