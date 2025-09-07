"use client";

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
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import EctsTableHeader from "./components/ects-table-header";
import EctsTableRow from "./components/ects-table-row";
import useEctsCalculatorPage from "./hooks/use-ects-calculator-page";

export default function ECTSCalculatorView() {
    const t = useTranslations("ects.form");

    const {
        rows,
        open,
        selected,
        allSelected,
        someSelected,
        avgGrade,
        totalEcts,
        weightedAvg,
        toggleAll,
        toggleOne,
        deleteSelected,
        onSubmit,
        handleDialogOpenChange,
        form,
    } = useEctsCalculatorPage();

    return (
        <div className="w-full p-4">
            <div className="w-full">
                <EctsTableHeader
                    allSelected={allSelected}
                    someSelected={someSelected}
                    onToggleAll={toggleAll}
                />
                {rows.map((r, idx) => (
                    <EctsTableRow
                        key={`${r.name}-${idx}`}
                        name={r.name}
                        ects={r.ects}
                        grade={r.grade}
                        checked={selected.has(idx)}
                        onToggle={() => toggleOne(idx)}
                    />
                ))}

                {rows.length > 0 && (
                    <div className="mt-10 flex min-h-12 grid-cols-3 flex-wrap gap-y-2 rounded-2xl border p-1 sm:grid sm:gap-y-0">
                        <div className="min-w-40 flex-1 px-4 py-2">
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <div className="text-muted-foreground text-sm">
                                    {t("averageGrade")}
                                </div>
                                <div className="text-xl font-semibold">
                                    {avgGrade.toFixed(2)}
                                </div>
                            </div>
                        </div>
                        <div className="min-w-40 flex-1 px-4 py-2">
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <div className="text-muted-foreground text-sm">
                                    {t("totalEcts")}
                                </div>
                                <div className="text-xl font-semibold">
                                    {totalEcts}
                                </div>
                            </div>
                        </div>
                        <div className="min-w-40 flex-1 px-4 py-2">
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <div className="text-muted-foreground text-sm">
                                    {t("weightedAverage")}
                                </div>
                                <div className="text-xl font-semibold">
                                    {weightedAvg.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Dialog open={open} onOpenChange={handleDialogOpenChange}>
                {selected.size === 0 ? (
                    <DialogTrigger className="bg-accent hover:bg-accent/80 absolute bottom-12 left-1/2 flex h-fit w-fit -translate-x-1/2 items-center justify-center rounded-full p-3">
                        <Plus size={60} strokeWidth={3} />
                    </DialogTrigger>
                ) : (
                    <Button
                        type="button"
                        variant="destructive"
                        className="absolute bottom-12 left-1/2 flex h-fit w-fit -translate-x-1/2 items-center justify-center rounded-full p-3"
                        onClick={deleteSelected}
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

                            <FormField
                                control={form.control}
                                name="ects"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("ectsLabel")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t(
                                                    "ectsPlaceholder",
                                                )}
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
                                                placeholder={t(
                                                    "gradePlaceholder",
                                                )}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        {t("cancelButton")}
                                    </Button>
                                </DialogClose>
                                <Button type="submit" variant="default">
                                    {t("confirmButton")}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
