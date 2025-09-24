"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useMobileAppDialog } from "@/hooks/use-mobile-app";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Check, Download, LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DownloadMobileAppDialog() {
    const t = useTranslations("downloadMobileApp");

    const { isOpen, updateOpen, handleDownload, status } = useMobileAppDialog();

    return (
        <Dialog open={isOpen} onOpenChange={updateOpen}>
            <DialogContent className="sm:max-w-md" showCloseButton={true}>
                <DialogHeader>
                    <DialogTitle className="mt-1">{t("title")}</DialogTitle>
                    <DialogDescription>{t("description")}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <Button
                        onClick={handleDownload}
                        aria-disabled={
                            status === "loading" || status === "success"
                        }
                        className="relative w-full cursor-pointer gap-3"
                    >
                        <LoaderCircle
                            className={cn(
                                "absolute top-1/2 left-1/2 hidden size-5 -translate-x-1/2 -translate-y-1/2 animate-spin",
                                status === "loading" && "block",
                            )}
                        />
                        <span
                            className={cn(
                                "mx-auto flex h-fit w-fit flex-row items-center justify-center gap-2 opacity-100",
                                status === "loading" && "opacity-0",
                            )}
                        >
                            {status === "success" ? (
                                <>
                                    <Check className="size-4 text-green-600" />
                                    {t("success")}
                                </>
                            ) : (
                                <>
                                    <Download className="size-4" />
                                    {t("downloadButton")}
                                </>
                            )}
                        </span>
                    </Button>

                    <p className="text-muted-foreground text-center text-sm">
                        {t.rich("settingsNote", {
                            mark: (chunks) => (
                                <Link
                                    href="/settings"
                                    className="text-accent font-bold"
                                >
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
