import MainPageSkeleton from "@/views/main-page-view/components/main-page-skeleton";
import MainPageView from "@/views/main-page-view/main-page-view";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("home.metadata");

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function Home() {
    return (
        <main className="h-full w-full">
            <Suspense fallback={<MainPageSkeleton />}>
                <MainPageView />
            </Suspense>
        </main>
    );
}
