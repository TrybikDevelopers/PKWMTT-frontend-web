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
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import EctsTableHeader from "./components/ects-table-header";
import EctsTableRow from "./components/ects-table-row";

type EctsEntry = {
    name: string;
    ects: number;
    grade: number;
};

export default function ECTSCalculatorView() {
    const t = useTranslations("ectsCalculator");
    const [rows, setRows] = useState<EctsEntry[]>([
        { name: "Mathematics", ects: 6, grade: 5 },
    ]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const allSelected = rows.length > 0 && selected.size === rows.length;
    const someSelected = selected.size > 0 && !allSelected;

    const toggleAll = () => {
        if (allSelected) {
            setSelected(new Set());
        } else {
            setSelected(new Set(rows.map((_, idx) => idx)));
        }
    };

    const toggleOne = (idx: number) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx);
            else next.add(idx);
            return next;
        });
    };

    const deleteSelected = () => {
        if (selected.size === 0) return;
        setRows((prev) => prev.filter((_, idx) => !selected.has(idx)));
        setSelected(new Set());
    };

    const form = useForm<{
        name: string;
        ects: string;
        grade: string;
    }>({
        defaultValues: { name: "", ects: "", grade: "" },
        mode: "onSubmit",
    });

    function onSubmit(values: { name: string; ects: string; grade: string }) {
        const ectsNumber = Number(values.ects);
        const gradeNumber = Number(values.grade);
        if (
            !values.name ||
            Number.isNaN(ectsNumber) ||
            Number.isNaN(gradeNumber)
        )
            return;
        if (gradeNumber < 2 || gradeNumber > 5) return;
        const decimals = values.grade.includes(".")
            ? values.grade.split(".")[1].length
            : 0;
        if (decimals > 1) return;
        setRows((prev) => [
            ...prev,
            { name: values.name, ects: ectsNumber, grade: gradeNumber },
        ]);
        form.reset();
        setOpen(false);
    }

    const { avgGrade, totalEcts, weightedAvg } = useMemo(() => {
        const count = rows.length;
        const totalGrades = rows.reduce((acc, r) => acc + r.grade, 0);
        const avg = count > 0 ? totalGrades / count : 0;
        const ectsSum = rows.reduce((acc, r) => acc + r.ects, 0);
        const weightedSum = rows.reduce((acc, r) => acc + r.grade * r.ects, 0);
        const wAvg = ectsSum > 0 ? weightedSum / ectsSum : 0;
        return { avgGrade: avg, totalEcts: ectsSum, weightedAvg: wAvg };
    }, [rows]);

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

                <div className="mt-10 flex min-h-12 items-stretch rounded-2xl border p-1">
                    <div className="w-12" />
                    <div className="flex-1 px-4 py-2">
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <div className="text-muted-foreground text-sm">
                                {t("summary.averageGrade")}
                            </div>
                            <div className="text-xl font-semibold">
                                {avgGrade.toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 px-4 py-2">
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <div className="text-muted-foreground text-sm">
                                {t("summary.totalEcts")}
                            </div>
                            <div className="text-xl font-semibold">
                                {totalEcts}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 px-4 py-2">
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <div className="text-muted-foreground text-sm">
                                {t("summary.weightedAverage")}
                            </div>
                            <div className="text-xl font-semibold">
                                {weightedAvg.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={open}
                onOpenChange={(v) => {
                    setOpen(v);
                    if (v) {
                        form.reset();
                    }
                }}
            >
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
                        <Trash2 className="mr-1" /> {t("form.deleteSelected")}
                    </Button>
                )}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("form.addSubject")}</DialogTitle>
                        <DialogDescription>
                            {t("form.addSubjectDescription")}
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
                                rules={{ required: t("form.nameRequired") }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.name")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t(
                                                    "form.namePlaceholder",
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
                                rules={{
                                    required: t("form.ectsRequired"),
                                    validate: (value) => {
                                        const n = Number(value);
                                        if (Number.isNaN(n))
                                            return t("form.ectsMustBeNumber");
                                        if (n < 0)
                                            return t(
                                                "form.ectsCannotBeNegative",
                                            );
                                        return true;
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("form.ectsValue")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder={t(
                                                    "form.ectsPlaceholder",
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
                                rules={{
                                    required: t("form.gradeRequired"),
                                    validate: (value) => {
                                        const n = Number(value);
                                        if (Number.isNaN(n))
                                            return t("form.gradeMustBeNumber");
                                        if (n < 2 || n > 5)
                                            return t("form.gradeRange");
                                        const decimals = value.includes(".")
                                            ? value.split(".")[1].length
                                            : 0;
                                        if (decimals > 1)
                                            return t("form.gradeDecimals");
                                        return true;
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.grade")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder={t(
                                                    "form.gradePlaceholder",
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
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => form.reset()}
                                    >
                                        {t("form.cancel")}
                                    </Button>
                                </DialogClose>
                                <Button type="submit" variant="default">
                                    {t("form.confirm")}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
