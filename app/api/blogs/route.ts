import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const skip = parseInt(req.nextUrl.searchParams.get("skip") || "0", 10);
    const take = parseInt(req.nextUrl.searchParams.get("take") || "20", 10);
    const blogs = await db.blog.findMany({
        where: {
            published: true,
        },
        select: {
            title: true,
            slug: true,
            description: true,
            user: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        skip,
        take,
    });

    if (blogs.length === 0) {
        return NextResponse.json(
            {
                success: false,
                message: "No blogs found",
                blogs: [],
            },
            {
                status: 404,
            }
        );
    }

    return NextResponse.json(
        {
            success: true,
            blogs,
        },
        {
            status: 200,
        }
    );
}
