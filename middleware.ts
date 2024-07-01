import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

const isApiRoute = createRouteMatcher(["/api(.*)"]);

export default clerkMiddleware((auth, req) => {
    if (isApiRoute(req)) return;
    if (!isPublicRoute(req)) auth().protect();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
