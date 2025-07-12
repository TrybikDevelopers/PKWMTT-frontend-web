import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function Home() {
    const locale = useLocale();

    return (
        <main className="xs:text-red-500 flex h-full flex-col items-center justify-center gap-4 bg-white text-black md:text-blue-500">
            <div>Locale: {locale}</div>
            <Link href="/" locale="en">
                Go to English
            </Link>
            <Link href="/" locale="pl">
                Go to Polish
            </Link>
        </main>
    );
}
