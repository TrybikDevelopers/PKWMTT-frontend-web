"use client";

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
import { ModeratorPanelEntrySchema } from "@/schema/forms/moderator-panel-form-schema";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";

type Props = {
    open: boolean;
    form: UseFormReturn<ModeratorPanelEntrySchema>;
    generalGroups: string[];
    addedGroups: string[];
    onSubmit: (values: ModeratorPanelEntrySchema) => void;
    onOpenChange: (open: boolean) => void;
};

export default function AddModeratorDialog({
    open,
    form,
    generalGroups,
    addedGroups,
    onSubmit,
    onOpenChange,
}: Props) {
    const t = useTranslations("moderatorPanel.moderatorDialog");
    const [comboboxOpen, setComboboxOpen] = useState(false);

    const sanitizedGeneralGroups = Array.from(
        new Set(
            generalGroups.map((group) => {
                const lastChar = group.slice(-1);

                const isNumber = !isNaN(Number(lastChar));

                if (isNumber) {
                    return group.slice(0, -1);
                }

                return group;
            }),
        ),
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    <Plus className="mr-2 h-4 w-4" />
                    {t("title")}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogDescription>{t("description")}</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4"
                    >
                        {sanitizedGeneralGroups.length > 0 ? (
                            <FormField
                                control={form.control}
                                name="group"
                                render={({ field }) => (
                                    <FormItem className="flex w-full flex-col">
                                        <FormLabel className="">
                                            {t("groupLabel")}
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
                                                            ? sanitizedGeneralGroups.find(
                                                                  (dat) =>
                                                                      dat ===
                                                                      field.value,
                                                              )
                                                            : t("selectGroup")}
                                                        <ChevronsUpDown className="opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="max-h-[var(--radix-popover-content-available-height)] w-[var(--radix-popover-trigger-width)] p-0">
                                                <Command className="w-full max-w-full">
                                                    <CommandInput
                                                        placeholder={t(
                                                            "searchGroup",
                                                        )}
                                                        className="h-9 w-full"
                                                    />
                                                    <CommandList className="w-full">
                                                        <CommandEmpty>
                                                            {t("noGroupFound")}
                                                        </CommandEmpty>
                                                        <CommandGroup className="w-full">
                                                            {sanitizedGeneralGroups
                                                                .filter(
                                                                    (dat) =>
                                                                        !addedGroups.includes(
                                                                            dat,
                                                                        ),
                                                                )
                                                                .map((dat) => (
                                                                    <CommandItem
                                                                        value={
                                                                            dat
                                                                        }
                                                                        key={
                                                                            dat
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "group",
                                                                                dat,
                                                                            );

                                                                            setComboboxOpen(
                                                                                false,
                                                                            );
                                                                        }}
                                                                        className="h-8"
                                                                    >
                                                                        {dat}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                dat ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0",
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
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
                                name="group"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("groupLabel")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t(
                                                    "groupPlaceholder",
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("emailLabel")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t("emailPlaceholder")}
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
