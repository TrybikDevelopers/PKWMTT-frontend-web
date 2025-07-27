import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    isLoading: boolean;
};

export default function SubmitButton({ isLoading }: Props) {
    const t = useTranslations("home.timetableForm");

    return (
        <Button
            type="submit"
            aria-disabled={isLoading}
            className="group relative mx-auto cursor-pointer"
        >
            <span className="opacity-100 group-aria-disabled:opacity-0">
                {t("submit")}
            </span>
            <LoaderCircle className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 animate-spin opacity-0 group-aria-disabled:opacity-100" />
        </Button>
    );
}
