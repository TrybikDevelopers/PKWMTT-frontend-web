import ButtonArrowSVG from "@/components/svg/button-arrow-svg";
import ChangeDayButton from "./change-day-button";

export default function TimetableHeader() {
    return (
        <header className="flex items-center justify-between p-4">
            <ChangeDayButton>
                <ButtonArrowSVG />
            </ChangeDayButton>
            <div className="xs:text-xl text-lg font-bold text-[#DADDFF]">
                Poniedziałek
            </div>
            <ChangeDayButton>
                <ButtonArrowSVG className="rotate-180" />
            </ChangeDayButton>
        </header>
    );
}
