import "server-only";

import { env } from "@/env";

export const getGenericHeaders = () => {
    return new Headers({
        "x-api-key": env.API_KEY,
    });
};
