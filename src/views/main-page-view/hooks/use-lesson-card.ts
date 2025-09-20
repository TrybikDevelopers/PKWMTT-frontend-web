import type { ClassEntry } from "@/types/data-access/timetable";
import { toZonedTime } from "date-fns-tz";
import { useNow, useTranslations } from "next-intl";
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
