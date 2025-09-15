"use client";

import { SettingsToggle } from "@/components/settings/settings-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@/i18n/navigation";
import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import { Globe, Moon } from "lucide-react";
import { type Locale, useLocale } from "next-intl";
import { useState } from "react";
import StudentGroups from "./components/student-groups";

type Props = {
    timetableSettings: TimetableSettingsSchema | null;
};

export default function SettingsPageView({ timetableSettings }: Props) {
    const [darkMode, setDarkMode] = useState(true);
    const router = useRouter();
    const locale = useLocale();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="space-y-8">
                <StudentGroups timetableSettings={timetableSettings} />

                <div>
                    <h1 className="text-foreground mb-6 text-3xl font-bold">
                        Wygląd Aplikacji
                    </h1>
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-foreground">
                                Ustawienia wyglądu
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <SettingsToggle
                                title="Tryb ciemny"
                                icon={Moon}
                                checked={darkMode}
                                onCheckedChange={setDarkMode}
                            />
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-3">
                                    <Globe className="text-foreground h-5 w-5" />
                                    <span className="text-foreground font-medium">
                                        Język
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
                                            Polski
                                        </SelectItem>
                                        <SelectItem value="en">
                                            English
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
