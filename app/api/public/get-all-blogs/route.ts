import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const blogs = await db.blog.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!blogs) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No blogs found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Blogs found",
                blogs,
            },
            {
                status: 200,
            }
        );
    } catch (error: string | any) {
        console.error("GET_BLOGS_ERROR", error);
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred" || error,
            },
            {
                status: 500,
            }
        );
    }
}
