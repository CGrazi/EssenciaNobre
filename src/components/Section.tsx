import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Tone = "default" | "soft" | "dark";

const tones: Record<Tone, string> = {
  default: "",
  soft: "bg-muted",
  dark: "bg-foreground text-background",
};

export function Section({ id, tone = "default", className, children }: { id?: string; tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-24", tones[tone], className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, align = "center" }: { eyebrow?: string; title?: string; intro?: string; align?: "left" | "center" }) {
  if (!eyebrow && !title && !intro) return null;
  return (
    <div className={cn("mb-12 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>}
      {title && <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>}
      {intro && <p className="mt-4 text-lg opacity-75">{intro}</p>}
    </div>
  );
}
