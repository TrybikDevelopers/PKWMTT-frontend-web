import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Next.js App", // TODO: Update this to app name
        short_name: "Next.js App",
        description: "Next.js App",
        start_url: "/",
        display: "standalone",
        background_color: "#191919",
        theme_color: "#727dff",
        icons: [
            {
                src: "/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                src: "/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
