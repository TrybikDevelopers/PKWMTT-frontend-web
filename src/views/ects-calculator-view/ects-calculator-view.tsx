"use client";

import { useTranslations } from "next-intl";
import AddNewEntryDialog from "./components/add-new-entry-dialog";
import EctsTableHeader from "./components/ects-table-header";
import EctsTableRow from "./components/ects-table-row";
import useEctsCalculatorPage from "./hooks/use-ects-calculator-page";

type Props = {
    subjects: string[];
};

export default function ECTSCalculatorView({ subjects }: Props) {
    const t = useTranslations("ectsCalculator.form");

    const {
        rows,
        isFirstRender,
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
        editEntry,
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
                            entry={r}
                            index={idx}
                            checked={selected.has(idx)}
                            onToggle={() => toggleOne(idx)}
                            onEdit={editEntry}
                            subjects={subjects}
                        />
                    ))
                )}

                {!isFirstRender && rows.length > 0 && (
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

            <AddNewEntryDialog
                open={open}
                selectedCount={selected.size}
                form={form}
                onSubmit={onSubmit}
                onOpenChange={handleDialogOpenChange}
                onDeleteSelected={deleteSelected}
                subjects={subjects}
            />
        </div>
    );
}
