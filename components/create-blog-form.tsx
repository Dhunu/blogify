"use client";

import { Blog } from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateBlogSchema } from "@/schema/blog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { useEffect, useTransition } from "react";
import { Label } from "./ui/label";
import BlogEditor from "./blog-editor";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function CreateBlogForm({
    userId,
    type,
    blog,
}: {
    userId: string;
    type: "create" | "edit";
    blog?: Blog;
}) {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof CreateBlogSchema>>({
        resolver: zodResolver(CreateBlogSchema),
        defaultValues: {
            userId,
            title: blog?.title ?? "",
            description: blog?.description ?? "",
            slug: blog?.slug ?? "",
            content: blog?.content ?? "# Heading \n Content",
        },
    });

    useEffect(() => {
        if (form.watch("content").startsWith("#")) {
            form.setValue(
                "title",
                form.watch("content").split("\n")[0].replace("#", "").trim()
            );
        }
    }, [form.watch("content")]);

    useEffect(() => {
        const desc = form
            .watch("content")
            .split("\n")
            .filter((line) => !line.startsWith("#"))
            .join(" ")
            .substring(0, 100);

        form.setValue("description", desc.replace(/[#*~-]/g, "").trim());
    }, [form.watch("content")]);

    useEffect(() => {
        form.setValue(
            "slug",
            form.getValues("title").toLowerCase().replace(/[ .]/g, "-")
        );
    }, [form.watch("title"), form]);

    const onSubmit = (values: z.infer<typeof CreateBlogSchema>) => {
        startTransition(async () => {
            const res = await fetch("/api/blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            alert(data.message);

            form.reset();
        });
    };
    return (
        <div className="relative">
            <Form {...form}>
                <form
                    className="space-y-8"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="w-full flex justify-between sticky top-0 py-5 bg-background z-40">
                        <Button asChild variant="link" className="pl-0">
                            <Link href="/" className="text-base">
                                <ArrowLeftIcon className="w-6 h-6 mr-2" />
                                Back to Home
                            </Link>
                        </Button>

                        <Button>
                            {isPending ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : type === "create" ? (
                                "Create Blog"
                            ) : (
                                "Update Blog"
                            )}
                        </Button>
                    </div>

                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="pb-10">
                        <BlogEditor
                            content={form.watch("content")}
                            setContent={form.setValue.bind(null, "content")}
                        />
                        <div className="text-sm text-muted-foreground">
                            Always type your heading in the first line of the
                            content with H1
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
