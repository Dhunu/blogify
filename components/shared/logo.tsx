import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
    return (
        <Link href="/" className="md:w-60 ">
            <div className="w-40 flex flex-col items-center mt-0.5">
                <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={120}
                    height={100}
                    className="object-cover"
                />
                <span className="font-firaSans text-[#16a600] text-sm">
                    A place for your stories
                </span>
            </div>
        </Link>
    );
}
