import { Pencil } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { FaRegHeart } from "react-icons/fa";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Button } from "./ui/button";

export default function BlogHeader({
    authorId,
    title,
    slug,
}: {
    authorId: string;
    title: string;
    slug: string;
}) {
    const { userId } = auth();
    return (
        <div className="flex gap-10 justify-between items-center sticky top-0 h-16 bg-background">
            <Breadcrumb>
                <BreadcrumbList className="text-xl font-bold">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {userId === authorId ? (
                <Link href={`/blog/${slug}/edit`}>
                    <Button size="sm">
                        <Pencil className="h-4 w-4" />
                    </Button>
                </Link>
            ) : (
                <FaRegHeart className="h-5 w-5" />
            )}
        </div>
    );
}
