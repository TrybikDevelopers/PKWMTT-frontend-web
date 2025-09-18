"use client";

import { Link } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import DesktopNav from "./desktop-nav/desktop-nav";
import MobileNavSheet from "./mobile-nav-sheet/mobile-nav-sheet";

export default function Header() {
    const { theme } = useTheme();

    return (
        <header className="bg-background-darker flex h-18 w-full shrink-0 items-center">
            <Link
                href="/"
                className="grid aspect-square h-full w-auto shrink-0 p-2.5"
            >
                <Image
                    src={theme === "dark" ? "/logo.png" : "/logo-light.png"}
                    width={1024}
                    height={1024}
                    alt="logo"
                    className="object-cover"
                    priority
                />
            </Link>
            <div className="flex h-full w-full items-center justify-end p-5">
                <DesktopNav />
                <div className="md:hidden">
                    <MobileNavSheet />
                </div>
            </div>
        </header>
    );
}
