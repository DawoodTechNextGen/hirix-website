import { getBlogBySlug, getBlogs } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamicParams = false;

// Generate static params for static export
export async function generateStaticParams() {
  try {
    const { data: blogs } = await getBlogs(1, 100);
    if (!blogs || blogs.length === 0) {
      return [{ slug: "default-post" }];
    }
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for blogs:", error);
    return [{ slug: "default-post" }];
  }
}

// RankMath-like Dynamic generateMetadata
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);
  if (!blog) return { title: "Not Found" };

  return {
    title: blog.seo_title || blog.title,
    description: blog.meta_description || "",
    keywords: blog.tags ? blog.tags.split(",").map((t) => t.trim()) : [],
    alternates: {
      canonical: blog.canonical_url || `https://hirix.com.pk/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.meta_description || "",
      url: `https://hirix.com.pk/blog/${blog.slug}`,
      type: "article",
      images: blog.og_image
        ? [{ url: blog.og_image }]
        : blog.cover_image
        ? [{ url: blog.cover_image }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seo_title || blog.title,
      description: blog.meta_description || "",
      images: blog.og_image || blog.cover_image || [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);
  if (!blog) return notFound();

  let recentBlogs = [];
  try {
    const blogsRes = await getBlogs(1, 6);
    const allBlogs = blogsRes && Array.isArray(blogsRes.data) ? blogsRes.data : [];
    recentBlogs = allBlogs.filter((b) => b.slug !== resolvedParams.slug).slice(0, 5);
  } catch (err) {
    console.error("Error fetching recent blogs:", err);
  }

  return (
    <>
      {/* Blog Article Banner */}
      <section className="hero-section py-5 bg-gradient-to-b from-blue-50 to-white">
        <div className="container text-center">
          {blog.category && (
            <span className="badge bg-primary mb-3 py-2 px-3 rounded-pill text-xs font-semibold uppercase tracking-wider">
              {blog.category}
            </span>
          )}
          <h1 className="display-4 fw-bold mb-3 max-w-4xl mx-auto text-gray-900 leading-tight">
            {blog.title}
          </h1>
          <p className="text-muted small" suppressHydrationWarning>
            Published on {new Date(blog.created_at || blog.updated_at).toLocaleDateString("en-PK", {
              year: "numeric", month: "long", day: "numeric"
            })}
          </p>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <article className="container py-5">
        <div className="row g-4">
          {/* Main Article Content */}
          <div className="col-lg-8">
            {/* Back Button */}
            <div className="mb-4">
              <Link href="/blog" className="text-[#126ebb] font-semibold text-sm hover:underline d-inline-flex align-items-center text-decoration-none">
                <i className="fa-solid fa-arrow-left me-2"></i> Back to Career Blog
              </Link>
            </div>

            {blog.cover_image && (
              <div className="mb-5 rounded overflow-hidden shadow-sm">
                <img 
                  src={blog.cover_image} 
                  alt={blog.title} 
                  className="img-fluid w-100 object-fit-cover" 
                  style={{ maxHeight: "450px" }}
                />
              </div>
            )}

            {/* Render HTML content safely */}
            <div 
              className="blog-content leading-relaxed text-gray-700 text-lg space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {blog.tags && (
              <div className="mt-5 pt-4 border-top">
                <strong>Tags: </strong>
                {blog.tags.split(",").map((tag) => (
                  <span key={tag.trim()} className="badge bg-light text-muted border me-1">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Action Card */}
            <div className="mt-5 p-4 rounded border bg-[#edf5fd]/40 border-blue-100 text-center">
              <h5 className="fw-bold mb-2 text-gray-900">Looking for your next career jump in Pakistan?</h5>
              <p className="text-muted small mb-4">Create your free candidate account on Hirix, upload your ATS resume, and apply to top-tier verified IT and marketing jobs.</p>
              <a href="https://jobs.hirix.com.pk" className="btn btn-primary px-4 py-2.5 font-semibold text-sm shadow-sm">
                Get Started Now <i className="fa-solid fa-arrow-right ms-1"></i>
              </a>
            </div>
          </div>

          {/* Right Sidebar - Recent Articles */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: "100px" }}>
              <div className="card border-0 shadow-sm rounded-3 p-4 bg-light">
                <h4 className="fw-bold mb-4 border-bottom pb-2 text-dark fs-5">
                  Recent Articles
                </h4>
                {recentBlogs.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {recentBlogs.map((recent) => (
                      <div key={recent.id} className="border-bottom pb-3">
                        <span className="badge bg-primary text-white text-xs mb-1">
                          {recent.category || "Career Advice"}
                        </span>
                        <h6 className="mb-1">
                          <Link 
                            href={`/blog/${recent.slug}`} 
                            className="text-dark fw-semibold text-decoration-none hover:text-[#126ebb] transition-all line-clamp-2"
                          >
                            {recent.title}
                          </Link>
                        </h6>
                        <small className="text-muted" suppressHydrationWarning>
                          {new Date(recent.created_at || recent.updated_at).toLocaleDateString("en-PK", {
                            month: "short", day: "numeric", year: "numeric"
                          })}
                        </small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted small">No other recent articles found.</p>
                )}
                
                <div className="mt-4 text-center">
                  <Link href="/blog" className="btn btn-outline-primary btn-sm w-100 font-semibold">
                    View All Articles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
