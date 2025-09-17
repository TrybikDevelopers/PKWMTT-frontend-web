import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalendarExam } from "@/types/data-access/calendar";

const MobileItemsIndicators = ({ items }: { items: CalendarExam[] }) => {
    return items.slice(0, 4).map((_, index) => (
        <div
            key={index}
            className={cn(
                "absolute top-0 right-0 size-2 rounded-full",
                index === 0 && "bg-activity-1",
                index === 1 && "bg-activity-2",
                index === 2 && "bg-activity-3",
                index === 3 && "bg-activity-4",
            )}
            style={{
                transform: `translateY(${(index + 1) * 4}px)`,
            }}
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

export default function CalendarDayMobile({
    day,
    items,
    isMuted,
    updateOpen,
    isToday,
}: Props) {
    return (
        <div className="md:hidden">
            <Button
                className={cn(
                    "flex aspect-square h-full w-full cursor-pointer items-center justify-center rounded-md bg-transparent p-0 hover:bg-transparent",
                    isMuted && "text-muted-foreground/70",
                )}
                type="button"
                onClick={() => updateOpen(true)}
            >
                <div className="relative h-10 w-10">
                    <MobileItemsIndicators items={items} />
                    <span
                        className={cn(
                            "flex h-full w-full items-center justify-center rounded-full text-lg font-light",
                            isToday && "bg-accent text-accent-foreground",
                        )}
                    >
                        {day.date.getDate()}
                    </span>
                </div>
            </Button>
        </div>
    );
}
