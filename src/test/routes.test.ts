import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { routes } from "@/routes";

describe("site navigation", () => {
  it("links only to pages that exist", () => {
    const paths = new Set(routes.map((r) => r.path));
    const hrefs = site.navigation.flatMap((item) => [item.href, ...(item.children ?? []).map((c) => c.href)]);
    for (const href of hrefs.filter((h) => h.startsWith("/") && !h.startsWith("//"))) {
      expect(paths.has(href.split(/[?#]/)[0] || "/")).toBe(true);
    }
  });

  it("has a page at /", () => {
    expect(routes.some((r) => r.path === "/")).toBe(true);
  });
});
