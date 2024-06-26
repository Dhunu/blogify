"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";

export default function Search() {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "/") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <div className="w-[400px] h-full flex items-center relative group">
            <Input
                ref={inputRef}
                placeholder="Search"
                className="w-full focus-visible:ring-offset-0  selection:bg-neutral-400 selection:text-white "
            />
            <div className="absolute right-2 text-sm text-muted-foreground group-focus-within:opacity-0 transition-all">
                Ctrl + /
            </div>
        </div>
    );
}
