"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      {/* About Hero Section */}
      <section className="about-hero hero-section py-5">
        <div className="container text-center">
          <motion.h1 
            className="about-title display-4 fw-bold mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Empowering Pakistan's Workforce
          </motion.h1>
          <motion.p 
            className="lead text-muted max-width-600 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            We are on a mission to build the most efficient, transparent, and modern hiring ecosystem in Pakistan.
          </motion.p>
        </div>
      </section>

      {/* Main Core Content */}
      <section className="container py-5 my-4">
        <div className="row align-items-center mb-5">
          <motion.div 
            className="col-lg-6 mb-4 mb-lg-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4">Why we started Hirix</h2>
            <p className="text-muted leading-relaxed">
              Traditional job boards in Pakistan are slow and bloated. Candidates apply and rarely hear back, while recruiters get buried in unqualified resumes. Hirix was created as a direct modern competitor to Indeed to address these issues by combining structured screening filters with real-time feedback loop tools.
            </p>
            <p className="text-muted leading-relaxed">
              Our platform offers automated scheduling, real-time messaging, and candidate-to-employer matching algorithms to reduce hiring timelines from weeks to days.
            </p>
          </motion.div>

          <motion.div 
            className="col-lg-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="about-card p-4 rounded border bg-white shadow-sm">
              <h4 className="text-primary mb-3">Our Mission</h4>
              <p className="text-muted small">
                To connect talented professionals in Pakistan with top-tier companies, facilitating career growth through transparent profiles, direct employer contact, and real-time scheduling tools.
              </p>
              <h4 className="text-primary mb-3 mt-4">Our Vision</h4>
              <p className="text-muted small">
                To become Pakistan's most trusted recruitment platform, reducing unemployment and enabling businesses to find the right skill set instantly.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards Grid */}
        <div className="row pt-4">
          {[
            { icon: "fa-shield-alt", title: "Verified Listings", desc: "Spam-free and manually verified job listings from genuine employers." },
            { icon: "fa-bolt", title: "Lightning Fast", desc: "Application pipelines optimized for quick responses and direct connection." },
            { icon: "fa-users", title: "Smart Matching", desc: "Filter candidates by location, experience, and custom screening questions." }
          ].map((val, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <motion.div 
                className="category-card h-100 text-center p-4 bg-white rounded border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
              >
                <div className="category-icon mb-3"><i className={`fa fa-solid ${val.icon}`}></i></div>
                <h5>{val.title}</h5>
                <p className="text-muted small mb-0">{val.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
