"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

const mockModerators = [
    {
        id: 1,
        group: "12K",
        email: "moderator@gmail.com",
    },
];

export default function ModeratorTable() {
    const t = useTranslations("moderatorPanel.table");

    const handleSendAgain = (moderatorId: number) => {
        console.log(`Sending again for moderator ${moderatorId}`);
    };

    const handleDelete = (moderatorId: number) => {
        console.log(`Deleting moderator ${moderatorId}`);
    };

    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="flex-1/6 px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {t("group")}
                                </th>
                                <th className="flex-4/6 px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {t("email")}
                                </th>
                                <th className="flex-1/6 px-12 py-4 text-right text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {t("actions")}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {mockModerators.map((moderator) => (
                                <tr
                                    key={moderator.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {moderator.group}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                        {moderator.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleSendAgain(
                                                        moderator.id,
                                                    )
                                                }
                                                className="flex items-center gap-1 text-xs"
                                            >
                                                <Send className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(moderator.id)
                                                }
                                                className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/20 dark:hover:text-red-300"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
