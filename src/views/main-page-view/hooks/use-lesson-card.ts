import type { ClassEntry } from "@/types/data-access/timetable";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type Badge = {
    letter: string;
    className: string;
};

const useLessonCard = (
    type: ClassEntry["type"] | null,
    hour: string,
    weekDayIndex: number,
) => {
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
    const currentWeekDay = now.getDay() === 0 ? 6 : now.getDay() - 1;

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
        currentWeekDay === weekDayIndex &&
        now >= lessonStartDate &&
        now <= lessonEndDate;

    return {
        badge,
        sanitizedHour,
        isCurrentLessonActive,
    };
};

export default useLessonCard;
