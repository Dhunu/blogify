import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const slug = params.slug;

        console.log("GET_BLOG::GET::REQUEST", slug);

        if (!slug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No blog slug provided",
                    blog: null,
                },
                {
                    status: 400,
                }
            );
        }

        const blog = await db.blog.findUnique({
            where: {
                slug,
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
