import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import type { NextRequest } from "next/server";

const MAX_BYTES = 512 * 1024;
const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 5000;

function isPrivateIp(ip: string): boolean {
  if (isIP(ip) === 4) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127)
    );
  }
  const v6 = ip.toLowerCase();
  if (v6.startsWith("::ffff:")) return isPrivateIp(v6.slice(7));
  return (
    v6 === "::" ||
    v6 === "::1" ||
    v6.startsWith("fc") ||
    v6.startsWith("fd") ||
    v6.startsWith("fe80")
  );
}

// Blocks requests to internal networks (SSRF protection).
async function assertPublicUrl(url: URL) {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http(s) URLs are allowed");
  }
  const host = url.hostname.replace(/^\[|\]$/g, "");
  const addresses = isIP(host)
    ? [{ address: host }]
    : await lookup(host, { all: true });
  if (addresses.length === 0 || addresses.some((a) => isPrivateIp(a.address))) {
    throw new Error("URL is not allowed");
  }
}

async function fetchHtml(startUrl: URL): Promise<{ html: string; finalUrl: URL }> {
  let current = startUrl;
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    await assertPublicUrl(current);
    const res = await fetch(current, {
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0)",
        accept: "text/html,application/xhtml+xml",
      },
    });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) throw new Error("Bad redirect");
      current = new URL(location, current);
      continue;
    }
    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
    const type = res.headers.get("content-type") ?? "";
    if (!type.includes("html")) throw new Error("Not an HTML page");

    // Read at most MAX_BYTES; OG tags live in <head>.
    const reader = res.body?.getReader();
    if (!reader) throw new Error("Empty body");
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (total < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      total += value.length;
    }
    await reader.cancel().catch(() => {});
    const html = new TextDecoder().decode(Buffer.concat(chunks));
    return { html, finalUrl: current };
  }
  throw new Error("Too many redirects");
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

function parseMeta(html: string): Map<string, string> {
  const meta = new Map<string, string>();
  const head = html.split(/<\/head>/i)[0];
  for (const tag of head.match(/<meta\s[^>]*>/gi) ?? []) {
    const attrs = new Map<string, string>();
    for (const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
      attrs.set(m[1].toLowerCase(), m[2] ?? m[3] ?? "");
    }
    const key = (attrs.get("property") ?? attrs.get("name"))?.toLowerCase();
    const content = attrs.get("content");
    if (key && content && !meta.has(key)) meta.set(key, decodeEntities(content.trim()));
  }
  return meta;
}

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url");
  if (!target) return Response.json({ error: "url is required" }, { status: 400 });

  let url: URL;
  try {
    url = new URL(target);
  } catch {
    return Response.json({ error: "invalid url" }, { status: 400 });
  }

  try {
    const { html, finalUrl } = await fetchHtml(url);
    const meta = parseMeta(html);
    const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];

    let thumbnail: string | null = null;
    const image = meta.get("og:image") ?? meta.get("twitter:image");
    if (image) {
      try {
        const abs = new URL(image, finalUrl);
        if (abs.protocol === "http:" || abs.protocol === "https:") thumbnail = abs.href;
      } catch {}
    }

    return Response.json({
      url: target,
      title:
        meta.get("og:title") ??
        meta.get("twitter:title") ??
        (titleTag ? decodeEntities(titleTag.trim()) : null) ??
        finalUrl.hostname,
      description:
        meta.get("og:description") ??
        meta.get("twitter:description") ??
        meta.get("description") ??
        "",
      thumbnail,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "failed to fetch";
    return Response.json({ error: message }, { status: 422 });
  }
}
