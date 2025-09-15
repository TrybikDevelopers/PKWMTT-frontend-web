import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

type Props = {
    index: number;
    label: string;
    subGroups: string[];
};

export default function SubgroupSelect({ index, label, subGroups }: Props) {
    const t = useTranslations("settings.studentGroups");

    const form = useFormContext<TimetableSettingsSchema>();

    return (
        <FormField
            control={form.control}
            name={`groups.${index}`}
            render={({ field }) => (
                <FormItem className="w-full gap-1">
                    <FormLabel className="sr-only">{label}</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                    >
                        <FormControl>
                            <SelectTrigger className="ml-auto h-8! w-full max-w-32 cursor-pointer">
                                <SelectValue placeholder={t("select")} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {subGroups.map((group) => (
                                <SelectItem key={group} value={group}>
                                    {group}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
