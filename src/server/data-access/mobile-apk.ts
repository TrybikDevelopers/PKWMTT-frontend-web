import { env } from "@/env";

export const getDownloadUrl = (): URL => {
    const url = new URL(
        "/pkwmtt/api/v1/apk/download",
        env.NEXT_PUBLIC_APK_DOWNLOAD_BASE_URL,
    );
    return url;
};

export const fetchMobileApk = async (): Promise<
    | { success: true; file: Blob; fileName: string }
    | { success: false; error: "UnknownError" }
> => {
    const url = getDownloadUrl();

    const response = await fetch(url);

    if (!response.ok) {
        return {
            success: false,
            error: "UnknownError",
        };
    }

    const contentDisposition = response.headers.get("Content-Disposition");
    const fileName =
        contentDisposition?.split("filename=").at(1) ?? "PKWM_APP.apk";

    return {
        success: true,
        file: await response.blob(),
        fileName,
    };
};
