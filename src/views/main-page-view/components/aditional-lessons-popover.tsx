import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ClassEntry } from "@/types/data-access/timetable";
import { useTranslations } from "next-intl";
import useLessonBadge from "../hooks/use-lesson-badge";

export default function AdditionalLessonsPopover({
    lessons,
    isActive,
    className,
    align = "center",
}: {
    lessons: ClassEntry[];
    isActive: boolean;
    className?: string;
    align?: "center" | "start" | "end";
}) {
    const t = useTranslations("home.common");

    return (
        <Popover>
            <PopoverTrigger
                className={cn(
                    "bg-accent text-accent-foreground hover:bg-accent/90 flex aspect-square size-5.5 shrink-0 cursor-pointer items-center justify-center rounded-full pr-0.5 text-[12px] leading-none font-medium transition-colors",
                    className,
                )}
            >
                +{lessons.length - 1}
            </PopoverTrigger>
            <PopoverContent
                className="w-80"
                align={align}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <div className="space-y-3">
                    <h4 className="text-sm font-medium">
                        {t("additionalLessons", {
                            count: (lessons.length - 1).toString(),
                        })}
                    </h4>
                    <div className="space-y-2">
                        {lessons.slice(1).map((lesson, index) => (
                            <AdditionalLessonsItem
                                key={`${lesson.name}-${index}`}
                                lesson={lesson}
                                isActive={isActive}
                            />
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

function AdditionalLessonsItem({
    lesson,
    isActive,
}: {
    lesson: ClassEntry;
    isActive: boolean;
}) {
    const t = useTranslations("home.common");
    const { badge } = useLessonBadge(lesson.type);

    return (
        <div className="bg-background-darker flex items-center justify-between gap-3 rounded-lg p-3">
            <div className="min-w-0 flex-1">
                <div className="text-foreground truncate text-sm font-medium">
                    {lesson.name}
                </div>
                <div
                    className={cn(
                        "truncate text-xs",
                        isActive ? "text-foreground" : "text-text-muted",
                    )}
                >
                    {t("classRoom")}: {lesson.classroom}
                </div>
            </div>
            {badge && (
                <Tooltip disableHoverableContent>
                    <TooltipTrigger>
                        <span
                            className={cn(
                                "flex size-6 shrink-0 items-center justify-center rounded-full p-1 text-xs font-semibold text-white uppercase",
                                badge.className,
                            )}
                        >
                            {badge.icon && <badge.icon size={16} />}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{badge.word}</p>
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    );
}
