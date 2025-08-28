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
        <>
            {/* Mobile: Compact design (below md breakpoint) */}
            <div className="md:hidden">
                <div
                    className={cn(
                        "flex aspect-square items-center justify-center rounded-md",
                        isMuted && "text-muted-foreground/70",
                    )}
                >
                    <div className="relative h-10 w-10">
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
            </div>

            {/* Desktop: Card-like design (md breakpoint and above) */}
            <div className="hidden md:block">
                <div
                    className={cn(
                        "bg-card mx-auto flex min-h-32 max-w-32 flex-col items-center justify-start rounded-xl border p-3 shadow-sm transition-all lg:min-h-36",
                        isMuted && "text-muted-foreground/70 opacity-60",
                        isToday &&
                            "border-primary bg-accent/5 ring-primary/20 shadow-md ring-1",
                    )}
                >
                    {/* Day number */}
                    <div className="mb-2">
                        <span
                            className={cn(
                                "text-xl font-bold",
                                isToday && "text-primary",
                            )}
                        >
                            {day.date.getDate()}
                        </span>
                    </div>

                    {/* Event indicators */}
                    <div className="mb-3 flex gap-1">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#E35D23] shadow-sm"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-[#83D32E] shadow-sm"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-[#3B82F6] shadow-sm"></div>
                    </div>

                    {/* Event preview area */}
                    <div className="flex w-full flex-1 flex-col gap-1">
                        <div className="from-primary/20 to-primary/10 h-2 w-full rounded-full bg-gradient-to-r"></div>
                        <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-orange-400/20 to-orange-400/10"></div>
                        <div className="h-2 w-3/5 rounded-full bg-gradient-to-r from-green-400/20 to-green-400/10"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
