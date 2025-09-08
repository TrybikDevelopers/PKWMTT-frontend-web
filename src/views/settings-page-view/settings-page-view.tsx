"use client";

import { GroupCard } from "@/components/settings/group-card";
import { SettingsToggle } from "@/components/settings/settings-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FlaskConical,
    FolderOpen,
    Monitor,
    Moon,
    Type,
    Users,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPageView() {
    const [darkMode, setDarkMode] = useState(true);
    const [enlargedFont, setEnlargedFont] = useState(false);

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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
