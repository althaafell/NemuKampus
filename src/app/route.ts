import { landingHtml } from "@/landing/html";

// the home page is plain HTML on the taste-skill kit (see src/landing/html.ts for why)
export function GET(request: Request) {
  return new Response(landingHtml(new URL(request.url).origin), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
