import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    weekParity: "EVEN" | "ODD";
    toggleWeekParity: () => void;
};

export default function DesktopTimetableHeader({
    weekParity,
    toggleWeekParity,
}: Props) {
    const t = useTranslations("home");

    const days = [
        t("days.monday"),
        t("days.tuesday"),
        t("days.wednesday"),
        t("days.thursday"),
        t("days.friday"),
    ];

    return (
        <div className="bg-background sticky top-0 z-10 mb-6 grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] gap-4">
            <div className="flex items-center justify-center">
                <Button
                    type="button"
                    className="group hover:bg-foreground/10 flex h-fit w-fit cursor-pointer flex-row items-center gap-1 rounded-md bg-transparent p-2 transition-colors"
                    onClick={toggleWeekParity}
                >
                    <RefreshCcw className="text-foreground size-4" />
                    <div className="text-foreground h-fit w-fit text-sm">
                        {weekParity === "EVEN"
                            ? t("common.even")
                            : t("common.odd")}
                    </div>
                </Button>
            </div>
            {days.map((day, index) => (
                <div
                    key={`day-header-${index}`}
                    className="text-foreground py-4 text-center text-xl font-bold"
                >
                    {day}
                </div>
            ))}
        </div>
    );
}
