import ModeratorHeader from "@/components/moderator-header/moderator-header";

export default function ModeratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ModeratorHeader />
            {children}
        </>
    );
}
