import { cn } from "@/lib/utils";
import type { ClassEntry } from "@/types/data-access/timetable";
import { useTranslations } from "next-intl";
import useLessonCard from "../../hooks/use-lesson-card";

type Props = {
    hour: string;
    lesson: ClassEntry | null;
    weekDayIndex: number;
};

export default function LessonCard({ lesson, hour, weekDayIndex }: Props) {
    const t = useTranslations("home.mobileTimetable");

    const { badge, sanitizedHour, isCurrentLessonActive } = useLessonCard(
        lesson?.type ?? null,
        hour,
        weekDayIndex,
    );

    return (
        <div className="bg-background flex min-h-25 shrink-0 flex-row overflow-hidden py-2.5">
            <div
                className={cn(
                    "flex h-full w-1.5 shrink-0 bg-[#D2D4D3]",
                    isCurrentLessonActive && "bg-accent",
                )}
            ></div>
            <div className="flex w-full flex-col justify-between gap-5 p-1.25 px-2">
                <div className="flex items-center">
                    <span className="xs:text-base w-fit text-sm font-normal text-white">
                        {sanitizedHour}
                    </span>
                    {lesson && (
                        <span className="xs:text-base ml-auto flex items-center gap-1 rounded-full text-sm">
                            {badge && (
                                <span
                                    className={cn(
                                        "flex size-4.5 shrink-0 items-center justify-center rounded-full bg-transparent p-0.5 text-xs font-semibold text-white uppercase",
                                        badge.className,
                                    )}
                                >
                                    {badge.letter}
                                </span>
                            )}
                            <span className="xs:text-base text-sm text-white lowercase">
                                {t("classRoom")}: {lesson.classroom}
                            </span>
                        </span>
                    )}
                </div>
                {lesson && (
                    <div className="xs:text-base text-sm font-normal text-white">
                        {lesson.name}
                    </div>
                )}
            </div>
        </div>
    );
}
