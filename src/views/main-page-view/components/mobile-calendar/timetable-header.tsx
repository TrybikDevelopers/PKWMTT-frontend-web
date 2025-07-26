import ChevronLeftSVG from "@/components/svg/chevron-left-svg";
import ChangeDayButton from "./change-day-button";

export default function TimetableHeader() {
    return (
        <header className="flex items-center justify-between p-4">
            <ChangeDayButton>
                <ChevronLeftSVG />
            </ChangeDayButton>
            <div className="xs:text-xl text-lg font-bold text-[#DADDFF]">
                Poniedziałek
            </div>
            <ChangeDayButton>
                <ChevronLeftSVG className="rotate-180" />
            </ChangeDayButton>
        </header>
    );
}
