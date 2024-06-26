import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const blogId = req.headers.get("blog-id");

    if (!blogId) {
        return NextResponse.json(
            {
                success: false,
                message: "No blog ID provided",
                blog: null,
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
                    message: "No blog found",
                    blog: null,
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Blog found",
                blog,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("GET_BLOG::GET::ERROR", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to get blog",
                blog: null,
            },
            {
                status: 500,
            }
        );
    }
}
