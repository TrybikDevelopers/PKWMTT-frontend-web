"use client";

import DaysGrid from "./components/days-grid";
import MonthSelect from "./components/month-select";
import WeekdaysHeader from "./components/weekdays-header";
import { useCalendar } from "./hooks/use-calendar";

export default function CalendarPageView() {
    const { month, setMonth, monthNames, weekdayHeaders, cells } =
        useCalendar();

    return (
        <div className="mx-auto w-full max-w-3xl space-y-4 px-4 md:max-w-6xl">
            <MonthSelect
                month={month}
                monthNames={monthNames}
                onMonthChange={setMonth}
            />

            <div className="grid grid-cols-7 gap-2 md:gap-3">
                <WeekdaysHeader weekdayHeaders={weekdayHeaders} />
                <DaysGrid cells={cells} />
            </div>
        </div>
    );
}
