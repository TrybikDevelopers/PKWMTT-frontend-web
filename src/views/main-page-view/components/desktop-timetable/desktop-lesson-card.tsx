import { cn } from "@/lib/utils";
import type { ClassEntry } from "@/types/data-access/timetable";
import { useTranslations } from "next-intl";
import useLessonCard from "../../hooks/use-lesson-card";

type Props = {
    lesson: ClassEntry | null;
    hour: string;
    weekDayIndex: number;
};

export default function DesktopLessonCard({
    lesson,
    hour,
    weekDayIndex,
}: Props) {
    const t = useTranslations("home.common");

    const { badge, isCurrentLessonActive } = useLessonCard(
        lesson?.type ?? null,
        hour,
        weekDayIndex,
    );

    if (!lesson) return null;

    return (
        <div
            className={cn(
                "bg-background-darker flex h-full w-full flex-col justify-between gap-2 rounded-lg p-2 transition-all duration-200",
                isCurrentLessonActive && "ring-accent bg-accent/10 ring-2",
            )}
        >
            <div className="flex items-start justify-between gap-2">
                <div
                    className={cn(
                        "flex-1 truncate text-xs font-medium",
                        isCurrentLessonActive
                            ? "text-accent-light"
                            : "text-white",
                    )}
                >
                    {lesson.name}
                </div>
                {badge && (
                    <span
                        className={cn(
                            "flex size-4 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white uppercase",
                            badge.className,
                        )}
                    >
                        {badge.letter}
                    </span>
                )}
            </div>
            <div
                className={cn(
                    "truncate text-xs",
                    isCurrentLessonActive
                        ? "text-accent-light/80"
                        : "text-[#AFAFAF]",
                )}
            >
                {t("classRoom")}: {lesson.classroom}
            </div>
        </div>
    );
}
