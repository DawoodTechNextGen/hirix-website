const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSiteSettings() {
  try {
    const res = await fetch(`${API_URL}/site-settings`, { next: { revalidate: 3600 } });
    if (!res.ok) return {};
    return res.json();
  } catch (err) {
    console.error("Error fetching site settings:", err);
    return {};
  }
}

export async function getBlogs(page = 1, limit = 9) {
  try {
    const res = await fetch(`${API_URL}/get-blogs?status=Published&page=${page}&limit=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { data: [], meta: {} };
    return res.json();
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return { data: [], meta: {} };
  }
}

export async function getBlogBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/get-blog/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Error fetching blog by slug:", err);
    return null;
  }
}

export async function getLatestBlogs() {
  try {
    const res = await fetch(`${API_URL}/get-latest`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Error fetching latest blogs:", err);
    return [];
  }
}

export async function getLatestJobs(limit = 10) {
  try {
    const res = await fetch(`${API_URL}/get-latest-jobs?limit=${limit}`, { 
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (res.ok) {
      const data = await res.json();
      const jobs = Array.isArray(data) ? data : data.data || [];
      if (jobs.length > 0) return jobs;
    }
  } catch (error) {
    console.error('Error fetching latest jobs:', error);
  }

  // Fallback to /get-posts endpoint if /get-latest-jobs endpoint has backend SQL collation error
  try {
    const fallbackRes = await fetch(`${API_URL}/get-posts?limit=${limit}`, {
      next: { revalidate: 60 }
    });
    if (fallbackRes.ok) {
      const fallbackData = await fallbackRes.json();
      return fallbackData?.data?.jobs || [];
    }
  } catch (err) {
    console.error('Error fetching fallback jobs:', err);
  }

  return [];
}
