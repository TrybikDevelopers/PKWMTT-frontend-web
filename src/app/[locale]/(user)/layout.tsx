import DownloadMobileAppDialog from "@/components/download-mobile-app-dialog";
import Header from "@/components/header/header";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <DownloadMobileAppDialog />
        </>
    );
}
