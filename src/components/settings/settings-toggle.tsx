import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";

interface SettingsToggleProps {
    title: string;
    icon: LucideIcon;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

export function SettingsToggle({
    title,
    icon: Icon,
    checked,
    onCheckedChange,
}: SettingsToggleProps) {
    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
                <Icon className="text-foreground h-5 w-5" />
                <span className="text-foreground font-medium">{title}</span>
            </div>
            <Switch checked={checked} onCheckedChange={onCheckedChange} />
        </div>
    );
}
