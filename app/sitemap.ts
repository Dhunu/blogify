import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: "https://blogify.angelsaikia.com/",
            lastModified: new Date().toISOString(),
        },
    ];
}
