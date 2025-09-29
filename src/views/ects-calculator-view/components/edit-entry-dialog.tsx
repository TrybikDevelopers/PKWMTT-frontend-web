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
import {
    getEctsFormSchema,
    type EctsEntrySchema,
} from "@/schema/forms/ects-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
    open: boolean;
    entry: EctsEntrySchema;
    index: number;
    subjects: string[];
    editEntry: (value: EctsEntrySchema, index: number) => void;
    onOpenChange: (open: boolean) => void;
};

export default function EditEntryDialog({
    open,
    entry,
    index,
    subjects,
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

    const name = form.watch("name");

    const [comboboxOpen, setComboboxOpen] = useState(false);
    const [showCombobox, setShowCombobox] = useState(subjects.includes(name));

    useEffect(() => {
        if (subjects.length > 0 && name.length == 0 && !showCombobox) {
            setShowCombobox(true);
        }
    }, [subjects, showCombobox, name]);

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
                            onOpenChange(false);
                        })}
                        className="grid gap-4"
                    >
                        {showCombobox ? (
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
                                {t("updateButton")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
