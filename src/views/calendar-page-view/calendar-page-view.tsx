"use client";

import type { CalendarPageData } from "@/server/fetchers/calendar-page";
import { use } from "react";
import DaysGrid from "./components/days-grid";
import MonthSelect from "./components/month-select";
import WeekdaysHeader from "./components/weekdays-header";
import { useCalendar } from "./hooks/use-calendar";

type Props = {
    calendarDataPromise: Promise<CalendarPageData>;
};

export default function CalendarPageView({ calendarDataPromise }: Props) {
    const { calendarExams } = use(calendarDataPromise);

    const {
        month,
        updateMonth,
        incrementMonth,
        decrementMonth,
        monthNames,
        weekdayHeaders,
        cells,
    } = useCalendar();

    return (
        <div className="mx-auto w-full max-w-3xl space-y-4 px-4 md:max-w-6xl lg:max-w-7xl xl:max-w-[1920px] 2xl:px-8">
            {/* TODO: make cards smaller on desktop */}
            <MonthSelect
                month={month}
                monthNames={monthNames}
                updateMonth={updateMonth}
                incrementMonth={incrementMonth}
                decrementMonth={decrementMonth}
            />

            <div className="grid grid-cols-7 gap-2 md:gap-3 lg:gap-4 xl:gap-5">
                <WeekdaysHeader weekdayHeaders={weekdayHeaders} />
                <DaysGrid cells={cells} calendarExams={calendarExams ?? []} />
            </div>
        </div>
    );
}
