import { getReleaseData } from "@/lib/release";
import { buildLlmsTxt } from "@/lib/llms";

// Statically rendered, revalidated hourly — same cadence as the pages, so the
// version and download URLs in llms.txt always match what the site shows.
export const revalidate = 3600;

export async function GET() {
  const release = await getReleaseData("en");
  return new Response(buildLlmsTxt(release), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
