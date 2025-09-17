import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { CalendarExam } from "@/types/data-access/calendar";
import { useFormatter, useTranslations } from "next-intl";
import DetailsItem from "./details-item";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    date: Date;
    items: CalendarExam[];
};

export default function DayDetailsDialog({
    open,
    setOpen,
    date,
    items,
}: Props) {
    const format = useFormatter();
    const t = useTranslations("calendar.academicActivities");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[475px]">
                <DialogHeader>
                    <DialogTitle className="text-accent text-3xl">
                        {format.dateTime(date, {
                            day: "numeric",
                            month: "numeric",
                        })}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {format.dateTime(date, {
                            day: "numeric",
                            month: "numeric",
                        })}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-2 flex flex-col gap-3">
                    {items.length > 0 &&
                        items.map((info, index) => (
                            <DetailsItem
                                key={`${date.toString()}-${index}-desktop`}
                                info={info}
                                index={index}
                            />
                        ))}
                    {items.length === 0 && (
                        <p className="text-muted-foreground my-2 px-6 text-center">
                            {t("noItems")}
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
