import { useCallback, useState } from "react";

const useCalendarDay = (day: {
    date: Date;
    inCurrentMonth: boolean;
    isToday: boolean;
}) => {
    const [open, setOpen] = useState(false);

    const isToday = day.isToday;
    const isMuted = !day.inCurrentMonth;

    const updateOpen = useCallback((open: boolean) => {
        setOpen(open);
    }, []);

    return {
        open,
        updateOpen,
        isToday,
        isMuted,
    };
};

export default useCalendarDay;
