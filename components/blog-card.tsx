import { Blog } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function BlogCard(blog: Blog & { className?: string }) {
    return (
        <div className="flex flex-col rounded-md shadow-lg dark:shadow-neutral-700 border overflow-hidden">
            <Image
                src="/images/blog.jpg"
                alt={blog.title}
                width={300}
                height={200}
                className="object-cover w-full aspect-video rounded-t-md "
            />
            <div className="flex flex-col p-5">
                <h1 className="text-xl font-bold line-clamp-1">{blog.title}</h1>
                <p className="text-muted-foreground text-sm">
                    {blog.content.substring(0, 100)}
                </p>
                <Link href={`/blog/${blog.slug}`}>
                    <Button className="mt-5 font-semibold">
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
