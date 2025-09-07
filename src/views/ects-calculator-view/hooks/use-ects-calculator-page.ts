import {
    getEctsFormSchema,
    type EctsEntrySchema,
} from "@/schema/forms/ects-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";

export default function useEctsCalculatorPage() {
    const t = useTranslations("ects.form");

    const [rows, setRows] = useLocalStorage<EctsEntrySchema[]>(
        "ects-calculator-rows",
        [],
        {
            deserializer: (value: string): EctsEntrySchema[] => {
                try {
                    const parsed = getEctsFormSchema(
                        t,
                    ).entriesArraySchema.parse(JSON.parse(value));

                    return parsed;
                } catch {
                    return [];
                }
            },
        },
    );

    const [isFirstRender, setIsFirstRender] = useState(true);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Set<number>>(new Set());

    // Computed values for selection state
    const allSelected = rows.length > 0 && selected.size === rows.length;
    const someSelected = selected.size > 0 && !allSelected;

    // Selection management functions
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

    const form = useForm<EctsEntrySchema>({
        resolver: zodResolver(getEctsFormSchema(t).ectsEntrySchema),
        defaultValues: { name: "", ects: "", grade: "" },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onSubmit = (values: EctsEntrySchema) => {
        setRows((prev) => [
            ...prev,
            { name: values.name, ects: values.ects, grade: values.grade },
        ]);

        form.reset({
            name: "",
            ects: "",
            grade: "",
        });

        setOpen(false);
    };

    const { avgGrade, totalEcts, weightedAvg } = useMemo(() => {
        const count = rows.length;
        const totalGrades = rows.reduce((acc, r) => acc + Number(r.grade), 0);
        const avg = count > 0 ? totalGrades / count : 0;
        const ectsSum = rows.reduce((acc, r) => acc + Number(r.ects), 0);
        const weightedSum = rows.reduce(
            (acc, r) => acc + Number(r.grade) * Number(r.ects),
            0,
        );
        const wAvg = ectsSum > 0 ? weightedSum / Number(ectsSum) : 0;

        return { avgGrade: avg, totalEcts: ectsSum, weightedAvg: wAvg };
    }, [rows]);

    const handleDialogOpenChange = (state: boolean) => {
        setOpen(state);

        if (state) {
            form.reset({
                name: "",
                ects: "",
                grade: "",
            });
        }
    };

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
        }
    }, [isFirstRender]);

    return {
        // If first render, return empty array to avoid hydration error
        rows: isFirstRender ? [] : rows,
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
    };
}
