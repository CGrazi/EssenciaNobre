import { SmartLink } from "@/components/SmartLink";
import { Section, SectionHeading, type Tone } from "@/components/Section";
import { cn } from "@/lib/utils";

type Item = { icon?: string; title?: string; description?: string; image?: string; url?: string };

export function Features({ id, tone, eyebrow, title, intro, layout = "grid", linkText, items = [] }: { id?: string; tone?: Tone; eyebrow?: string; title?: string; intro?: string; layout?: string; linkText?: string; items?: Item[] }) {
  const rows = layout === "rows" || layout === "list";
  return (
    <Section id={id} tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
      <div className={cn("grid gap-6", rows ? "mx-auto max-w-3xl" : "sm:grid-cols-2 lg:grid-cols-3")}>
        {items.map((item, i) => (
          <article key={i} className={cn("rounded-site border border-current/10 p-7", rows && "flex gap-6")}>
            {item.image ? (
              <img src={item.image} alt="" className="mb-5 aspect-[16/10] w-full rounded-site object-cover" />
            ) : (
              item.icon && <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-site bg-primary/10 text-primary">{item.icon.slice(0, 2)}</span>
            )}
            <div>
              {item.title && <h3 className="font-heading text-lg font-semibold">{item.title}</h3>}
              {item.description && <p className="mt-2 opacity-75">{item.description}</p>}
              {item.url && (
                <SmartLink href={item.url} className="mt-4 inline-block text-sm font-medium text-primary">
                  {linkText || item.title}
                </SmartLink>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
