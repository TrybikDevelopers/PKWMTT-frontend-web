"use client";

import { useEffect, useRef, useState } from "react";

export function useStickyHeader() {
    const [isSticky, setIsSticky] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const placeholder = placeholderRef.current;
        const header = headerRef.current;

        if (!placeholder || !header) return;

        const handleScrollOrResize = () => {
            const rect = placeholder.getBoundingClientRect();
            const shouldBeSticky = rect.top <= 0;

            setIsSticky(shouldBeSticky);
            setHeaderHeight(header.offsetHeight);
        };

        handleScrollOrResize();

        window.addEventListener("scroll", handleScrollOrResize);
        window.addEventListener("resize", handleScrollOrResize);

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
        };
    }, []);

    return {
        placeholderRef,
        isSticky,
        headerRef,
        headerHeight,
    };
}
