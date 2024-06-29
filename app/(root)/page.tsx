import AllBlogs from "@/components/all-blogs";
import PopularBlogs from "@/components/popular-blogs";
import RecentBlogs from "@/components/recent-blogs";

export default async function Home() {
    const res1 = await fetch(
        `${process.env.DEPLOYMENT_URL}/api/public/get-recent-blogs`,
        {
            method: "GET",
        }
    );

    const data1 = await res1.json();
    const recentBlogs = data1.blogs;

    const res2 = await fetch(
        `${process.env.DEPLOYMENT_URL}/api/public/get-popular-blogs`,
        {
            method: "GET",
        }
    );

    const data2 = await res2.json();
    const popularBlogs = data2.blogs;

    const res3 = await fetch(
        `${process.env.DEPLOYMENT_URL}/api/public/get-all-blogs`,
        {
            method: "GET",
        }
    );

    const data3 = await res3.json();
    const allBlogs = data3.blogs;

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
