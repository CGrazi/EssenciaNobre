import type { ComponentType } from "react";
import IndexPage from "@/pages/Index";
import PerfumesPage from "@/pages/Perfumes";
import HistoriaPage from "@/pages/Historia";

/** Every page of the site. The menu (src/content/site.ts) links to these paths. */
export const routes: { path: string; name: string; Page: ComponentType }[] = [
  { path: "/", name: "Essência Nobre", Page: IndexPage },
  { path: "/perfumes", name: "Perfumes", Page: PerfumesPage },
  { path: "/historia", name: "Nossa história", Page: HistoriaPage },
];
