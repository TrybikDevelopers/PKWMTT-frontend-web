import ECTSCalculatorView from "@/views/ects-calculator-view/ects-calculator-view";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("ectsCalculator.metadata");

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function ECTSCalculatorPage() {
    return <ECTSCalculatorView />;
}
