import ChevronLeftSVG from "@/components/svg/chevron-left-svg";
import { Button } from "@/components/ui/button";
import { useStickyHeader } from "@/hooks/use-sticky-header";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import ChangeDayButton from "./change-day-button";

type Props = {
    incrementDayIndex: () => void;
    decrementDayIndex: () => void;
    selectedDayIndex: number;
    toggleWeekParity: () => void;
    weekParity: "EVEN" | "ODD";
};

export default function TimetableHeader({
    incrementDayIndex,
    decrementDayIndex,
    selectedDayIndex,
    weekParity,
    toggleWeekParity,
}: Props) {
    const t = useTranslations("home");
    const { placeholderRef, isSticky, headerHeight, headerRef } =
        useStickyHeader();

    const days = [
        t("days.monday"),
        t("days.tuesday"),
        t("days.wednesday"),
        t("days.thursday"),
        t("days.friday"),
    ];

    const dayName = days[selectedDayIndex];

    return (
        <>
            <div
                ref={placeholderRef}
                className="w-full shrink-0"
                style={{
                    height: isSticky ? headerHeight : 0,
                }}
            />
            <header
                ref={headerRef}
                className={cn(
                    "bg-background",
                    isSticky && "fixed top-0 right-0 left-0 z-50 shadow-md",
                )}
            >
                <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
                    <ChangeDayButton onClick={decrementDayIndex}>
                        <ChevronLeftSVG />
                    </ChangeDayButton>
                    <div className="flex w-fit flex-col items-center justify-center gap-1">
                        <div className="xs:text-xl text-foreground text-lg font-bold">
                            {dayName}
                        </div>
                        <Button
                            type="button"
                            className="group flex h-fit w-fit cursor-pointer flex-row items-center gap-1 bg-transparent p-0 hover:bg-transparent"
                            onClick={toggleWeekParity}
                        >
                            <RefreshCcw className="text-foreground size-3.25" />
                            <div className="text-foreground h-fit w-fit text-base">
                                {weekParity === "EVEN"
                                    ? t("common.even")
                                    : t("common.odd")}
                            </div>
                        </Button>
                    </div>
                    <ChangeDayButton onClick={incrementDayIndex}>
                        <ChevronLeftSVG className="rotate-180" />
                    </ChangeDayButton>
                </div>
            </header>
        </>
    );
}
