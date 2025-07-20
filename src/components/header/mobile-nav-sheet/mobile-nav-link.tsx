import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
    href: Parameters<typeof Link>[number]["href"];
    children: React.ReactNode;
    onOpenChange: (open: boolean) => void;
};

export default function MobileNavLink({ href, children, onOpenChange }: Props) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "flex cursor-pointer items-center gap-4 rounded-lg p-4 transition-colors",
                "[&>span]:text-base [&>span]:font-medium",
                isActive
                    ? "bg-button [&>svg]:fill-accent [&>span]:text-foreground"
                    : "bg-button/70 hover:bg-button [&>svg]:fill-accent/70 [&>span]:text-foreground/70 hover:[&>svg]:fill-accent hover:[&>span]:text-foreground",
            )}
            onNavigate={() => setTimeout(() => onOpenChange(false), 150)}
        >
            {children}
        </Link>
    );
}
