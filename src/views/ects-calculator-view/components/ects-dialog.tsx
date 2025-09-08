import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

type Props = {
    open: boolean;
    selectedCount: number;
    form: UseFormReturn<EctsEntrySchema>;
    onSubmit: (values: EctsEntrySchema) => void;
    onOpenChange: (open: boolean) => void;
    onDeleteSelected: () => void;
};

export default function EctsDialog({
    open,
    selectedCount,
    form,
    onSubmit,
    onOpenChange,
    onDeleteSelected,
}: Props) {
    const t = useTranslations("ectsCalculator.form");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {selectedCount === 0 ? (
                <DialogTrigger className="bg-accent hover:bg-accent/80 absolute bottom-12 left-1/2 flex h-fit w-fit -translate-x-1/2 cursor-pointer items-center justify-center rounded-full p-3">
                    <Plus size={60} strokeWidth={3} />
                </DialogTrigger>
            ) : (
                <Button
                    type="button"
                    variant="destructive"
                    className="absolute bottom-12 left-1/2 flex h-fit w-fit -translate-x-1/2 cursor-pointer items-center justify-center rounded-full p-3"
                    onClick={onDeleteSelected}
                >
                    <Trash2 className="mr-1" /> {t("deleteSelectedButton")}
                </Button>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("dialogTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("dialogDescription")}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
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
                                {t("confirmButton")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
