import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        API_KEY: z.string().check(z.minLength(1)),
        API_BASE_URL: z.url().transform((val) => {
            // Ensure the URL is valid and only return the origin
            const url = new URL(val);
            return url.origin;
        }),
    },
    client: {
        NEXT_PUBLIC_IS_PROD: z.boolean(),
        NEXT_PUBLIC_IS_DEV: z.boolean(),
        NEXT_PUBLIC_IS_TEST: z.boolean(),
        NEXT_PUBLIC_APK_DOWNLOAD_BASE_URL: z.url().transform((val) => {
            // Ensure the URL is valid and only return the origin
            const url = new URL(val);
            return url.origin;
        }),
    },
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        NEXT_PUBLIC_APK_DOWNLOAD_BASE_URL:
            process.env.NEXT_PUBLIC_APK_DOWNLOAD_BASE_URL,
        API_BASE_URL: process.env.API_BASE_URL,
        API_KEY: process.env.API_KEY,
        NEXT_PUBLIC_IS_PROD: process.env.NODE_ENV === "production",
        NEXT_PUBLIC_IS_DEV: process.env.NODE_ENV === "development",
        NEXT_PUBLIC_IS_TEST: process.env.NODE_ENV === "test",
    },
});
