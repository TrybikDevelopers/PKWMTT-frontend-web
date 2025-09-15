"use client";

import { SettingsToggle } from "@/components/settings/settings-toggle";
import { Card, CardContent } from "@/components/ui/card";
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

export default function ApplicationAppearance() {
    const locale = useLocale();
    const router = useRouter();

    const { setTheme, theme } = useTheme();
    const { isFirstRender } = useFirstRender();

    const t = useTranslations("settings.applicationAppearance");

    return (
        <div>
            <h2 className="text-foreground mb-6 text-3xl font-bold">
                {t("text")}
            </h2>
            <Card className="bg-card border-border">
                <CardContent className="space-y-2 p-6">
                    <SettingsToggle
                        title={t("darkMode")}
                        icon={Moon}
                        checked={isFirstRender ? false : theme === "dark"}
                        onCheckedChange={() =>
                            setTheme((prev) =>
                                prev === "dark" ? "light" : "dark",
                            )
                        }
                    />
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                            <Globe className="text-foreground h-5 w-5" />
                            <span className="text-foreground font-medium">
                                {t("language")}
                            </span>
                        </div>
                        <Select
                            value={locale}
                            onValueChange={(value) => {
                                const newLocale = value as Locale;

                                router.replace("/settings", {
                                    locale: newLocale,
                                });
                            }}
                        >
                            <SelectTrigger size="sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pl">
                                    {t("polish")}
                                </SelectItem>
                                <SelectItem value="en">
                                    {t("english")}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
