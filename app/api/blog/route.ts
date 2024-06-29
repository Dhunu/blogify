import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//Create a new blog
export async function POST(req: NextRequest) {
    // Get data from request
    const { title, description, slug, content, userId } = await req.json();

    // Check if all fields are provided
    if (!title || !slug || !content || !userId) {
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

    // Save to database
    const blog = await db.blog.create({
        data: {
            title,
            slug,
            content,
            description,
            userId,
        },
    });

    // Check if blog was created
    if (!blog) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to create blog",
            },
            {
                status: 500,
            }
        );
    }

    // Return success response
    return NextResponse.json(
        {
            success: true,
            message: "Blog created successfully",
            data: blog,
        },
        {
            status: 201,
        }
    );
}
