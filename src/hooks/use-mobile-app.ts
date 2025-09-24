import { fetchMobileApk } from "@/server/data-access/mobile-apk";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod/mini";

const MOBILE_APP_DIALOG_LAST_SHOWN_KEY =
    "download-mobile-app-dialog-last-shown";

const dateSchema = z.iso.datetime();

const dateSerializer = (value: Date | null): string => {
    return value?.toISOString() || "";
};

const dateDeserializer = (value: string): Date | null => {
    const result = dateSchema.safeParse(value);
    return result.success ? new Date(result.data) : null;
};

export function useMobileAppDialog() {
    const [isOpen, setIsOpen] = useState(false);

    const { status, handleDownload } = useMobileAppDownload();

    const [lastShown, setLastShown] = useLocalStorage<Date | null>(
        MOBILE_APP_DIALOG_LAST_SHOWN_KEY,
        null,
        {
            serializer: dateSerializer,
            deserializer: dateDeserializer,
        },
    );

    const updateOpen = useCallback(
        (open: boolean) => {
            setIsOpen(open);
        },
        [setIsOpen],
    );

    useEffect(() => {
        const shouldShowDialog: boolean = !(lastShown instanceof Date);

        if (shouldShowDialog) {
            const timer = setTimeout(() => {
                updateOpen(true);
                setLastShown(new Date());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [lastShown, updateOpen, setLastShown]);

    return {
        isOpen,
        status,
        handleDownload,
        updateOpen,
    };
}

export function useMobileAppDownload() {
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const t = useTranslations("downloadMobileApp");

    const handleDownload = useCallback(async () => {
        try {
            setStatus("loading");
            const result = await fetchMobileApk();

            if (!result.success) {
                throw new Error(result.error);
            }

            const a = document.createElement("a");

            const url = URL.createObjectURL(result.file);

            a.href = url;
            a.download = result.fileName;
            a.click();

            URL.revokeObjectURL(url);

            setStatus("success");
        } catch (error) {
            console.error(error);

            setStatus("error");
            toast.error(t("error"));
        } finally {
            setStatus("idle");
        }
    }, [t]);

    return {
        status,
        handleDownload,
    };
}
