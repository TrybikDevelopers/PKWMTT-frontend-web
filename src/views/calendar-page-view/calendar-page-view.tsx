"use client";

import DaysGrid from "./components/days-grid";
import MonthSelect from "./components/month-select";
import WeekdaysHeader from "./components/weekdays-header";
import { useCalendar } from "./hooks/use-calendar";

export default function CalendarPageView() {
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
            <MonthSelect
                month={month}
                monthNames={monthNames}
                updateMonth={updateMonth}
                incrementMonth={incrementMonth}
                decrementMonth={decrementMonth}
            />

            <div className="grid grid-cols-7 gap-2 md:gap-3 lg:gap-4 xl:gap-5">
                <WeekdaysHeader weekdayHeaders={weekdayHeaders} />
                <DaysGrid cells={cells} />
            </div>
        </div>
    );
}
