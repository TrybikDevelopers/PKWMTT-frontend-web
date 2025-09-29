import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { EctsEntrySchema } from "@/schema/forms/ects-form-schema";
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";

type Props = {
    open: boolean;
    selectedCount: number;
    form: UseFormReturn<EctsEntrySchema>;
    subjects: string[];
    onSubmit: (values: EctsEntrySchema) => void;
    onOpenChange: (open: boolean) => void;
    onDeleteSelected: () => void;
};

export default function AddNewEntryDialog({
    open,
    selectedCount,
    form,
    subjects,
    onSubmit,
    onOpenChange,
    onDeleteSelected,
}: Props) {
    const t = useTranslations("ectsCalculator.form");

    const [comboboxOpen, setComboboxOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {selectedCount === 0 ? (
                <DialogTrigger className="bg-accent hover:bg-accent/80 absolute bottom-12 left-1/2 flex h-fit w-fit -translate-x-1/2 cursor-pointer items-center justify-center rounded-full p-3">
                    <Plus className="size-8 stroke-3 text-white sm:size-12 lg:size-15" />
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
                        {subjects.length > 0 ? (
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex w-full flex-col">
                                        <FormLabel className="">
                                            {t("nameLabel")}
                                        </FormLabel>
                                        <Popover
                                            open={comboboxOpen}
                                            onOpenChange={setComboboxOpen}
                                            modal={true}
                                        >
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "ml-auto w-full cursor-pointer justify-between font-normal duration-150",
                                                            !field.value &&
                                                                "text-muted-foreground",
                                                        )}
                                                    >
                                                        {field.value
                                                            ? subjects.find(
                                                                  (subject) =>
                                                                      subject ===
                                                                      field.value,
                                                              )
                                                            : t("select")}
                                                        <ChevronsUpDown className="opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="max-h-[var(--radix-popover-content-available-height)] w-[var(--radix-popover-trigger-width)] p-0">
                                                <Command className="w-full max-w-full">
                                                    <CommandInput
                                                        placeholder={t(
                                                            "search",
                                                        )}
                                                        className="h-9 w-full"
                                                    />
                                                    <CommandList className="w-full">
                                                        <CommandEmpty>
                                                            {t(
                                                                "noSubjectFound",
                                                            )}
                                                        </CommandEmpty>
                                                        <CommandGroup className="w-full">
                                                            {subjects.map(
                                                                (subject) => (
                                                                    <CommandItem
                                                                        value={
                                                                            subject
                                                                        }
                                                                        key={
                                                                            subject
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "name",
                                                                                subject,
                                                                            );

                                                                            setComboboxOpen(
                                                                                false,
                                                                            );
                                                                        }}
                                                                        className="h-8"
                                                                    >
                                                                        {
                                                                            subject
                                                                        }
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                subject ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0",
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ),
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("nameLabel")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t(
                                                    "namePlaceholder",
                                                )}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

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
