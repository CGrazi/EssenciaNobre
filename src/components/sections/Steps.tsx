import { Section, SectionHeading, type Tone } from "@/components/Section";
import { cn } from "@/lib/utils";

const columns = ["lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4"];

export function Steps({ id, tone, title, intro, layout = "horizontal", items = [] }: { id?: string; tone?: Tone; title?: string; intro?: string; layout?: string; items?: { title?: string; description?: string }[] }) {
  return (
    <Section id={id} tone={tone}>
      <SectionHeading title={title} intro={intro} />
      <ol className={cn("grid gap-8", layout === "vertical" ? "mx-auto max-w-2xl" : cn("sm:grid-cols-2", columns[Math.min(Math.max(items.length, 1), 4) - 1]))}>
        {items.map((item, i) => (
          <li key={i} className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-white">{i + 1}</span>
            <div>
              {item.title && <h3 className="font-heading text-lg font-semibold">{item.title}</h3>}
              {item.description && <p className="mt-1 opacity-75">{item.description}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
