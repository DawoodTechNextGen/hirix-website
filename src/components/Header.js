"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="hirix-header sticky-top bg-white border-b border-gray-100 py-3 shadow-sm z-50">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link href="/" className="d-flex align-items-center text-decoration-none">
          <img src="/logo.png" alt="Hirix Logo" style={{ height: "45px", width: "auto", objectFit: "contain" }} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light p-0 d-none d-lg-block">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-4 items-center list-none p-0 m-0">
            <li>
              <Link href="/" className={`nav-link text-[15px] font-semibold text-gray-800 hover:text-[#126ebb] transition-all ${pathname === '/' ? 'text-[#126ebb]!' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={`nav-link text-[15px] font-semibold text-gray-800 hover:text-[#126ebb] transition-all ${pathname === '/about' ? 'text-[#126ebb]!' : ''}`}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className={`nav-link text-[15px] font-semibold text-gray-800 hover:text-[#126ebb] transition-all ${pathname === '/blog' ? 'text-[#126ebb]!' : ''}`}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`nav-link text-[15px] font-semibold text-gray-800 hover:text-[#126ebb] transition-all ${pathname === '/contact' ? 'text-[#126ebb]!' : ''}`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop CTAs */}
        <div className="d-none d-lg-flex align-items-center gap-2">
          <a href="https://jobs.hirix.com.pk" className="px-4 py-2 border-2 border-[#126ebb] text-[#126ebb] hover:bg-[#126ebb]/5 font-bold rounded-md transition-all text-sm decoration-none">
            Log In
          </a>
          <a href="https://jobs.hirix.com.pk" className="px-4 py-2 bg-[#126ebb] border-2 border-[#126ebb] text-white hover:bg-[#0e5692] hover:border-[#0e5692] font-bold rounded-md transition-all text-sm shadow-sm decoration-none">
            Post a Job
          </a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button 
          className="d-block d-lg-none btn p-1 border-0 focus-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl text-gray-800`}></i>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="d-block d-lg-none bg-white border-t border-gray-100 shadow-lg absolute w-100 left-0 top-100 py-3 z-40 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container d-flex flex-column gap-3">
              <Link 
                href="/" 
                className={`py-2 px-3 rounded-md text-decoration-none font-semibold text-gray-800 hover:bg-gray-50 ${pathname === '/' ? 'text-[#126ebb] bg-blue-50/50' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`py-2 px-3 rounded-md text-decoration-none font-semibold text-gray-800 hover:bg-gray-50 ${pathname === '/about' ? 'text-[#126ebb] bg-blue-50/50' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/blog" 
                className={`py-2 px-3 rounded-md text-decoration-none font-semibold text-gray-800 hover:bg-gray-50 ${pathname === '/blog' ? 'text-[#126ebb] bg-blue-50/50' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className={`py-2 px-3 rounded-md text-decoration-none font-semibold text-gray-800 hover:bg-gray-50 ${pathname === '/contact' ? 'text-[#126ebb] bg-blue-50/50' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              
              <hr className="my-2 border-gray-100" />
              
              <div className="d-flex flex-column gap-2 px-3 pb-2">
                <a href="https://jobs.hirix.com.pk" className="py-2.5 border-2 border-[#126ebb] text-[#126ebb] text-center font-bold rounded-md text-decoration-none" onClick={() => setMenuOpen(false)}>
                  Log In
                </a>
                <a href="https://jobs.hirix.com.pk" className="py-2.5 bg-[#126ebb] border-2 border-[#126ebb] text-white text-center font-bold rounded-md text-decoration-none" onClick={() => setMenuOpen(false)}>
                  Post a Job
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
