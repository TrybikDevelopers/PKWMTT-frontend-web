"use client";

import { useTranslations } from "next-intl";
import AddModeratorDialog from "./components/add-moderator-dialog";
import ModeratorTable from "./components/moderator-table";
import useModeratorPanel from "./hooks/use-moderator-panel";

type Props = {
    generalGroups: string[];
};

export default function ModeratorPanelView({ generalGroups }: Props) {
    const t = useTranslations("moderatorPanel");

    const {
        rows,
        open,
        onSubmit,
        handleDialogOpenChange,
        handleDelete,
        handleSendAgain,
        form,
    } = useModeratorPanel();

    return (
        <div className="bg-background min-h-screen">
            <div className="border-b p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-foreground text-2xl font-bold">
                                {t("title")}
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                {t("description")}
                            </p>
                        </div>
                    </div>

                    <AddModeratorDialog
                        open={open}
                        form={form}
                        generalGroups={generalGroups}
                        addedGroups={rows.map((r) => r.group)}
                        onSubmit={onSubmit}
                        onOpenChange={handleDialogOpenChange}
                    />
                </div>
            </div>

            <div className="p-6">
                <ModeratorTable
                    rows={rows}
                    onDelete={handleDelete}
                    onSendAgain={handleSendAgain}
                />
            </div>
        </div>
    );
}
