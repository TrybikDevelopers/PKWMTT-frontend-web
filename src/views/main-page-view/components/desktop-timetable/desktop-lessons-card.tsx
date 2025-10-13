import { cn } from "@/lib/utils";
import type { ClassEntry } from "@/types/data-access/timetable";
import useLessonsCard from "../../hooks/use-lessons-card";
import AdditionalLessonsPopover from "../aditional-lessons-popover";
import DesktopLessonCard from "./desktop-lesson-card";

type Props = {
    lessons: ClassEntry[];
    hour: string;
    weekDayIndex: number;
};

export default function DesktopLessonsCard({
    lessons,
    hour,
    weekDayIndex,
}: Props) {
    const { isActive } = useLessonsCard(hour, weekDayIndex);

    if (lessons.length === 0) return null;

    const firstLesson = lessons[0];

    return (
        <div
            className={cn(
                "relative flex h-full w-full flex-row gap-2 rounded-lg transition-all duration-200",
                isActive && "ring-accent bg-accent/10 ring-2",
            )}
        >
            <DesktopLessonCard lesson={firstLesson} isActive={isActive} />
            {lessons.length > 1 && (
                <AdditionalLessonsPopover
                    lessons={lessons}
                    isActive={isActive}
                    className="absolute -top-2.5 -right-2.5"
                />
            )}
        </div>
    );
}
