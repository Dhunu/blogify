import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

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
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
