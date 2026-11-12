import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading, type Tone } from "@/components/Section";

type Value = string | number | boolean | null | undefined | Value[] | { [key: string]: Value };
type Item = Record<string, Value>;

const TITLE_KEYS = ["title", "name", "label", "question", "client", "day", "group", "text"];
const BODY_KEYS = ["description", "answer", "detail", "excerpt", "quote", "result", "challenge", "meta", "hours", "time", "author", "role", "category", "date"];
const IMAGE_KEYS = ["image", "photo", "leadImage"];

const text = (v: Value) => (typeof v === "string" || typeof v === "number" ? String(v) : "");

function Card({ item }: { item: Item }) {
  const title = TITLE_KEYS.map((k) => text(item[k])).find(Boolean);
  const image = IMAGE_KEYS.map((k) => text(item[k])).find(Boolean);
  const price = text(item.price);
  const url = text(item.url);
  const body = BODY_KEYS.map((k) => text(item[k])).filter((v) => v && v !== title);
  return (
    <article className="overflow-hidden rounded-site border border-current/10">
      {image && <img src={image} alt="" className="aspect-[16/10] w-full object-cover" />}
      <div className="p-6">
        {title && <h3 className="font-heading text-lg font-semibold">{title}</h3>}
        {price && <p className="mt-1 font-semibold text-primary">{price}</p>}
        {body.map((line, i) => (
          <p key={i} className="mt-2 opacity-75">{line}</p>
        ))}
        {url && <ButtonLink href={url} variant="ghost" className="mt-3 h-auto px-0 text-sm text-primary">→</ButtonLink>}
      </div>
    </article>
  );
}

export function GenericSection({ id, tone, eyebrow, title, subtitle, intro, text: body, buttonText, buttonUrl, image, ...rest }: { id?: string; tone?: Tone; eyebrow?: string; title?: string; subtitle?: string; intro?: string; text?: string; buttonText?: string; buttonUrl?: string; image?: string } & Record<string, Value>) {
  const lists = Object.values(rest).filter((v): v is Item[] => Array.isArray(v) && v.some((x) => x && typeof x === "object"));
  return (
    <Section id={id} tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} intro={subtitle || intro} />
      {body && <p className="mx-auto mb-10 max-w-3xl whitespace-pre-line text-center text-lg opacity-80">{body}</p>}
      {image && <img src={image} alt="" className="mx-auto mb-10 w-full max-w-4xl rounded-site object-cover" />}
      {lists.map((list, i) => (
        <div key={i} className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item, j) => (
            <Card key={j} item={item} />
          ))}
        </div>
      ))}
      {buttonText && (
        <div className="text-center">
          <ButtonLink href={buttonUrl}>{buttonText}</ButtonLink>
        </div>
      )}
    </Section>
  );
}
