import CreateBlogForm from "@/components/create-blog-form";

export default function CreateBlog() {
    return (
        <div className="w-full max-w-screen-xl mx-auto px-10">
            <CreateBlogForm type="create" />
        </div>
    );
}
