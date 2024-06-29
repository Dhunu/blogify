import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
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
        orderBy: [
            {
                noOfComments: "desc",
            },
            {
                noOfLikes: "desc",
            },
            {
                updatedAt: "desc",
            },
        ],
        take: 5,
    });

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
