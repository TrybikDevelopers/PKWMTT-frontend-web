import { useTranslations } from "next-intl";

export default function DesktopTimetableHeader() {
    const t = useTranslations("home.days");

    const days = [
        t("monday"),
        t("tuesday"),
        t("wednesday"),
        t("thursday"),
        t("friday"),
    ];

    return (
        <div className="mb-6 grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] gap-4">
            {/* Empty cell for time column */}
            <div></div>
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
