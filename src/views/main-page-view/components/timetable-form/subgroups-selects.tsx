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
import type { TimetableFormSchema } from "@/schema/forms/timetable-form-schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

type Props = {
    subGroups: {
        firstLetter: string;
        subGroups: string[];
    }[];
};

export default function SubGroupsSelects({ subGroups }: Props) {
    const form = useFormContext<TimetableFormSchema>();
    const t = useTranslations("home.timetableForm");

    if (subGroups && subGroups.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            {subGroups.map(({ firstLetter, subGroups }, index) => (
                <FormField
                    key={index}
                    control={form.control}
                    name={`groups.${index}`}
                    render={({ field }) => (
                        <FormItem className="w-full gap-1">
                            <FormLabel className="mb-0.5">
                                {t("group", {
                                    group: firstLetter,
                                })}
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="h-12! w-full cursor-pointer">
                                        <SelectValue
                                            placeholder={t("selectGroup")}
                                        />
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
            ))}
        </div>
    );
}
