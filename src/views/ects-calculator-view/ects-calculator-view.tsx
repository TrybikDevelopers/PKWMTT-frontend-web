"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import EctsForm from "./components/ects-form";
import EctsTableHeader from "./components/ects-table-header";
import EctsTableRow from "./components/ects-table-row";
import useEctsCalculatorPage from "./hooks/use-ects-calculator-page";

export default function ECTSCalculatorView() {
    const t = useTranslations("ectsCalculator.form");

    const {
        rows,
        isFirstRender,
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
        form,
    } = useEctsCalculatorPage();

    return (
        <div className="w-full p-4">
            <div className="grid w-full gap-4 md:grid-cols-3">
                <div className="md:col-span-1">
                    <EctsForm form={form} onSubmit={onSubmit} />
                </div>
                <div className="md:col-span-2 md:flex md:w-full md:justify-center">
                    <div className="grid grid-cols-1 gap-4 md:h-full md:w-1/2 md:items-center">
                        <div className="rounded-2xl border p-4 text-center">
                            <div className="text-muted-foreground text-sm">
                                {t("averageGrade")}
                            </div>
                            <div className="text-xl font-semibold">
                                {avgGrade.toFixed(2)}
                            </div>
                        </div>
                        <div className="rounded-2xl border p-4 text-center">
                            <div className="text-muted-foreground text-sm">
                                {t("totalEcts")}
                            </div>
                            <div className="text-xl font-semibold">
                                {totalEcts}
                            </div>
                        </div>
                        <div className="rounded-2xl border p-4 text-center">
                            <div className="text-muted-foreground text-sm">
                                {t("weightedAverage")}
                            </div>
                            <div className="text-xl font-semibold">
                                {weightedAvg.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 w-full">
                {selected.size > 0 && (
                    <div className="mb-2 flex justify-end">
                        <Button
                            type="button"
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={deleteSelected}
                        >
                            {t("deleteSelectedButton")}
                        </Button>
                    </div>
                )}
                <EctsTableHeader
                    allSelected={allSelected}
                    someSelected={someSelected}
                    onToggleAll={toggleAll}
                />
                {!isFirstRender && rows.length === 0 ? (
                    <div className="border-border flex min-h-32 w-full items-center justify-center border-b px-4 py-8">
                        <div className="text-muted-foreground text-center">
                            <div className="text-sm">{t("emptyState")}</div>
                        </div>
                    </div>
                ) : (
                    !isFirstRender &&
                    rows.map((r, idx) => (
                        <EctsTableRow
                            key={`${r.name}-${idx}`}
                            name={r.name}
                            ects={r.ects}
                            grade={r.grade.toString()}
                            checked={selected.has(idx)}
                            onToggle={() => toggleOne(idx)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
