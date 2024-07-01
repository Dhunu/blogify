import CreateBlogForm from "@/components/create-blog-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function CreateBlog() {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }
    return (
        <div className="w-full max-w-screen-xl mx-auto px-10">
            <CreateBlogForm type="create" userId={userId} />
        </div>
    );
}
