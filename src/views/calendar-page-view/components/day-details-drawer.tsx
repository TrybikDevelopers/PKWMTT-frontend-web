import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import type { CalendarExam } from "@/types/data-access/calendar";
import { useFormatter, useTranslations } from "next-intl";
import DetailsItem from "./details-item";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    date: Date;
    items: CalendarExam[];
};

export default function DayDetailsDrawer({
    open,
    setOpen,
    date,
    items,
}: Props) {
    const t = useTranslations("calendar.academicActivities");
    const format = useFormatter();

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="pb-2">
                    <DrawerTitle className="text-accent xs:text-4xl text-3xl">
                        {format.dateTime(date, {
                            day: "numeric",
                            month: "numeric",
                        })}
                    </DrawerTitle>
                    <DrawerDescription className="sr-only">
                        {date.toLocaleDateString()}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex max-h-[500px] min-h-[200px] flex-col gap-4 overflow-y-auto p-6">
                    {items.length > 0 &&
                        items.map((info, index) => (
                            <DetailsItem
                                key={`${date.toString()}-${index}-mobile`}
                                info={info}
                                index={index}
                            />
                        ))}
                    {items.length === 0 && (
                        <p className="text-muted-foreground mt-6 text-center">
                            {t("noItems")}
                        </p>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
