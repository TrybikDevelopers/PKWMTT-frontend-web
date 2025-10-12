import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "PKWM App",
        short_name: "PKWM App",
        description:
            "Manage your university timetable, academic calendar, and calculate ECTS with PKWM App.",
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
