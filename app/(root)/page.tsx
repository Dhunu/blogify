import AllBlogs from "@/components/all-blogs";
import PopularBlogs from "@/components/popular-blogs";
import RecentBlogs from "@/components/recent-blogs";

export default function Home() {
    return (
        <main className="mt-10 flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold ">Recent Blogs</h1>
                <RecentBlogs />
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold ">Popular Blogs</h1>
                <PopularBlogs />
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold ">All Blogs</h1>
                <AllBlogs />
            </div>
        </main>
    );
}
