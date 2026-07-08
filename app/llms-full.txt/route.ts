import { getReleaseData } from "@/lib/release";
import { buildLlmsFullTxt } from "@/lib/llms";

export const revalidate = 3600;

export async function GET() {
  const release = await getReleaseData("en");
  return new Response(buildLlmsFullTxt(release), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
