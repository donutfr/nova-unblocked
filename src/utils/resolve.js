export const SEARCH_DEFAULT = import.meta.env.VITE_SEARCH_URL || "https://duckduckgo.com/?q=%s";
/** URL if input looks like one, otherwise a search URL built from the template (must contain %s). */
export function resolve(input, template = SEARCH_DEFAULT) {
  const v = input.trim();
  if (!v) throw new Error("Enter a URL or search term.");
  try { const u = new URL(v); if (/^https?:$/.test(u.protocol)) return u.toString(); } catch {}
  if (!/\s/.test(v)) { try { const u = new URL("https://" + v); if (u.hostname.includes(".")) return u.toString(); } catch {} }
  if (!template.includes("%s")) throw new Error("Search template must contain %s.");
  return template.replace("%s", encodeURIComponent(v));
}
