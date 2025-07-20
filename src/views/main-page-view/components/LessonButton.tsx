import ButtonArrowSVG from "@/components/svg/button-arrow-svg";

interface LessonButtonProps {
    arrowClassName?: string;
    arrowRotationClass?: string; // Tailwind rotation class, e.g. "rotate-90"
}

export default function LessonButton({
    arrowClassName,
    arrowRotationClass = "",
}: LessonButtonProps) {
    return (
        <button className="bg-button flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-gray-800 shadow transition hover:bg-gray-200">
            <ButtonArrowSVG
                className={`h-4 w-4 text-gray-600 ${arrowClassName ?? ""} ${arrowRotationClass}`}
            />
        </button>
    );
}
