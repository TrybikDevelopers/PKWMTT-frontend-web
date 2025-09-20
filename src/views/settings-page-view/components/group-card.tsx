import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface GroupCardProps {
    title: string;
    icon: LucideIcon;
    iconColor: string;
    children: React.ReactNode;
    valueRequired: boolean;
}

export default function GroupCard({
    title,
    icon: Icon,
    iconColor,
    children,
    valueRequired,
}: GroupCardProps) {
    return (
        <Card
            className={cn(
                `bg-card border-border flex items-center transition-colors`,
                valueRequired && "border-red-400",
            )}
        >
            <CardContent className="w-full p-4">
                <div className="flex items-center gap-3">
                    <div className={cn("rounded-lg p-2", iconColor)}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-foreground xs:text-nowrap xs:text-base text-sm font-medium text-wrap md:text-wrap lg:text-nowrap">
                            {title}
                        </h3>
                    </div>
                    {children}
                </div>
            </CardContent>
        </Card>
    );
}

export function GroupCardSkeleton() {
    return (
        <Card className="bg-card border-border min-h-18 animate-pulse transition-colors">
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-black/25 p-2 dark:bg-white/25">
                        <div className="size-6"></div>
                    </div>
                    <div className="flex-1">
                        <div className="h-6 w-22 rounded-sm bg-black/25 dark:bg-white/25" />
                    </div>
                    <div>
                        <div className="h-6 w-28 rounded-sm bg-black/25 dark:bg-white/25" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
