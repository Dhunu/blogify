import AllBlogs from "@/components/all-blogs";
import PopularBlogs from "@/components/popular-blogs";
import RecentBlogs from "@/components/recent-blogs";

export default async function Home() {
    // Fetch recent blogs
    const recentRes = await fetch(
        `${process.env.DEPLOYMENT_URL}/api/blogs/recent`,
        { method: "GET" }
    );
    const recentData = await recentRes.json();
    const recentBlogs = recentData.blogs;

    // Fetch popular blogs
    const popularRes = await fetch(
        `${process.env.DEPLOYMENT_URL}/api/blogs/top`,
        { method: "GET" }
    );
    const popularData = await popularRes.json();
    const popularBlogs = popularData.blogs;

    // Fetch all blogs
    const allRes = await fetch(`${process.env.DEPLOYMENT_URL}/api/blogs`, {
        method: "GET",
    });

    const allData = await allRes.json();
    const allBlogs = allData.blogs;

    return (
        <main className="mt-10 flex flex-col gap-10">
            {allBlogs.length === 0 ? (
                <h1 className="text-3xl font-bold min-h-[calc(100vh-110px)] flex items-center justify-center">
                    No blogs found
                </h1>
            ) : (
                <>
                    <div className="flex flex-col gap-5">
                        <h1 className="text-3xl font-bold ">Recent Blogs</h1>
                        <RecentBlogs blogs={recentBlogs} />
                    </div>

                    <div className="flex flex-col gap-5">
                        <h1 className="text-3xl font-bold ">Popular Blogs</h1>
                        <PopularBlogs blogs={popularBlogs} />
                    </div>

                    <div className="flex flex-col gap-5">
                        <h1 className="text-3xl font-bold ">All Blogs</h1>
                        <AllBlogs blogs={allBlogs} />
                    </div>
                </>
            )}
        </main>
    );
}
