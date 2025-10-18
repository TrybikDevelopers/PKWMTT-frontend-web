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
import type { CustomSubjectFormSchema } from "@/schema/forms/custom-subject-form-schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

type Props = {
    subGroups: string[];
};

export default function SubgroupField({ subGroups }: Props) {
    const form = useFormContext<CustomSubjectFormSchema>();
    const t = useTranslations("settings.customSubjects");

    return (
        <FormField
            control={form.control}
            name="subGroup"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{t("subGroupLabel")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger className="w-full cursor-pointer">
                                <SelectValue
                                    placeholder={t("subGroupPlaceholder")}
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {subGroups.map((subGroup) => (
                                <SelectItem key={subGroup} value={subGroup}>
                                    {subGroup}
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
