import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ClassEntry } from "@/types/data-access/timetable";
import { useTranslations } from "next-intl";
import useLessonBadge from "../../hooks/use-lesson-badge";

export default function DesktopLessonCard({
    lesson,
    isActive,
}: {
    lesson: ClassEntry;
    isActive: boolean;
}) {
    const t = useTranslations("home.common");

    const { badge } = useLessonBadge(lesson.type);

    return (
        <div className="bg-background-darker relative flex h-full w-full flex-row justify-between gap-2 rounded-lg p-2">
            <div className="flex flex-col justify-between gap-2">
                <div
                    className={cn(
                        "text-foreground flex-1 truncate text-xs font-medium",
                    )}
                >
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
            <div className="flex h-full flex-col items-end justify-between">
                {badge && (
                    <Tooltip disableHoverableContent>
                        <TooltipTrigger>
                            <span
                                className={cn(
                                    "flex size-7 shrink-0 items-center justify-center rounded-full p-1.5 text-xs font-semibold text-white uppercase",
                                    badge.className,
                                )}
                            >
                                {badge.icon && <badge.icon size={22} />}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{badge.word}</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>
        </div>
    );
}
