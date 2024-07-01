import { Blog } from "@prisma/client";
import React from "react";

export default function AboutBlog({
    blog,
    author,
}: {
    blog: Blog;
    author: string;
    authorImage: string;
}) {
    const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const readTime = Math.ceil(blog.content.split(" ").length / 200);
    return (
        <div className="flex gap-2 items-center mb-2">
            <span className="text-sm font-semibold text-muted-foreground">
                {author}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
                •
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
                {date}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
                •
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
                {readTime} min read
            </span>
        </div>
    );
}
