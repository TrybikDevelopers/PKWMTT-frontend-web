const useCurrentDayIndex = () => {
    const now = new Date();
    const today = now.getDay();

    // For Saturday (6) return Friday (4)
    // For Sunday (0) return Monday (0)
    // For weekdays (1-5) return the current day's index (0-4)
    const currentDayIndex =
        today === 6
            ? 4 // Saturday -> Friday
            : today === 0
              ? 0 // Sunday -> Monday
              : today - 1; // Weekday -> same day

    return currentDayIndex;
};

export default useCurrentDayIndex;
