import type { ClassEntry } from "@/types/data-access/timetable";
import {
    BookOpen,
    FlaskConical,
    Hammer,
    LucideIcon,
    Monitor,
    Projector,
    Puzzle,
    Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type Badge = {
    word: string;
    icon: LucideIcon;
    className: string;
};

const useLessonBadge = (type: ClassEntry["type"]) => {
    const t = useTranslations("home.lessonType");

    const badge = useMemo((): Badge | null => {
        if (!type) {
            return null;
        }

        switch (type) {
            case "SEMINAR":
                return {
                    word: t("seminar"),
                    icon: Users,
                    className: "bg-lesson-seminar",
                };
            case "LECTURE":
                return {
                    word: t("lecture"),
                    icon: Projector,
                    className: "bg-lesson-lecture",
                };
            case "LABORATORY":
                return {
                    word: t("laboratory"),
                    icon: FlaskConical,
                    className: "bg-lesson-laboratory",
                };
            case "COMPUTER_LABORATORY":
                return {
                    word: t("computerLaboratory"),
                    icon: Monitor,
                    className: "bg-lesson-computerLaboratory",
                };
            case "EXERCISES":
                return {
                    word: t("exercises"),
                    icon: BookOpen,
                    className: "bg-lesson-exercises",
                };
            case "PROJECT":
                return {
                    word: t("project"),
                    icon: Hammer,
                    className: "bg-lesson-project",
                };
            default:
                return {
                    word: t("other"),
                    icon: Puzzle,
                    className: "bg-gray-600",
                };
        }
    }, [type, t]);

    return {
        badge,
    };
};

export default useLessonBadge;
