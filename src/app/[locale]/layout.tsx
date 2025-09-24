import DownloadMobileAppDialog from "@/components/download-mobile-app-dialog";
import Header from "@/components/header/header";
import RootLayoutProvider from "@/components/providers/root-layout-provider";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${inter.className} flex flex-col`}>
                <RootLayoutProvider>
                    <Header />
                    {children}
                    <DownloadMobileAppDialog />
                    <Toaster duration={3000} />
                </RootLayoutProvider>
            </body>
        </html>
    );
}
