import ChevronLeftSVG from "@/components/svg/chevron-left-svg";
import { useTranslations } from "next-intl";
import ChangeDayButton from "./change-day-button";

type Props = {
    incrementDayIndex: () => void;
    decrementDayIndex: () => void;
    selectedDayIndex: number;
};

export default function TimetableHeader({
    incrementDayIndex,
    decrementDayIndex,
    selectedDayIndex,
}: Props) {
    const t = useTranslations("home.days");

    const days = [
        t("monday"),
        t("tuesday"),
        t("wednesday"),
        t("thursday"),
        t("friday"),
    ];

    const dayName = days[selectedDayIndex];

    return (
        <header className="flex items-center justify-between p-4">
            <ChangeDayButton onClick={decrementDayIndex}>
                <ChevronLeftSVG />
            </ChangeDayButton>
            <div className="xs:text-xl text-lg font-bold text-[#DADDFF]">
                {dayName}
            </div>
            <ChangeDayButton onClick={incrementDayIndex}>
                <ChevronLeftSVG className="rotate-180" />
            </ChangeDayButton>
        </header>
    );
}
