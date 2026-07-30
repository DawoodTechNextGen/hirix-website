import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageProgressBar from "@/components/PageProgressBar";
import { getSiteSettings } from "@/lib/api";
import Script from "next/script";

export async function generateMetadata() {
  try {
    const settings = await getSiteSettings();
    return {
      title: settings.seo_title || settings.meta_title || settings.site_title || settings.site_name || "Hirix Job Board - Pakistan's Premier Hiring Hub",
      description: settings.site_meta_description || settings.seo_description || settings.meta_description || settings.site_description || settings.site_desc || "Find Jobs, Employment & Career Opportunities in Pakistan. Connect directly with top recruiters and tech companies across Pakistan.",
      keywords: settings.meta_keywords || settings.seo_keywords || "jobs in pakistan, hiring hub, software jobs lahore, it jobs karachi, recruiter platform",
      robots: "index, follow",
    };
  } catch (error) {
    return {
      title: "Hirix Job Board - Pakistan's Premier Hiring Hub",
      description: "Find Jobs, Employment & Career Opportunities in Pakistan. Connect directly with top recruiters and tech companies across Pakistan.",
      keywords: "jobs in pakistan, hiring hub, software jobs lahore, it jobs karachi, recruiter platform",
      robots: "index, follow",
    };
  }
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Google Search Console Verification */}
        {settings.gsc_verification && (
          <meta name="google-site-verification" content={settings.gsc_verification} />
        )}
        {/* Static GSC fallback - Replace with your actual verification code */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE_HERE" />

        {/* Google Tag Manager - Head Script */}
        {settings.gtm_id && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${settings.gtm_id}');`}
          </Script>
        )}

        {/* Meta Pixel */}
        {settings.pixel_id && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${settings.pixel_id}');
            fbq('track', 'PageView');`}
          </Script>
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        {/* GTM NoScript Fallback */}
        {settings.gtm_id && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${settings.gtm_id}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <Header />
        <PageProgressBar />
        <main id="main-content" className="flex-grow-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
