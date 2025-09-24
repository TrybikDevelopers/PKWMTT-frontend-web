import { generateFetchUrl } from "./generate-fetch-url";

export const fetchMobileApk = async (): Promise<
    | { success: true; file: Blob; fileName: string }
    | { success: false; error: "UnknownError" }
> => {
    const url = generateFetchUrl("/apk/download");

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
