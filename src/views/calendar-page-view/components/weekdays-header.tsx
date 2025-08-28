type Props = {
    weekdayHeaders: string[];
};

export default function WeekdaysHeader({ weekdayHeaders }: Props) {
    return (
        <>
            {weekdayHeaders.map((day, index) => (
                <div
                    key={`weekday-${index}`}
                    className="rounded-md px-2 py-1 text-center text-lg font-medium text-[#DADDFF] md:py-4"
                >
                    {day}
                </div>
            ))}
        </>
    );
}
