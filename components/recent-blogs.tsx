"use client";

import { Blog } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function RecentBlogs() {
    const [mounted, setMounted] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const getBlogs = async () => {
            const res = await fetch(`/api/public/get-recent-blogs`, {
                method: "GET",
            });

            const data = await res.json();
            const blogs = data.blogs;

            setBlogs(blogs);
        };

        getBlogs().then(() => setMounted(true));
    }, []);

    if (!mounted)
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-5 lg:gap-10">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
            </div>
        );

    if (mounted && blogs.length === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-5 lg:gap-10">
                <h1>No blogs found</h1>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-5 lg:gap-10">
            {blogs.map((blog: Blog) => (
                <Link
                    href={`/blog/${blog.slug}`}
                    key={blog.id}
                    className="bg-muted shadow-md p-5 rounded-md h-24"
                >
                    <h1 className="text-xl font-bold line-clamp-1">
                        {blog.title}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {new Date(blog.createdAt).toDateString()}
                    </p>
                </Link>
            ))}
        </div>
    );
}
