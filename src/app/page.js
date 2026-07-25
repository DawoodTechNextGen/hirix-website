import { getBlogs, getLatestJobs, getSiteSettings } from "@/lib/api";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  let latestBlogs = [];
  let latestJobs = [];
  let settings = {};
  try {
    const blogsRes = await getBlogs(1, 3);
    latestBlogs = blogsRes && Array.isArray(blogsRes.data) ? blogsRes.data : [];
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
  }

  try {
    const jobsRes = await getLatestJobs();
    latestJobs = Array.isArray(jobsRes) ? jobsRes : (jobsRes && Array.isArray(jobsRes.data) ? jobsRes.data : []);
  } catch (error) {
    console.error("Error fetching latest jobs:", error);
  }

  try {
    settings = await getSiteSettings();
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }

  return <HomeClient latestBlogs={latestBlogs} latestJobs={latestJobs} settings={settings} />;
}
