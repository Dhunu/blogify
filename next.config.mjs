import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
                port: "",
                pathname: "/**",
            },
        ],
    },

    // Configure `pageExtensions` to include MDX files
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    // Optionally, add any other Next.js config below
};

export default withMDX(nextConfig);
