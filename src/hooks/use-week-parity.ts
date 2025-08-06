import { useMemo } from "react";

const useWeekParity = (): { weekParity: "EVEN" | "ODD" } => {
    const weekParity = useMemo(() => {
        const now = new Date();
        const year = now.getFullYear();

        const octFirst = new Date(year, 9, 1);
        const referenceDate =
            now < octFirst ? new Date(year - 1, 9, 1) : octFirst;

        const getWeekStart = (date: Date): Date => {
            const d = new Date(date);
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            return new Date(d.setDate(diff));
        };

        const referenceWeekStart = getWeekStart(referenceDate);
        const currentWeekStart = getWeekStart(now);

        const daysDiff = Math.floor(
            (currentWeekStart.getTime() - referenceWeekStart.getTime()) /
                (1000 * 60 * 60 * 24),
        );
        const weeksDiff = Math.floor(daysDiff / 7);

        const isEven = weeksDiff % 2 !== 0;
        const weekParity = isEven ? "EVEN" : "ODD";

        return weekParity;
    }, []);

    return { weekParity };
};

export default useWeekParity;
