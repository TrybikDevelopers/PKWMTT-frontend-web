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
        <div className="grid grid-cols-7 gap-2.5">
            {cells.map((cell, index) => (
                <CalendarDay key={`day-${index}`} day={cell} />
            ))}
        </div>
    );
}
