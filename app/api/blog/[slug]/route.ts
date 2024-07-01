import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Get blog by slug
export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    // Get slug from params
    const slug = params.slug;

    // Get blog from database
    const blog = await db.blog.findUnique({
        where: {
            slug,
        },
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                },
            },
            comments: {
                select: {
                    id: true,
                    content: true,
                    user: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                    updatedAt: true,
                },
            },
        },
    });

    // Check if blog exists
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

    // Return blog
    return NextResponse.json(
        {
            success: true,
            data: blog,
        },
        {
            status: 200,
        }
    );
}

// Update blog by slug
export async function PUT(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    // Get slug from params
    const slug = params.slug;

    // Get content and published from request
    const { content, published } = await req.json();

    // Check if content or published is provided
    if (!content && published === undefined) {
        return NextResponse.json(
            {
                success: false,
                message: "No data provided",
            },
            {
                status: 400,
            }
        );
    }

    // Update blog in database
    const blog = await db.blog.update({
        where: {
            slug,
        },
        data: {
            content,
            published,
        },
    });

    // Check if blog was updated
    if (!blog) {
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

    // Return success response
    return NextResponse.json(
        {
            success: true,
            message: "Blog updated successfully",
            data: blog,
        },
        {
            status: 200,
        }
    );
}

// Delete blog by slug
export async function DELETE(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    // Get slug from params
    const slug = params.slug;

    // Delete blog from database
    const blog = await db.blog.delete({
        where: {
            slug,
        },
    });

    // Check if blog was deleted
    if (!blog) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete blog",
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
            message: "Blog deleted successfully",
        },
        {
            status: 200,
        }
    );
}
