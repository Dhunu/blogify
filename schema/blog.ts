import { z } from "zod";

export const CreateBlogSchema = z.object({
    userId: z.string(),
    slug: z.string().min(3).max(100),
    title: z
        .string()
        .min(3, {
            message: "Title must be at least 3 characters",
        })
        .max(100, {
            message: "Title must be at most 100 characters",
        }),
    description: z.string().max(200, {
        message: "Description must be at most 200 characters",
    }),
    content: z.string().min(10, {
        message: "Content must be at least 10 characters",
    }),
});
