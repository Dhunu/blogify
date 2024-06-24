import Navbar from "@/components/shared/Navbar";
import React from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen">
            <Navbar />
            <div className="w-full max-w-screen-xl mx-auto px-10">
                {children}
            </div>
        </div>
    );
}
