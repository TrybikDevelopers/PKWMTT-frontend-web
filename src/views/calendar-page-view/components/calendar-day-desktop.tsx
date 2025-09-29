import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalendarExam } from "@/types/data-access/calendar";

const DesktopItemsIndicators = ({ items }: { items: CalendarExam[] }) => {
    return items.slice(0, 4).map((_, index) => (
        <div
            key={index}
            className={cn(
                "h-2.5 w-2.5 rounded-full shadow-sm lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5",

                index === 0 && "bg-activity-1",
                index === 1 && "bg-activity-2",
                index === 2 && "bg-activity-3",
                index === 3 && "bg-activity-4",
            )}
        />
    ));
};

type Props = {
    day: {
        date: Date;
        inCurrentMonth: boolean;
        isToday: boolean;
    };
    items: CalendarExam[];
    isMuted: boolean;
    updateOpen: (open: boolean) => void;
    isToday: boolean;
};

export default function CalendarDayDesktop({
    day,
    items,
    isMuted,
    isToday,
    updateOpen,
}: Props) {
    return (
        <div className="hidden md:block">
            <Button
                type="button"
                disabled={items.length === 0}
                onClick={items.length > 0 ? () => updateOpen(true) : undefined}
                className={cn(
                    "bg-card mx-auto flex min-h-32 w-full max-w-32 cursor-pointer flex-col items-center justify-start rounded-xl border p-3 shadow-sm transition-all disabled:opacity-100 lg:min-h-36 lg:max-w-38 lg:p-4 xl:min-h-40 xl:p-5",
                    isMuted && "text-muted-foreground/70 opacity-60",
                    isToday &&
                        "border-primary bg-accent/5 ring-primary/20 shadow-md ring-1",
                )}
            >
                {/* Day number */}
                <div className="mb-2 lg:mb-3 xl:mb-4">
                    <span
                        className={cn(
                            "text-xl font-bold lg:text-2xl xl:text-3xl",
                            isToday && "text-primary",
                        )}
                    >
                        {day.date.getDate()}
                    </span>
                </div>

                {/* Event indicators */}
                {items.length > 0 && (
                    <div className="mb-3 flex min-h-2.5 gap-1 lg:mb-4 lg:gap-1.5 xl:mb-5">
                        <DesktopItemsIndicators items={items} />
                    </div>
                )}
            </Button>
        </div>
    );
}
