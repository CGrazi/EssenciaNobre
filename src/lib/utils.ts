/** Joins class names, skipping the falsy ones. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Links a visitor can follow safely: pages, anchors, https, e-mail and phone. Anything else goes nowhere. */
export function safeHref(href: string | undefined): string {
  const value = (href ?? "").trim();
  if (!value) return "#";
  if (value.startsWith("/") || value.startsWith("#") || value.startsWith("?")) return value;
  if (/^(https?:|mailto:|tel:)/i.test(value)) return value;
  return "#";
}

/** Internal page links go through the router; everything else is a normal link. */
export function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

/** "Texto; outro texto" or a list, as a clean list. */
export function toList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v)).filter((v) => v.trim() !== "");
  if (typeof value === "string") return value.split(/\n|;/).map((v) => v.trim()).filter(Boolean);
  return [];
}
