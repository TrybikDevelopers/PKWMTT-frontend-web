"use client";

export const setLanguageCookie = (locale: "pl" | "en") => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
};

export const getLanguageCookie = (): "pl" | "en" | null => {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split(";");
    const languageCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("NEXT_LOCALE="),
    );

    if (!languageCookie) return null;

    const value = languageCookie.split("=")[1]?.trim();
    if (value === "pl" || value === "en") {
        return value;
    }

    return null;
};

type EctsEntry = {
    name: string;
    ects: number;
    grade: number;
};

export const setEctsCalculatorCookie = (data: EctsEntry[]) => {
    const ectsDataString = JSON.stringify(data);
    document.cookie = `NEXT_ECTS_CALCULATOR=${encodeURIComponent(ectsDataString)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
};

export const getEctsCalculatorCookie = (): EctsEntry[] | null => {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split(";");
    const ectsCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("NEXT_ECTS_CALCULATOR="),
    );

    if (!ectsCookie) return null;

    try {
        const value = ectsCookie.split("=")[1]?.trim();
        if (!value) return null;

        const decodedValue = decodeURIComponent(value);
        const parsedData = JSON.parse(decodedValue);

        if (!Array.isArray(parsedData)) return null;

        const isValid = parsedData.every(
            (item) =>
                typeof item === "object" &&
                typeof item.name === "string" &&
                typeof item.ects === "number" &&
                typeof item.grade === "number",
        );

        return isValid ? parsedData : null;
    } catch {
        return null;
    }
};
