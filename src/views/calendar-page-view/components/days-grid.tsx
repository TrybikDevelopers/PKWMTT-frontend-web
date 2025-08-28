import CalendarDay from "./calendar-day";

type Props = {
    cells: {
        date: Date;
        inCurrentMonth: boolean;
        isToday: boolean;
    }[];
};

export default function DaysGrid({ cells }: Props) {
    return (
        <>
            {cells.map((cell, index) => (
                <CalendarDay key={`day-${index}`} day={cell} />
            ))}
        </>
    );
}
