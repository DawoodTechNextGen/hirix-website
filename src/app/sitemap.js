export const dynamic = "force-static";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function sitemap() {
  // Static pages
  const staticPages = [
    { url: "https://hirix.com.pk", lastModified: new Date() },
    { url: "https://hirix.com.pk/blog", lastModified: new Date() },
    { url: "https://hirix.com.pk/jobs", lastModified: new Date() },
  ];

  // Dynamic blog pages
  try {
    const res = await fetch(`${API_URL}/get-blogs?status=Published&limit=100`);
    const { data: blogs } = await res.json();
    const blogPages = blogs.map((blog) => ({
      url: `https://hirix.com.pk/blog/${blog.slug}`,
      lastModified: new Date(blog.updated_at || blog.created_at || new Date()),
    }));
    return [...staticPages, ...blogPages];
  } catch {
    return staticPages;
  }
}
