import { cn } from "@/lib/utils";
import type { CalendarExam } from "@/types/data-access/calendar";
import { useFormatter } from "next-intl";

type Props = {
    info: CalendarExam;
    index: number;
};

export default function DetailsItem({ info, index }: Props) {
    const format = useFormatter();

    return (
        <div
            className={cn(
                "xxs:text-base flex w-full flex-col gap-2 rounded-md border-2 p-3 text-sm",
                index % 4 === 0 && "border-activity-1/70",
                index % 4 === 1 && "border-activity-2/70",
                index % 4 === 2 && "border-activity-3/70",
                index % 4 === 3 && "border-activity-4/70",
            )}
        >
            <div className="flex items-center gap-2">
                <span>
                    {format.dateTime(new Date(info.date), {
                        minute: "numeric",
                        hour: "numeric",
                    })}
                </span>
                <span className="rounded bg-black/10 px-2 py-0.5 text-xs font-semibold text-black dark:bg-white/20 dark:text-white">
                    {info.examType}
                </span>
            </div>
            <span className="font-bold text-black dark:text-white">
                {info.title}
            </span>
        </div>
    );
}
