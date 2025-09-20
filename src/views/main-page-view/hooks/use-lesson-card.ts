import type { ClassEntry } from "@/types/data-access/timetable";
import { toZonedTime } from "date-fns-tz";
import { useNow, useTranslations } from "next-intl";
import { useMemo } from "react";

type Badge = {
    word: string;
    letter: string;
    className: string;
};

const useLessonCard = (
    type: ClassEntry["type"] | null,
    hour: string,
    weekDayIndex: number,
) => {
    const t = useTranslations("home.lessonType");

    const currentTime = useNow({
        updateInterval: 1000 * 15, // 15 seconds
    });
    const now = toZonedTime(currentTime, "Europe/Warsaw");

    const badge = useMemo((): Badge | null => {
        if (!type) {
            return null;
        }

        switch (type) {
            case "SEMINAR":
                return {
                    word: t("seminar"),
                    letter: t("short.seminar"),
                    className: "bg-lesson-seminar",
                };
            case "LECTURE":
                return {
                    word: t("lecture"),
                    letter: t("short.lecture"),
                    className: "bg-lesson-lecture",
                };
            case "LABORATORY":
                return {
                    word: t("laboratory"),
                    letter: t("short.laboratory"),
                    className: "bg-lesson-laboratory",
                };
            case "COMPUTER_LABORATORY":
                return {
                    // letter: t("short.computerLaboratory"),
                    // className: "bg-yellow-600",
                    word: t("laboratory"),
                    letter: t("short.laboratory"),
                    className: "bg-lesson-laboratory",
                };
            case "EXERCISES":
                return {
                    word: t("exercises"),
                    letter: t("short.exercises"),
                    className: "bg-lesson-exercises",
                };
            case "PROJECT":
                return {
                    word: t("project"),
                    letter: t("short.project"),
                    className: "bg-lesson-project",
                };
            default:
                return {
                    word: t("other"),
                    letter: t("short.other"),
                    className: "bg-gray-600",
                };
            // return null;
        }
    }, [type, t]);

    const { sanitizedHour, isCurrentLessonActive } = useMemo(() => {
        try {
            const sanitized = hour.replace(/\s+/g, "");

            // Validate format: should be HH:MM-HH:MM
            const timeRegex = /^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/;
            const match = sanitized.match(timeRegex);

            if (!match) {
                console.log(`Invalid hour format: ${hour}`);

                return {
                    sanitizedHour: sanitized,
                    isCurrentLessonActive: false,
                };
            }

            const [, startHour, startMin, endHour, endMin] = match;

            // Validate time ranges
            const startH = parseInt(startHour, 10);
            const startM = parseInt(startMin, 10);
            const endH = parseInt(endHour, 10);
            const endM = parseInt(endMin, 10);

            if (startH > 23 || startM > 59 || endH > 23 || endM > 59) {
                console.log(`Invalid time values in: ${hour}`);

                return {
                    sanitizedHour: sanitized,
                    isCurrentLessonActive: false,
                };
            }

            const currentWeekDay = now.getDay() === 0 ? 6 : now.getDay() - 1;

            if (currentWeekDay !== weekDayIndex) {
                return {
                    sanitizedHour: sanitized,
                    isCurrentLessonActive: false,
                };
            }

            // Create lesson start and end times in Europe/Warsaw timezone
            // Since now is already in Warsaw timezone, we can work with the same date
            const lessonStartDate = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                startH,
                startM,
            );

            const lessonEndDate = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                endH,
                endM,
            );

            // Handle midnight-spanning lessons
            if (endH < startH) {
                lessonEndDate.setDate(lessonEndDate.getDate() + 1);
            }

            // All dates are now in Europe/Warsaw timezone context
            const isActive = now >= lessonStartDate && now <= lessonEndDate;

            return {
                sanitizedHour: sanitized,
                isCurrentLessonActive: isActive,
            };
        } catch (error) {
            console.log(`Error parsing lesson time: ${hour}`, error);

            return {
                sanitizedHour: hour.replace(/\s+/g, ""),
                isCurrentLessonActive: false,
            };
        }
    }, [hour, weekDayIndex, now]);

    return {
        badge,
        sanitizedHour,
        isCurrentLessonActive,
    };
};

export default useLessonCard;
