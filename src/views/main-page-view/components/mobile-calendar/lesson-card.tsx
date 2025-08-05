import { cn } from "@/lib/utils";
import type { ClassEntry } from "@/types/data-access/timetable";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type Props = {
    hour: string;
    lesson: ClassEntry | null;
};

type Badge = {
    letter: string;
    className: string;
};

const useLessonCard = (type: ClassEntry["type"] | null, hour: string) => {
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
                    // letter: t("short.computerLaboratory"),
                    // className: "bg-yellow-600",
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
            // return null;
        }
    }, [type, t]);

    const sanitizedHour = hour.replace(/\s+/g, "");

    const lessonStart = sanitizedHour.split("-")[0];
    const lessonEnd = sanitizedHour.split("-")[1];

    const now = new Date();

    const lessonStartDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(lessonStart.split(":")[0], 10),
        parseInt(lessonStart.split(":")[1], 10),
    );
    const lessonEndDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(lessonEnd.split(":")[0], 10),
        parseInt(lessonEnd.split(":")[1], 10),
    );

    const isCurrentLessonActive =
        now >= lessonStartDate && now <= lessonEndDate;

    return {
        badge,
        sanitizedHour,
        isCurrentLessonActive,
    };
};

export default function LessonCard({ lesson, hour }: Props) {
    const t = useTranslations("home.mobileTimetable");

    const { badge, sanitizedHour, isCurrentLessonActive } = useLessonCard(
        lesson?.type ?? null,
        hour,
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
