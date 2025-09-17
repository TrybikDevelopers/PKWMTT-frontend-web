type Props = {
    weekdayHeaders: string[];
};

export default function WeekdaysHeader({ weekdayHeaders }: Props) {
    return (
        <>
            {weekdayHeaders.map((day, index) => (
                <div
                    key={`weekday-${index}`}
                    className="rounded-md px-2 py-1 text-center text-lg font-medium text-[#DADDFF] md:py-4 lg:px-3 lg:py-5 lg:text-xl xl:px-4 xl:py-6 xl:text-2xl"
                >
                    {day}
                </div>
            ))}
        </>
    );
}
