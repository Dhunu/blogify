import type { Metadata } from "next";
import {
    Poppins,
    Fira_Sans_Extra_Condensed as FiraSans,
} from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700"],
});

const firaSans = FiraSans({
    subsets: ["latin"],
    variable: "--font-fira-sans",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://blogify.angelsaikia.com/"),
    title: {
        default: "Blogify - A place for your stories",
        template: "%s | Blogify",
    },
    description:
        "Blogify is a place for your stories. Share your thoughts and ideas with the world.",
    openGraph: {
        title: {
            default: "Blogify - A place for your stories",
            template: "%s | Blogify",
        },
        description:
            "Blogify is a place for your stories. Share your thoughts and ideas with the world.",
        type: "website",
        locale: "en_IN",
        url: "https://blogify.angelsaikia.com/",
        siteName: "Blogify",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" className="scroll-smooth">
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        poppins.variable,
                        firaSans.variable
                    )}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <NextTopLoader
                            color={"#16a249"}
                            initialPosition={0.08}
                            crawlSpeed={200}
                            height={3}
                            crawl={true}
                            easing="ease"
                            speed={200}
                            shadow="0 0 10px #16a249,0 0 5px #16a249"
                            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                            zIndex={1600}
                            showAtBottom={false}
                            showSpinner={false}
                        />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
