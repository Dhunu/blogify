"use client";

import { Blog } from "@prisma/client";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import BlogCard from "./blog-card";

export default function RecentBlogs({ blogs }: { blogs: Blog[] }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted)
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5 lg:gap-10">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
            </div>
        );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   gap-5 lg:gap-10">
            {blogs.map((blog: Blog) => (
                <BlogCard key={blog.id} {...blog} />
            ))}
        </div>
    );
}
