import ButtonArrowSVG from "@/components/svg/button-arrow-svg";
import LessonButton from "./LessonButton";

export default function LessonHeader() {
    return (
        <header className="flex items-center justify-between p-4 shadow">
            <LessonButton>
                {" "}
                <ButtonArrowSVG />
            </LessonButton>
            <div className="text-xl font-bold text-[#DADDFF]">Poniedziałek</div>
            <LessonButton>
                {" "}
                <ButtonArrowSVG className={"rotate-180"} />
            </LessonButton>
        </header>
    );
}
