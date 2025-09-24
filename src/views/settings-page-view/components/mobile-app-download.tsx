"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useFirstRender from "@/hooks/use-first-render";
import { useMobileAppDownload } from "@/hooks/use-mobile-app";
import { cn } from "@/lib/utils";
import { Check, Download, LoaderCircle, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MobileAppDownload() {
    const tDownload = useTranslations("downloadMobileApp");
    const tSettings = useTranslations("settings.mobileApp");

    const { isFirstRender } = useFirstRender();

    const { status, handleDownload, isRateLimited } = useMobileAppDownload();

    const disabled =
        status === "loading" || status === "success" || isRateLimited;

    return (
        <div>
            <h2 className="text-foreground xs:text-2xl mb-6 text-xl font-bold md:text-3xl">
                {tSettings("text")}
            </h2>
            <Card className="bg-card border-border">
                <CardContent className="xs:px-6 xs:py-4 space-y-2 px-4 py-2">
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                            <Smartphone className="text-foreground h-5 w-5" />
                            <span className="text-foreground font-medium">
                                {tSettings("androidApk")}
                            </span>
                        </div>
                        {isFirstRender && (
                            <div className="bg-button/85 h-9 w-[132px] animate-pulse rounded-md px-4 py-2">
                                <p className="text-foreground h-full w-full"></p>
                            </div>
                        )}
                        {!isFirstRender && (
                            <Button
                                onClick={handleDownload}
                                disabled={disabled}
                                className="relative cursor-pointer gap-3"
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
                                    {status === "success" || isRateLimited ? (
                                        <>
                                            <Check className="size-4 text-green-600" />
                                            {tDownload("success")}
                                        </>
                                    ) : (
                                        <>
                                            <Download className="size-4" />
                                            {tDownload("downloadButton")}
                                        </>
                                    )}
                                </span>
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
