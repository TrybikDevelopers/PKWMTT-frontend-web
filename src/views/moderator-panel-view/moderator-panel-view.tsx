"use client";

import { SettingsToggle } from "@/components/settings/settings-toggle";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useFirstRender from "@/hooks/use-first-render";
import { useRouter } from "@/i18n/navigation";
import { Globe, Moon } from "lucide-react";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import AddModeratorDialog from "./components/add-moderator-dialog";
import ModeratorTable from "./components/moderator-table";
import useModeratorPanel from "./hooks/use-moderator-panel";

export default function ModeratorPanelView() {
    const t = useTranslations("moderatorPanel");
    const tSettings = useTranslations("settings.applicationAppearance");

    const locale = useLocale();
    const router = useRouter();
    const { setTheme, theme } = useTheme();
    const { isFirstRender } = useFirstRender();

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
                        data={[]}
                        onSubmit={onSubmit}
                        onOpenChange={handleDialogOpenChange}
                    />
                </div>

                {/* Theme and Language Controls */}
                <div className="flex items-center gap-6">
                    <SettingsToggle
                        title={tSettings("darkMode")}
                        icon={Moon}
                        checked={isFirstRender ? false : theme === "dark"}
                        onCheckedChange={() =>
                            setTheme((prev) =>
                                prev === "dark" ? "light" : "dark",
                            )
                        }
                    />
                    <div className="flex items-center gap-3">
                        <Globe className="text-foreground h-5 w-5" />
                        <span className="text-foreground font-medium">
                            {tSettings("language")}
                        </span>
                        <Select
                            value={locale}
                            onValueChange={(value) => {
                                const newLocale = value as Locale;
                                router.replace("/moderator-panel", {
                                    locale: newLocale,
                                });
                                router.prefetch({ pathname: "/" });
                                router.prefetch({ pathname: "/calendar" });
                                router.prefetch({
                                    pathname: "/ects-calculator",
                                });
                            }}
                        >
                            <SelectTrigger size="sm" className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pl">
                                    {tSettings("polish")}
                                </SelectItem>
                                <SelectItem value="en">
                                    {tSettings("english")}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
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
