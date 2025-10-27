"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ModeratorPanelEntrySchema } from "@/schema/forms/moderator-panel-form-schema";
import { Send, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    rows: ModeratorPanelEntrySchema[];
    onDelete: (index: number) => void;
    onSendAgain: (index: number) => void;
};

export default function ModeratorTable({ rows, onDelete, onSendAgain }: Props) {
    const t = useTranslations("moderatorPanel.table");

    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-table-header">
                            <tr>
                                <th className="text-foreground flex-1/6 px-6 py-4 text-left text-sm font-medium">
                                    {t("group")}
                                </th>
                                <th className="text-foreground flex-4/6 px-6 py-4 text-left text-sm font-medium">
                                    {t("email")}
                                </th>
                                <th className="text-foreground flex-1/6 px-12 py-4 text-right text-sm font-medium">
                                    {t("actions")}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-border divide-y">
                            {rows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="text-muted-foreground px-6 py-8 text-center"
                                    >
                                        {t("noModeratorsFound")}
                                    </td>
                                </tr>
                            ) : (
                                rows.map((moderator, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-muted/50"
                                    >
                                        <td className="text-foreground px-6 py-4 text-sm font-medium">
                                            {moderator.group}
                                        </td>
                                        <td className="text-foreground px-6 py-4 text-sm">
                                            {moderator.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        onSendAgain(index)
                                                    }
                                                    className="flex cursor-pointer items-center gap-1 text-xs"
                                                >
                                                    <Send className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        onDelete(index)
                                                    }
                                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
