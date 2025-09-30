import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { ClassEntry } from "@/types/data-access/timetable";
import { useTranslations } from "next-intl";
import useLessonCard from "../../hooks/use-lesson-card";

type Props = {
    hour: string;
    lesson: ClassEntry | null;
    weekDayIndex: number;
};

export default function LessonCard({ lesson, hour, weekDayIndex }: Props) {
    const t = useTranslations("home.common");

    const { badge, sanitizedHour, isCurrentLessonActive } = useLessonCard(
        lesson?.type ?? null,
        hour,
        weekDayIndex,
    );

    return (
        <div className="bg-background flex min-h-25 shrink-0 flex-row overflow-hidden py-2.5">
            <div
                className={cn(
                    "bg-indicator-neutral flex h-full w-1.5 shrink-0",
                    isCurrentLessonActive && "bg-accent",
                )}
            />
            <div className="flex w-full flex-col justify-between gap-5 p-1.25 px-2">
                <div className="flex items-center">
                    <span className="xs:text-base text-foreground w-fit text-sm font-normal text-nowrap">
                        {sanitizedHour}
                    </span>
                    {lesson && (
                        <Popover>
                            <div className="flex w-full justify-end">
                                <PopoverTrigger>
                                    <span className="xs:text-base ml-auto flex items-center gap-1 rounded-full text-sm">
                                        {badge && (
                                            <span
                                                className={cn(
                                                    "flex size-6 shrink-0 items-center justify-center rounded-full bg-transparent p-1.5 text-xs font-semibold text-white uppercase",
                                                    badge.className,
                                                )}
                                            >
                                                {badge.icon && (
                                                    <badge.icon size={16} />
                                                )}
                                            </span>
                                        )}
                                        <span className="xs:text-base text-foreground text-sm">
                                            {t("classRoom")}: {lesson.classroom}
                                        </span>
                                    </span>
                                </PopoverTrigger>
                            </div>
                            {badge && (
                                <PopoverContent
                                    side="top"
                                    className="bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 after:border-t-primary relative z-50 w-fit rounded-md px-3 py-1.5 text-sm text-balance after:absolute after:-bottom-1.5 after:left-1/2 after:block after:h-0 after:w-0 after:-translate-x-1/2 after:border-t-6 after:border-r-6 after:border-l-6 after:border-r-transparent after:border-l-transparent after:content-['']"
                                >
                                    <p>{badge.word}</p>
                                </PopoverContent>
                            )}
                        </Popover>
                    )}
                </div>
                {lesson && (
                    <div className="xs:text-base text-foreground text-sm font-normal">
                        {lesson.name}
                    </div>
                )}
            </div>
        </div>
    );
}
