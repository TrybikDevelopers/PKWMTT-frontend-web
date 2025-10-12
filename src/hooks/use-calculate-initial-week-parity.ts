import { useNow } from "next-intl";
import useWeekParity from "./use-week-parity";

const useCalculateInitialWeekParity = () => {
    const now = useNow();
    const today = now.getDay();

    const { weekParity: realWeekParity } = useWeekParity();

    // when the day is 0 (sunday), the week parity is the opposite of the real week parity
    // 6 (saturday) falls back to normal week parity
    const calculatedInitialWeekParity =
        today === 0
            ? realWeekParity === "EVEN"
                ? "ODD"
                : "EVEN"
            : realWeekParity;

    return { calculatedInitialWeekParity };
};

export default useCalculateInitialWeekParity;
