import SettingsPageView from "@/views/settings-page-view/settings-page-view";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("settings.metadata");

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function SettingsPage() {
    return <SettingsPageView />;
}
