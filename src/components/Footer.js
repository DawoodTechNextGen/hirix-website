import Link from "next/link";
import { getSiteSettings } from "@/lib/api";

export default async function Footer() {
  const settings = await getSiteSettings();

  let socialLinks = [];
  try {
    socialLinks = settings.social_links ? JSON.parse(settings.social_links) : [];
  } catch (e) {
    console.error("Error parsing social_links:", e);
  }

  const getSocialUrl = (platformName) => {
    if (!Array.isArray(socialLinks)) return null;
    const link = socialLinks.find(
      (l) => l.platform && l.platform.toLowerCase() === platformName.toLowerCase()
    );
    return link ? link.url : null;
  };

  const facebookUrl = getSocialUrl("Facebook");
  const linkedinUrl = getSocialUrl("LinkedIn");
  const twitterUrl = getSocialUrl("Twitter");
  const instagramUrl = getSocialUrl("Instagram");

  return (
    <footer className="hirix-footer mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="Hirix Logo" 
                width={120} 
                height={30} 
                style={{ height: "30px", width: "auto", filter: "brightness(0) invert(1)" }} 
              />
            </div>
            <p className="mb-4">{settings.site_meta_description || settings.site_description || settings.meta_description || settings.seo_description || "Hirix is Pakistan's leading job search and career platform, matching top-tier talent with the country's best companies. Build your future with ease."}</p>
            
            {(settings.site_email || settings.site_phone || settings.footer_address) && (
              <div className="contact-info mb-4 text-white-50 small">
                {settings.site_email && (
                  <div className="mb-1">
                    <a href={`mailto:${settings.site_email}`} className="text-white-50 text-decoration-none">
                      <i className="fa-solid fa-envelope me-2"></i>{settings.site_email}
                    </a>
                  </div>
                )}
                {settings.site_phone && (
                  <div className="mb-1">
                    <a href={`tel:${settings.site_phone}`} className="text-white-50 text-decoration-none">
                      <i className="fa-solid fa-phone me-2"></i>{settings.site_phone}
                    </a>
                  </div>
                )}
                {settings.footer_address && (
                  <div className="mb-0 mt-2 text-white-50">
                    <i className="fa-solid fa-location-dot me-2"></i>{settings.footer_address}
                  </div>
                )}
              </div>
            )}

            <div className="social-links">
              {facebookUrl && (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Hirix on Facebook">
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
              )}
              {twitterUrl && (
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Hirix on Twitter">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
              )}
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Hirix on LinkedIn">
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                </a>
              )}
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Hirix on Instagram">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              )}
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5>For Candidates</h5>
            <ul>
              <li><a href="https://jobs.hirix.com.pk">Browse Jobs</a></li>
              <li><a href="https://jobs.hirix.com.pk">Build CV</a></li>
              <li><a href="https://jobs.hirix.com.pk">Dashboard</a></li>
              <li><a href="https://jobs.hirix.com.pk">Job Alerts</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5>For Employers</h5>
            <ul>
              <li><a href="https://jobs.hirix.com.pk">Post a Job</a></li>
              <li><a href="https://jobs.hirix.com.pk">Browse Candidates</a></li>
              <li><a href="https://jobs.hirix.com.pk">Employer Dashboard</a></li>
              <li><a href="https://jobs.hirix.com.pk">Pricing Plans</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5>Help & Resources</h5>
            <ul>
              <li><Link href="/blog">Career Blog</Link></li>
              <li><Link href="#">Frequently Asked Questions</Link></li>
              <li><Link href="/contact">Support Center</Link></li>
              <li><Link href="#">Terms of Service & Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="row hirix-footer-bottom">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} {settings.site_title || settings.site_name || "Hirix"}. All Rights Reserved.
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="me-3">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
