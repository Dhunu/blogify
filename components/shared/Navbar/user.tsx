import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export default function User() {
    const { userId } = auth();
    return (
        <div className="md:w-60 flex justify-end gap-5">
            <ThemeSwitcher />
            {userId ? (
                <>
                    <Link href="/create-blog">
                        <Button>Create Blog</Button>
                    </Link>
                    <UserButton />
                </>
            ) : (
                <>
                    <Link href="/sign-in">
                        <Button variant="outline">Sign In</Button>
                    </Link>
                    <Link href="/create-blog">
                        <Button>Create Blog</Button>
                    </Link>
                </>
            )}
        </div>
    );
}
