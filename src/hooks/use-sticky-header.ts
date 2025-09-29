"use client";

import { useEffect, useRef, useState } from "react";

export function useStickyHeader() {
    const [isSticky, setIsSticky] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const header = headerRef.current;
        const placeholder = placeholderRef.current;

        if (!header || !placeholder) return;

        const updateHeaderHeight = () => {
            const height = header.offsetHeight;
            setHeaderHeight(height);
        };

        const handleScroll = () => {
            const rect = header.getBoundingClientRect();
            const shouldBeSticky = rect.top <= 0;

            if (shouldBeSticky !== isSticky) {
                setIsSticky(shouldBeSticky);
            }
        };

        updateHeaderHeight();

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateHeaderHeight, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateHeaderHeight);
        };
    }, [isSticky]);

    return {
        headerRef,
        placeholderRef,
        isSticky,
        headerHeight,
    };
}
