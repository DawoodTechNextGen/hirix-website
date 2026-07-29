const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSiteSettings() {
  const res = await fetch(`${API_URL}/site-settings`, { next: { revalidate: 3600 } });
  if (!res.ok) return {};
  return res.json();
}

export async function getBlogs(page = 1, limit = 9) {
  const res = await fetch(`${API_URL}/get-blogs?status=Published&page=${page}&limit=${limit}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return { data: [], meta: {} };
  return res.json();
}

export async function getBlogBySlug(slug) {
  const res = await fetch(`${API_URL}/get-blog/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export async function getLatestBlogs() {
  const res = await fetch(`${API_URL}/get-latest`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

export async function getLatestJobs(limit = 10) {
  try {
    const res = await fetch(`${API_URL}/get-latest-jobs?limit=${limit}`, { 
      next: { revalidate: 300 },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!res.ok) {
      console.error(`Get latest jobs failed with status ${res.status}`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error('Error fetching latest jobs:', error);
    return [];
  }
}
