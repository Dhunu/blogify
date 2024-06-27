import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <div className="w-full max-w-screen-xl mx-auto px-10">{children}</div>
    );
}
