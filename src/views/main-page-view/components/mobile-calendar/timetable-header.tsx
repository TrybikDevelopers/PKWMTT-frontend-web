import ChevronLeftSVG from "@/components/svg/chevron-left-svg";
import { Button } from "@/components/ui/button";
import useWeekParity from "@/hooks/use-week-parity";
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

    const days = [
        t("days.monday"),
        t("days.tuesday"),
        t("days.wednesday"),
        t("days.thursday"),
        t("days.friday"),
    ];

    const dayName = days[selectedDayIndex];

    return (
        <header className="flex items-center justify-between p-4">
            <ChangeDayButton onClick={decrementDayIndex}>
                <ChevronLeftSVG />
            </ChangeDayButton>
            <div className="flex w-fit flex-col items-center justify-center gap-0.5">
                <div className="xs:text-xl text-lg font-bold text-[#DADDFF]">
                    {dayName}
                </div>
                <Button
                    type="button"
                    className="group flex h-fit w-fit cursor-pointer flex-row items-center gap-1 bg-transparent p-0 hover:bg-transparent"
                    onClick={toggleWeekParity}
                >
                    <RefreshCcw className="size-3.25" />
                    <div className="h-fit w-fit text-xs">
                        {weekParity === "EVEN"
                            ? t("mobileTimetable.evenWeek")
                            : t("mobileTimetable.oddWeek")}
                    </div>
                </Button>
            </div>
            <ChangeDayButton onClick={incrementDayIndex}>
                <ChevronLeftSVG className="rotate-180" />
            </ChangeDayButton>
        </header>
    );
}
