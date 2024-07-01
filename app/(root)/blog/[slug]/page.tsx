import AboutBlog from "@/components/about-blog";
import BlogFooter, { Comment } from "@/components/blog-footer";
import BlogHeader from "@/components/blog-header";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Blog({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const res = await fetch(`${process.env.DEPLOYMENT_URL}/api/blog/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const data = await res.json();
    const blog = data.data;

    const markdown = blog.content;

    return (
        <div className="flex flex-col gap-5 lg:gap-10 my-5">
            <BlogHeader authorId={blog.userId} title={blog.title} slug={slug} />

            <div className="prose dark:prose-invert mx-auto">
                <AboutBlog
                    blog={blog}
                    author={blog.user.name}
                    authorImage={blog.user.image}
                />
                <MDXRemote source={markdown} />
                <BlogFooter {...blog.comments} />
            </div>
        </div>
    );
}
