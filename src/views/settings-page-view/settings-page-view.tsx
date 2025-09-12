"use client";

import { GroupCard } from "@/components/settings/group-card";
import { SettingsToggle } from "@/components/settings/settings-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { setLanguageCookie } from "@/lib/cookies-client";
import {
    FlaskConical,
    FolderOpen,
    Globe,
    Monitor,
    Moon,
    Type,
    Users,
} from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function SettingsPageView() {
    const [darkMode, setDarkMode] = useState(true);
    const [enlargedFont, setEnlargedFont] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const groups = [
        {
            title: "Dziekańska",
            tag: "12K1",
            icon: Users,
            iconColor: "bg-teal-500",
        },
        {
            title: "Laboratoryjna",
            tag: "L01",
            icon: FlaskConical,
            iconColor: "bg-red-500",
        },
        {
            title: "Komputerowa",
            tag: "K01",
            icon: Monitor,
            iconColor: "bg-orange-500",
        },
        {
            title: "Projektowa",
            tag: "P01",
            icon: FolderOpen,
            iconColor: "bg-gray-500",
        },
    ];

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="space-y-8">
                <div>
                    <h1 className="text-foreground mb-6 text-3xl font-bold">
                        Grupy Studenckie
                    </h1>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {groups.map((group, index) => (
                            <GroupCard
                                key={index}
                                title={group.title}
                                tag={group.tag}
                                icon={group.icon}
                                iconColor={group.iconColor}
                            />
                        ))}
                    </div>
                </div>

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
                            <SettingsToggle
                                title="Czcionka powiększona"
                                icon={Type}
                                checked={enlargedFont}
                                onCheckedChange={setEnlargedFont}
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
                                        const newLocale = value as "pl" | "en";
                                        setLanguageCookie(newLocale);
                                        router.replace(pathname, {
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
