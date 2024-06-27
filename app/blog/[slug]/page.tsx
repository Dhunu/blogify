import BlogHeader from "@/components/blog-header";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Blog({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const res = await fetch(
        `${process.env.DEPLOYMENT_URL}/api/get-blog/${slug}`,
        {
            method: "GET",
        }
    );

    const data = await res.json();
    const markdown = data.blog.content;

    return (
        <div className="flex flex-col gap-5 lg:gap-10 my-5">
            <BlogHeader
                authorId={data.blog.authorId}
                title={data.blog.title}
                slug={slug}
            />
            <div className="prose prose-invert mt-10 mx-auto">
                <MDXRemote source={markdown} />
            </div>
        </div>
    );
}
