"use client";

import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";

export default function ThemeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <Skeleton className="w-[100px] h-9" />;

    return (
        <>
            <label className="themeSwitcherThree relative inline-flex cursor-pointer select-none items-center">
                <div
                    className="flex items-center justify-center rounded-md bg-background h-9"
                    onClick={() =>
                        setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                >
                    <span
                        className={cn(
                            "h-full w-8 flex justify-center items-center rounded-l-md",
                            resolvedTheme !== "dark"
                                ? "bg-primary text-white"
                                : "border-l border-y border-primary"
                        )}
                    >
                        <SunIcon className="w-4 h-4 text-body-color" />
                    </span>
                    <span
                        className={cn(
                            "h-full w-8 flex justify-center items-center rounded-r-md",
                            resolvedTheme === "dark"
                                ? "bg-primary text-white"
                                : "border-r border-y"
                        )}
                    >
                        <MoonIcon className="w-4 h-4 text-body-color" />
                    </span>
                </div>
            </label>
        </>
    );
}
