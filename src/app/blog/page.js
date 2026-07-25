import { getBlogs } from "@/lib/api";
import BlogGrid from "@/components/BlogGrid";

export const metadata = {
  title: "Blog - Hirix Pakistan",
  description: "Read the latest articles on jobs, careers, and recruitment in Pakistan from Hirix.",
};

export default async function BlogPage() {
  const { data: blogs } = await getBlogs(1, 12);

  return (
    <>
      <section className="blog-hero hero-section py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">
            Hirix Career Blog
          </h1>
          <p className="lead text-muted max-width-600 mx-auto">
            Weekly career advice, resume tips, and industrial recruitment insights from top hiring experts in Pakistan.
          </p>
        </div>
      </section>

      <section className="container py-5 my-4">
        {blogs && blogs.length > 0 ? (
          <BlogGrid blogs={blogs} />
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">No published articles found.</p>
          </div>
        )}
      </section>
    </>
  );
}
