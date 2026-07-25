"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogGrid({ blogs }) {
  return (
    <div className="row">
      {blogs.map((blog, idx) => (
        <div className="col-lg-4 col-md-6 mb-4" key={blog.id}>
          <motion.div 
            className="blog-card h-100 bg-white shadow-sm rounded overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            whileHover={{ y: -6, boxShadow: "0 15px 30px rgba(0,0,0,0.08)" }}
          >
            {blog.cover_image && (
              <div className="ratio ratio-16x9">
                <img 
                  src={blog.cover_image} 
                  alt={blog.title} 
                  className="img-fluid object-fit-cover" 
                />
              </div>
            )}
            <div className="p-4">
              <span className={`badge mb-2 bg-primary`}>
                {blog.category || "Career Advice"}
              </span>
              
              <h4 className="mb-3">
                <Link href={`/blog/${blog.slug}`} className="text-dark hover:text-[#126ebb] transition-all font-bold text-decoration-none">
                  {blog.title}
                </Link>
              </h4>
              <p className="text-muted small mb-4">{blog.meta_description}</p>
              
              {blog.tags && (
                <div className="blog-tags mb-3 d-flex flex-wrap gap-1">
                  {blog.tags.split(",").map((tag) => (
                    <span key={tag.trim()} className="badge bg-light text-muted border text-xs">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-muted small d-flex justify-content-between align-items-center mt-auto">
                <span suppressHydrationWarning>
                  {new Date(blog.created_at || blog.updated_at).toLocaleDateString("en-PK", {
                    year: "numeric", month: "short", day: "numeric"
                  })}
                </span>
                <Link href={`/blog/${blog.slug}`} className="text-[#126ebb] font-semibold text-xs hover:underline text-decoration-none">
                  Read Article <i className="fa-solid fa-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
