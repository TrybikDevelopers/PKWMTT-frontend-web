import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface GroupCardProps {
    title: string;
    tag: string;
    icon: LucideIcon;
    iconColor: string;
}

export function GroupCard({
    title,
    tag,
    icon: Icon,
    iconColor,
}: GroupCardProps) {
    return (
        <Card className="bg-card border-border hover:bg-accent/50 cursor-pointer transition-colors">
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <div className={cn("rounded-lg p-2", iconColor)}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-foreground font-medium">{title}</h3>
                    </div>
                    <div className="bg-destructive text-destructive-foreground rounded-md px-2 py-1 text-xs font-medium">
                        {tag}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
