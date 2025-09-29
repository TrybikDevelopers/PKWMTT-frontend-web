import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { EctsEntrySchema } from "@/schema/forms/ects-form-schema";
import { getEctsFormSchema } from "@/schema/forms/ects-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

type Props = {
    open: boolean;
    entry: EctsEntrySchema;
    index: number;
    editEntry: (value: EctsEntrySchema, index: number) => void;
    onOpenChange: (open: boolean) => void;
};

export default function EditEntryDialog({
    open,
    entry,
    index,
    editEntry,
    onOpenChange,
}: Props) {
    const t = useTranslations("ectsCalculator.form");

    const form = useForm<EctsEntrySchema>({
        resolver: zodResolver(getEctsFormSchema(t).ectsEntrySchema),
        defaultValues: {
            name: entry.name,
            ects: entry.ects,
            grade: entry.grade,
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("editDialogTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("editDialogDescription")}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) => {
                            editEntry(data, index);
                        })}
                        className="grid gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("nameLabel")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t("namePlaceholder")}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="ects"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("ectsLabel")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t("ectsPlaceholder")}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="grade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("gradeLabel")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t("gradePlaceholder")}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="cursor-pointer"
                                >
                                    {t("cancelButton")}
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                variant="default"
                                className="cursor-pointer"
                            >
                                {t("updateButton")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
