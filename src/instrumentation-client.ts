import posthog from "posthog-js";
import { env } from "./env";

if (env.NEXT_PUBLIC_IS_PROD) {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
        defaults: "2025-05-24",
    });
}
