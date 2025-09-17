import type { CalendarExam } from "@/types/data-access/calendar";
import { useWindowSize } from "usehooks-ts";
import useCalendarDay from "../hooks/use-calendar-day";
import CalendarDayDesktop from "./calendar-day-desktop";
import CalendarDayMobile from "./calendar-day-mobile";
import DayDetailsDialog from "./day-details-dialog";
import DayDetailsDrawer from "./day-details-drawer";

type Props = {
    day: {
        date: Date;
        inCurrentMonth: boolean;
        isToday: boolean;
    };
    items: CalendarExam[];
};

export default function CalendarDay({ day, items }: Props) {
    const { open, updateOpen, isToday, isMuted } = useCalendarDay(day);

    const { width } = useWindowSize({
        debounceDelay: 20,
        initializeWithValue: false,
    });

    return (
        <>
            <CalendarDayMobile
                day={day}
                items={items}
                isMuted={isMuted}
                updateOpen={updateOpen}
                isToday={isToday}
            />

            <CalendarDayDesktop
                day={day}
                items={items}
                isMuted={isMuted}
                updateOpen={updateOpen}
                isToday={isToday}
            />

            {width &&
                width < 768 && ( // Mobile
                    <DayDetailsDrawer
                        open={open}
                        setOpen={updateOpen}
                        date={day.date}
                        items={items}
                    />
                )}
            {width &&
                width >= 768 && ( // Desktop
                    <DayDetailsDialog
                        open={open}
                        setOpen={updateOpen}
                        date={day.date}
                        items={items}
                    />
                )}
        </>
    );
}
