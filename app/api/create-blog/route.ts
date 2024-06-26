import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
            published: false,
        },
    });

    return NextResponse.json({
        success: true,
        message: "Blog created successfully",
        blog,
    });
}
