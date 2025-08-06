import { cn } from "@/lib/utils";
import type { ClassEntry } from "@/types/data-access/timetable";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type Props = {
    lesson: ClassEntry | null;
};

type Badge = {
    letter: string;
    className: string;
};

const useDesktopLessonCard = (type: ClassEntry["type"] | null) => {
    const t = useTranslations("home.lessonType");

    const badge = useMemo((): Badge | null => {
        if (!type) {
            return null;
        }

        switch (type) {
            case "SEMINAR":
                return {
                    letter: t("short.seminar"),
                    className: "bg-[#CF2EEF]",
                };
            case "LECTURE":
                return {
                    letter: t("short.lecture"),
                    className: "bg-[#E35D23]",
                };
            case "LABORATORY":
                return {
                    letter: t("short.laboratory"),
                    className: "bg-[#3BBFE4]",
                };
            case "COMPUTER_LABORATORY":
                return {
                    letter: t("short.laboratory"),
                    className: "bg-[#3BBFE4]",
                };
            case "EXERCISES":
                return {
                    letter: t("short.exercises"),
                    className: "bg-[#83D32E]",
                };
            case "PROJECT":
                return {
                    letter: t("short.project"),
                    className: "bg-[#D32E2E]",
                };
            default:
                return { letter: t("short.other"), className: "bg-gray-600" };
        }
    }, [type, t]);

    return badge;
};

export default function DesktopLessonCard({ lesson }: Props) {
    const t = useTranslations("home.mobileTimetable");
    const badge = useDesktopLessonCard(lesson?.type ?? null);

    if (!lesson) {
        return null;
    }

    return (
        <div className="bg-background-darker flex h-full w-full flex-col justify-between gap-2 rounded-lg p-2">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 truncate text-xs font-medium text-white">
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
            <div className="truncate text-xs text-[#AFAFAF]">
                {t("classRoom")}: {lesson.classroom}
            </div>
        </div>
    );
}
