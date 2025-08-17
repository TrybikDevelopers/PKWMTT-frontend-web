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
        <div className="mb-6 grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] gap-4">
            <div className="flex items-center justify-center">
                <Button
                    type="button"
                    className="group flex h-fit w-fit cursor-pointer flex-row items-center gap-1 rounded-md bg-transparent p-2 transition-colors hover:bg-white/10"
                    onClick={toggleWeekParity}
                >
                    <RefreshCcw className="size-4" />
                    <div className="h-fit w-fit text-sm text-white">
                        {weekParity === "EVEN"
                            ? t("common.even")
                            : t("common.odd")}
                    </div>
                </Button>
            </div>
            {days.map((day, index) => (
                <div
                    key={`day-header-${index}`}
                    className="py-4 text-center text-xl font-bold text-[#DADDFF]"
                >
                    {day}
                </div>
            ))}
        </div>
    );
}
