import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const { blogId, title, slug, content } = await req.json();

    if (!blogId) {
        return NextResponse.json(
            {
                success: false,
                message: "Blog ID is required",
            },
            {
                status: 400,
            }
        );
    }

    try {
        const blog = await db.blog.findUnique({
            where: {
                id: blogId,
            },
        });

        if (!blog) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Blog not found",
                },
                {
                    status: 404,
                }
            );
        }

        const updatedBlog = await db.blog.update({
            where: {
                id: blogId,
            },
            data: {
                title,
                slug,
                content,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Blog updated",
                blog: updatedBlog,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("UPDATE_BLOG::PUT::ERROR", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update blog",
            },
            {
                status: 500,
            }
        );
    }
}
