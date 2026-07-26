"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeClient({ latestBlogs, latestJobs, settings }) {
  // State for FAQ Accordion
  const [activeFaq, setActiveFaq] = useState(0);

  const jobsToDisplay = latestJobs || [];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section overflow-hidden">
        <div className="container">
          <motion.span 
            className="hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Pakistan's Premier Hiring Hub
          </motion.span>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {settings?.site_title || (
              <>Find Your <span>Dream Career</span><br />in Pakistan</>
            )}
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {settings?.site_meta_description || settings?.site_description || settings?.meta_description || "Find Jobs, Employment & Career Opportunities. Connect directly with top recruiters and tech companies across Pakistan."}
          </motion.p>

          {/* Quick Action Badges */}
          <motion.div 
            className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mt-4 px-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="https://jobs.hirix.com.pk" className="btn btn-primary btn-lg px-4 py-3 font-semibold rounded-pill shadow-sm d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none w-100 w-sm-auto">
              <i className="fa-solid fa-magnifying-glass"></i> Explore Jobs
            </a>
            <a href="https://jobs.hirix.com.pk" className="btn btn-outline-primary btn-lg px-4 py-3 font-semibold rounded-pill d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none w-100 w-sm-auto">
              <i className="fa-solid fa-file-invoice"></i> Build Resume
            </a>
            <a href="https://jobs.hirix.com.pk" className="btn btn-primary btn-lg px-4 py-3 font-semibold rounded-pill text-white shadow-sm d-inline-flex align-items-center justify-content-center gap-2 border-0 text-decoration-none bg-[#126ebb] hover:bg-[#0e5692] w-100 w-sm-auto">
              <i className="fa-solid fa-user-tie"></i> Post a Job
            </a>
          </motion.div>

          {/* Popular Categories Search Tags */}
          <motion.div 
            className="mt-4 text-muted small d-flex flex-wrap justify-content-center align-items-center gap-2 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="fw-medium me-1">Popular Categories:</span>
            {["MERN Stack", "Laravel", "SEO", "Graphic Design", "Content Writer"].map((tag) => (
              <a 
                key={tag} 
                href={`https://jobs.hirix.com.pk`} 
                className="badge bg-light text-muted border text-decoration-none py-2 px-3 hover:text-[#126ebb] hover:border-[#126ebb] transition-all"
              >
                {tag}
              </a>
            ))}
          </motion.div>

          {/* Counters */}
          <div className="row justify-content-center mt-5">
            {[
              { num: "45,000+", label: "Active Jobs" },
              { num: "12,000+", label: "Employers" },
              { num: "600,000+", label: "Candidates" },
              { num: "92%", label: "Placement Rate" }
            ].map((counter, i) => (
              <motion.div 
                className="col-md-3 col-sm-6 mb-3" 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
              >
                <div className="counter-card">
                  <div className="counter-num">{counter.num}</div>
                  <div className="counter-label">{counter.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2>Explore popular job categories</h2>
          <p className="text-muted">Find opportunities in trending fields and specialized skills in Pakistan</p>
        </div>
        <div className="row">
          {[
            { icon: "fa-code", title: "Software & IT", count: "1,240 open jobs" },
            { icon: "fa-bullhorn", title: "Sales & Marketing", count: "850 open jobs" },
            { icon: "fa-chart-line", title: "Finance & Accounting", count: "430 open jobs" },
            { icon: "fa-user-tie", title: "Human Resources", count: "310 open jobs" }
          ].map((cat, i) => (
            <div className="col-lg-3 col-md-6 mb-4" key={i}>
              <motion.div 
                className="category-card"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="category-icon"><i className={`fa-solid ${cat.icon}`}></i></div>
                <h4>{cat.title}</h4>
                <p className="text-muted mb-0">{cat.count}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED OPPORTUNITIES */}
      <section className="container py-5 bg-white rounded shadow-sm px-4 my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Hand-picked opportunities this week</h2>
            <p className="text-muted mb-0">Top-tier featured openings from top recruiters</p>
          </div>
          <a href="https://jobs.hirix.com.pk" className="btn btn-outline-primary">Browse All Jobs</a>
        </div>

        {jobsToDisplay.length > 0 ? (
          jobsToDisplay.map((job, idx) => {
            const title = job.title || job.job_title || "";
            const company = job.company_name || job.company || "";
            const location = job.location || job.city || job.job_location || "Pakistan";
            const type = job.job_type || job.type || "Full Time";
            
            let salary = "PKR Discuss";
            if (job.salary) {
              salary = job.salary;
            } else if (job.min_salary) {
              salary = `PKR ${job.min_salary.toLocaleString("en-PK")} - ${job.max_salary.toLocaleString("en-PK")} / Month`;
            }
            
            const slug = job.slug || job.id;

            return (
              <motion.div 
                className="job-card" 
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.005, borderColor: "#126ebb" }}
              >
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h4 className="mb-1">
                      <Link href='https://jobs.hirix.com.pk' className="text-decoration-none text-dark hover:text-[#126ebb] transition-all font-bold">
                        {title}
                      </Link>
                    </h4>
                    <div className="mb-2">
                      <span className="text-muted me-3"><i className="fa-regular fa-building me-1"></i> {company}</span>
                      <span className="text-muted"><i className="fa-solid fa-location-dot me-1"></i> {location}</span>
                    </div>
                    <div className="d-flex gap-2">
                      <span className="job-badge job-badge-ft">{type}</span>
                      <span className="job-badge bg-light text-dark">{salary}</span>
                    </div>
                  </div>
                  <div className="col-md-4 text-end mt-3 mt-md-0">
                    <Link href='https://jobs.hirix.com.pk' className="btn btn-primary">Apply Now</Link>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">No featured opportunities found at the moment. Please check back later!</p>
          </div>
        )}
      </section>

      {/* PROCESS SECTION */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2>From application to offer in days, not weeks</h2>
          <p className="text-muted">Fastest and simplest recruiting pipeline in Pakistan</p>
        </div>
        <div className="row">
          {[
            { num: 1, title: "Create Account", desc: "Register your candidate profile in less than a minute." },
            { num: 2, title: "Upload CV/Resume", desc: "Upload your resume to stand out in recruiters' feeds." },
            { num: 3, title: "Apply with 1-Click", desc: "Find matching jobs and apply directly with your saved profile." },
            { num: 4, title: "Get Placed", desc: "Receive interview calls and secure your dream career." }
          ].map((step, i) => (
            <div className="col-md-3 step-card mb-4" key={i}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="step-num">{step.num}</div>
                <h5>{step.title}</h5>
                <p className="text-muted">{step.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* EMPLOYER CTA */}
      <section className="container py-5">
        <motion.div 
          className="cta-banner"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2 className="mb-3">Hire Pakistan's best talent, 10x faster</h2>
              <p className="mb-4">Post job listings, screen candidates with custom screening questions, and schedule automated meeting invites directly from the employer dashboard.</p>
              <div className="row text-white-50">
                <div className="col-md-6 mb-2"><i className="fa fa-check-circle text-primary me-2"></i> Custom candidate screening</div>
                <div className="col-md-6 mb-2"><i className="fa fa-check-circle text-primary me-2"></i> Automated interview scheduling</div>
                <div className="col-md-6 mb-2"><i className="fa fa-check-circle text-primary me-2"></i> Real-time candidate messages</div>
                <div className="col-md-6 mb-2"><i className="fa fa-check-circle text-primary me-2"></i> Featured search prioritization</div>
              </div>
            </div>
            <div className="col-lg-4 text-center mt-4 mt-lg-0">
              <motion.a 
                href="https://jobs.hirix.com.pk" 
                className="btn btn-light btn-lg px-5 py-3 fw-bold text-dark"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Post a Job Now
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* RECENT BLOGS */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2>Learn from the best minds in hiring</h2>
          <p className="text-muted">Weekly career advice, resumes tips, and industrial recruitment insights</p>
        </div>
        {latestBlogs && latestBlogs.length > 0 ? (
          <div className="row">
            {latestBlogs.slice(0, 3).map((blog, idx) => (
              <div className="col-lg-4 col-md-6 mb-4" key={blog.id}>
                <motion.div 
                  className="blog-card h-100 bg-white border rounded"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.08)" }}
                >
                  <div className="p-4">
                    <span className="badge mb-2 bg-primary">{blog.category || 'Career Advice'}</span>
                    <h4 className="mb-3">
                      <Link href={`/blog/${blog.slug}`} className="text-dark hover:text-[#126ebb] transition-all font-bold text-decoration-none">
                        {blog.title}
                      </Link>
                    </h4>
                    <p className="text-muted small mb-4">{blog.meta_description}</p>
                    <div className="text-muted small d-flex justify-content-between align-items-center">
                      <span suppressHydrationWarning>
                        {new Date(blog.created_at || blog.updated_at).toLocaleDateString("en-PK", {
                          year: "numeric", month: "short", day: "numeric"
                        })}
                      </span>
                      <Link href={`/blog/${blog.slug}`} className="text-[#126ebb] font-semibold text-xs hover:underline text-decoration-none">
                        Read <i className="fa-solid fa-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted">No recent articles found.</p>
          </div>
        )}
      </section>

      {/* FAQ ACCORDION */}
      <section className="container py-5 mb-5">
        <h2 className="text-center mb-5">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          {[
            { q: "Is Hirix free for candidates?", a: "Yes, applying to jobs and creating a resume on Hirix is completely free for all job seekers in Pakistan." },
            { q: "How do I post a job as an employer?", a: "Simply click the 'Post a Job' button in the header, sign up for an Employer account, choose your package, and list your vacancy." }
          ].map((faq, i) => (
            <div className="accordion-item" key={i}>
              <h2 className="accordion-header">
                <button 
                  className={`accordion-button ${activeFaq === i ? "" : "collapsed"}`} 
                  type="button" 
                  onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}
                >
                  {faq.q}
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="accordion-collapse show"
                  >
                    <div className="accordion-body">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
