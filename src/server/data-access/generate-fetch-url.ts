import "server-only";

import { env } from "@/env";

const API_BASE_PATH = "/pkwmtt/api/v1/";

export const generateFetchUrl = (pathname: string): URL => {
    const processedPathname: string = `${API_BASE_PATH}${pathname.startsWith("/") ? pathname.slice(1) : pathname}`;

    const url = new URL(processedPathname, env.API_BASE_URL);
    return url;
};
