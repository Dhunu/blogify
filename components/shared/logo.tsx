import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
    return (
        <Link href="/" className="md:w-60">
            <Image
                src="/images/logo.png"
                alt="logo"
                width={200}
                height={100}
                className="object-cover"
            />
        </Link>
    );
}
