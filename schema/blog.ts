import { z } from "zod";

export const CreateBlogSchema = z.object({
    title: z
        .string()
        .min(3, {
            message: "Title must be at least 3 characters",
        })
        .max(100, {
            message: "Title must be at most 100 characters",
        }),
    slug: z.string().min(3).max(100),
    content: z.string().min(10, {
        message: "Content must be at least 10 characters",
    }),
});
