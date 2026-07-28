"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const primaryUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.hirix.com.pk";
    // Try primary URL first, fallback to localhost if primary returns 404 or fails
    const endpoints = Array.from(new Set([
      `${primaryUrl}/send-contact-email`,
      "http://localhost:9000/send-contact-email"
    ]));

    let success = false;
    let lastError = "";

    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (res.ok) {
            setSubmitted(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setSubmitted(false), 5000);
            success = true;
            break;
          } else {
            lastError = data.msg || `Server returned error (${res.status})`;
          }
        } else {
          lastError = `Endpoint returned non-JSON response (${res.status}). Live backend server update pending.`;
        }
      } catch (error) {
        console.error(`Fetch error on ${endpoint}:`, error);
        lastError = error.message || "Network error while connecting to server.";
      }
    }

    if (!success) {
      setErrorMsg(lastError || "Failed to send message. Please ensure backend server is running.");
    }

    setLoading(false);
  };

  return (
    <>
      <section className="contact-hero hero-section py-5">
        <div className="container text-center">
          <motion.h1 
            className="display-4 fw-bold mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            We'd love to hear from you
          </motion.h1>
          <motion.p 
            className="lead text-muted max-width-600 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Have a query or need assistance? Reach out to the Hirix team.
          </motion.p>
        </div>
      </section>

      <section className="container py-5 my-4">
        <div className="row">
          {/* Details Column */}
          <motion.div 
            className="col-lg-5 mb-5 mb-lg-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4">Get in Touch</h2>
            <p className="text-muted mb-4">
              Whether you are an employer looking to hire or a candidate facing issues with portal profile registration, our local team is here to assist you.
            </p>

            <div className="d-flex align-items-center mb-4">
              <div className="category-icon me-3 flex-shrink-0" style={{ width: '50px', height: '50px', borderRadius: '50%' }}><i className="fa fa-envelope"></i></div>
              <div>
                <h6 className="mb-0 fw-bold">Email Support</h6>
                <a href="mailto:support@hirix.com.pk" className="text-muted small text-decoration-none hover:text-[#126ebb]">support@hirix.com.pk</a>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div className="category-icon me-3 flex-shrink-0" style={{ width: '50px', height: '50px', borderRadius: '50%' }}><i className="fa fa-phone"></i></div>
              <div>
                <h6 className="mb-0 fw-bold">Call Us</h6>
                <span className="text-muted small">03117305346</span>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="category-icon me-3 flex-shrink-0" style={{ width: '50px', height: '50px', borderRadius: '50%' }}><i className="fa fa-map-marker-alt"></i></div>
              <div>
                <h6 className="mb-0 fw-bold">Headquarters</h6>
                <span className="text-muted small">Pakistan</span>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            className="col-lg-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-4 rounded border bg-white shadow-sm">
              <h4 className="mb-4">Send a Message</h4>

              {submitted && (
                <motion.div 
                  className="alert alert-success mb-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <i className="fa-solid fa-check-circle me-2"></i> Thank you! Your message has been sent successfully to <strong>support@hirix.com.pk</strong>. We will get back to you shortly.
                </motion.div>
              )}

              {errorMsg && (
                <motion.div 
                  className="alert alert-danger mb-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <i className="fa-solid fa-triangle-exclamation me-2"></i> {errorMsg}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Ali Ahmed" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="e.g. ali@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required 
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Subject</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="How can we help?" 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold">Message</label>
                  <textarea 
                    className="form-control" 
                    rows="5" 
                    placeholder="Write your message here..." 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                <motion.button 
                  type="submit" 
                  className="btn btn-primary w-100 py-3 fw-bold"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span><i className="fa-solid fa-spinner fa-spin me-2"></i> Sending Message...</span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
