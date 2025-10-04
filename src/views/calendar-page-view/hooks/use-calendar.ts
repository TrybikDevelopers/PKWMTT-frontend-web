"use client";

import { toZonedTime } from "date-fns-tz";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";

type CalendarDay = {
    date: Date;
    inCurrentMonth: boolean;
    isToday: boolean;
};

function getMonthMatrix(
    year: number,
    monthIndexZeroBased: number,
): CalendarDay[] {
    const today = toZonedTime(new Date(), "Europe/Warsaw");
    const startOfMonth = toZonedTime(
        new Date(year, monthIndexZeroBased, 1),
        "Europe/Warsaw",
    );
    const endOfMonth = toZonedTime(
        new Date(year, monthIndexZeroBased + 1, 0),
        "Europe/Warsaw",
    );

    const startDay = startOfMonth.getDay();
    // JavaScript: 0 = Sunday ... 6 = Saturday
    // Always start week on Monday. Compute number of prev-month days to show.
    const startOffset = startDay === 0 ? 6 : startDay - 1;

    const daysInMonth = endOfMonth.getDate();

    const cells: CalendarDay[] = [];

    // Previous month's trailing days
    for (let i = startOffset; i > 0; i--) {
        const date = toZonedTime(
            new Date(year, monthIndexZeroBased, 1 - i),
            "Europe/Warsaw",
        );

        cells.push({
            date,
            inCurrentMonth: false,
            isToday:
                date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate(),
        });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
        const date = toZonedTime(
            new Date(year, monthIndexZeroBased, d),
            "Europe/Warsaw",
        );
        cells.push({
            date,
            inCurrentMonth: true,
            isToday:
                date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate(),
        });
    }

    // Next month's leading days to complete 6 rows (42 cells)
    while (cells.length % 7 !== 0) {
        const last = cells[cells.length - 1].date;
        const date = toZonedTime(
            new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
            "Europe/Warsaw",
        );

        cells.push({
            date,
            inCurrentMonth: false,
            isToday:
                date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate(),
        });
    }

    // Ensure we always render 6 weeks for consistent layout
    while (cells.length < 42) {
        const last = cells[cells.length - 1].date;
        const date = toZonedTime(
            new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
            "Europe/Warsaw",
        );
        cells.push({
            date,
            inCurrentMonth: false,
            isToday:
                date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate(),
        });
    }

    return cells;
}

export function useCalendar() {
    const t = useTranslations("calendar");
    const [month, setMonth] = useState<number>(new Date().getMonth()); // 0-11

    const updateMonth = useCallback((month: number) => {
        setMonth(month);
    }, []);

    const incrementMonth = useCallback(() => {
        updateMonth(month === 11 ? 0 : month + 1);
    }, [updateMonth, month]);

    const decrementMonth = useCallback(() => {
        updateMonth(month === 0 ? 11 : month - 1);
    }, [updateMonth, month]);

    const monthNames = useMemo(
        () => [
            t("months.january"),
            t("months.february"),
            t("months.march"),
            t("months.april"),
            t("months.may"),
            t("months.june"),
            t("months.july"),
            t("months.august"),
            t("months.september"),
            t("months.october"),
            t("months.november"),
            t("months.december"),
        ],
        [t],
    );

    const weekdayHeaders = useMemo(
        () => [
            t("weekdays.monday"),
            t("weekdays.tuesday"),
            t("weekdays.wednesday"),
            t("weekdays.thursday"),
            t("weekdays.friday"),
            t("weekdays.saturday"),
            t("weekdays.sunday"),
        ],
        [t],
    ); // Always Monday-first week

    const cells = useMemo(() => {
        const today = toZonedTime(new Date(), "Europe/Warsaw");
        const baseYear = today.getFullYear();

        return getMonthMatrix(baseYear, month);
    }, [month]);

    return {
        month,
        updateMonth,
        incrementMonth,
        decrementMonth,
        monthNames,
        weekdayHeaders,
        cells,
    };
}
