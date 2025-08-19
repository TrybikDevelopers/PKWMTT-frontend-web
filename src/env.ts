import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        API_BASE_URL: z.url().transform((val) => {
            // Ensure the URL is valid and only return the origin
            const url = new URL(val);
            return url.origin;
        }),
        ALLOW_UNSECURE_COOKIES: z
            .preprocess((val) => {
                if (typeof val === "string") {
                    return val === "true";
                }
                if (typeof val === "boolean") {
                    return val;
                }
                return false;
            }, z.boolean())
            .optional(),
    },
    client: {
        NEXT_PUBLIC_IS_PROD: z.boolean(),
        NEXT_PUBLIC_IS_DEV: z.boolean(),
        NEXT_PUBLIC_IS_TEST: z.boolean(),
    },
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        API_BASE_URL: process.env.API_BASE_URL,
        NEXT_PUBLIC_IS_PROD: process.env.NODE_ENV === "production",
        NEXT_PUBLIC_IS_DEV: process.env.NODE_ENV === "development",
        NEXT_PUBLIC_IS_TEST: process.env.NODE_ENV === "test",
        ALLOW_UNSECURE_COOKIES: process.env.ALLOW_UNSECURE_COOKIES,
    },
});
