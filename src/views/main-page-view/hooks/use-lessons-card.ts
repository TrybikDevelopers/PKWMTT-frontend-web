import { toZonedTime } from "date-fns-tz";
import { useNow } from "next-intl";
import { useMemo } from "react";

const useLessonsCard = (hour: string, weekDayIndex: number) => {
    const currentTime = useNow({
        updateInterval: 1000 * 15, // 15 seconds
    });

    const now = toZonedTime(currentTime, "Europe/Warsaw");

    const { sanitizedHour, isActive } = useMemo((): {
        sanitizedHour: string;
        isActive: boolean;
    } => {
        try {
            const sanitized = hour.replace(/\s+/g, "");

            // Validate format: should be HH:MM-HH:MM
            const timeRegex = /^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/;
            const match = sanitized.match(timeRegex);

            if (!match) {
                console.log(`Invalid hour format: ${hour}`);

                return {
                    sanitizedHour: sanitized,
                    isActive: false,
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
                    isActive: false,
                };
            }

            const currentWeekDay = now.getDay() === 0 ? 6 : now.getDay() - 1;

            if (currentWeekDay !== weekDayIndex) {
                return {
                    sanitizedHour: sanitized,
                    isActive: false,
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
                isActive: isActive,
            };
        } catch (error) {
            console.log(`Error parsing lesson time: ${hour}`, error);

            return {
                sanitizedHour: hour.replace(/\s+/g, ""),
                isActive: false,
            };
        }
    }, [hour, weekDayIndex, now]);

    return {
        sanitizedHour,
        isActive,
    };
};

export default useLessonsCard;
