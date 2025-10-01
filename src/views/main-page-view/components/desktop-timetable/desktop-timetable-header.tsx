import { Button } from "@/components/ui/button";
import { useStickyHeader } from "@/hooks/use-sticky-header";
import { cn } from "@/lib/utils";
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
    const { headerRef, placeholderRef, isSticky, headerHeight } =
        useStickyHeader();

    const days = [
        t("days.monday"),
        t("days.tuesday"),
        t("days.wednesday"),
        t("days.thursday"),
        t("days.friday"),
    ];

    return (
        <>
            <div
                ref={placeholderRef}
                className="w-full shrink-0"
                style={{
                    height: isSticky ? headerHeight : 0,
                }}
            />
            <div
                ref={headerRef}
                className={cn(
                    "bg-background grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] gap-4",
                    isSticky &&
                        "fixed top-0 right-0 left-0 z-50 mx-4 shadow-md",
                )}
            >
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
        </>
    );
}
