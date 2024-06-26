import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json(
            {
                success: false,
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const { title, slug, content } = await req.json();

    if (!title || !slug || !content) {
        return NextResponse.json(
            {
                success: false,
                message: "All fields are required",
            },
            {
                status: 400,
            }
        );
    }

    // Save the blog to the database
    const blog = await db.blog.create({
        data: {
            title,
            slug,
            content,
            authorId: userId,
            published: false,
        },
    });

    return NextResponse.json({
        success: true,
        message: "Blog created successfully",
        blog,
    });
}
