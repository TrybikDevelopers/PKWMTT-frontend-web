import { fetchMobileApk } from "@/server/data-access/mobile-apk";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod/mini";

const MOBILE_APP_DIALOG_LAST_SHOWN_KEY = "mobile-app-dialog-last-shown";
const MOBILE_APP_DOWNLOAD_LAST_KEY = "mobile-app-last-download";
const RATE_LIMIT_THRESHOLD_MS = 1000 * 60 * 5; // 5 minutes
const DIALOG_SHOW_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 14; // 14 days

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

    const { status, handleDownload, isRateLimited, lastDownload } =
        useMobileAppDownload();

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
        const thresholdPassed = lastShown
            ? Date.now() - lastShown.getTime() > DIALOG_SHOW_THRESHOLD_MS
            : true; // fallback to true if lastShown is not a date

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        const shouldShowDialog: boolean =
            thresholdPassed && !isRateLimited && !isIOS && !lastDownload;

        const timer = setTimeout(() => {
            if (shouldShowDialog) {
                updateOpen(true);
                setLastShown(new Date());
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [lastShown, isRateLimited, updateOpen, setLastShown, lastDownload]);

    return {
        isOpen,
        status,
        handleDownload,
        updateOpen,
    };
}

export function useMobileAppDownload() {
    const [lastDownload, setLastDownload] = useLocalStorage<Date | null>(
        MOBILE_APP_DOWNLOAD_LAST_KEY,
        null,
        {
            serializer: dateSerializer,
            deserializer: dateDeserializer,
        },
    );

    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const t = useTranslations("downloadMobileApp");

    const isRateLimited: boolean = lastDownload
        ? Date.now() - lastDownload.getTime() < RATE_LIMIT_THRESHOLD_MS
        : false;

    const handleDownload = useCallback(async () => {
        if (isRateLimited) {
            return;
        }

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
            setLastDownload(new Date());
        } catch (error) {
            console.error(error);

            setStatus("error");
            toast.error(t("error"));
        }
    }, [t, setLastDownload, isRateLimited]);

    return {
        status,
        handleDownload,
        isRateLimited,
        lastDownload,
    };
}
