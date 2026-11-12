import { useState, type FormEvent } from "react";
import { SmartLink } from "@/components/SmartLink";
import { ButtonLink } from "@/components/ui/button";
import { Section, type Tone } from "@/components/Section";
import { site } from "@/content/site";
import { submitLead } from "@/lib/micronuage";
import { cn } from "@/lib/utils";

type Highlight = { value?: string; label?: string };
type Card = { title?: string; description?: string; url?: string };

/** The hero's side form: name, e-mail and phone straight into the Leads inbox. */
function HeroForm({ title, button }: { title?: string; button?: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const field = "h-12 w-full rounded-site border border-current/20 bg-background px-4 text-foreground outline-none focus:border-primary";

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitLead({ name: form.name, email: form.email, phone: form.phone || undefined, source: "hero" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") return <p className="rounded-site border border-current/15 bg-background p-6 text-foreground">{site.ui.sent}</p>;
  return (
    <form onSubmit={submit} className="space-y-3 rounded-site border border-current/10 bg-background p-6 text-foreground shadow-xl">
      {title && <p className="font-heading text-xl font-semibold">{title}</p>}
      <input required className={field} placeholder={site.ui.name} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input required type="email" className={field} placeholder={site.ui.email} autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="tel" className={field} placeholder={site.ui.phone} autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <button type="submit" disabled={status === "sending"} className="h-12 w-full rounded-site bg-primary font-medium text-white hover:opacity-90 disabled:opacity-60">
        {status === "sending" ? site.ui.sending : button || site.ui.send}
      </button>
      {status === "error" && <p className="text-sm text-red-600">{site.ui.error}</p>}
    </form>
  );
}

export type HeroProps = {
  id?: string;
  tone?: Tone;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  buttonSecondaryText?: string;
  buttonSecondaryUrl?: string;
  image?: string;
  alignment?: "left" | "center" | "right";
  variant?: string;
  highlights?: Highlight[];
  note?: string;
  cards?: Card[];
  formTitle?: string;
  formButton?: string;
};

export function Hero({ id, tone, eyebrow, title, subtitle, buttonText, buttonUrl, buttonSecondaryText, buttonSecondaryUrl, image, alignment = "left", variant, highlights = [], note, cards = [], formTitle, formButton }: HeroProps) {
  const withForm = variant === "form";
  const fullBleed = Boolean(image) && variant === "full-bleed";
  const split = !withForm && Boolean(image) && !fullBleed && variant !== "centered" && variant !== "minimal";
  const centered = !split && !withForm && (alignment === "center" || variant === "centered" || !image);

  const copy = (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
      {eyebrow && <p className={cn("mb-4 text-sm font-semibold uppercase tracking-wider", fullBleed ? "text-white/80" : "text-primary")}>{eyebrow}</p>}
      {title && <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>}
      {subtitle && <p className="mt-6 text-lg opacity-80 sm:text-xl">{subtitle}</p>}
      {(buttonText || buttonSecondaryText) && (
        <div className={cn("mt-9 flex flex-col gap-3 sm:flex-row", centered && "sm:justify-center")}>
          {buttonText && <ButtonLink href={buttonUrl} variant={fullBleed ? "light" : "primary"}>{buttonText}</ButtonLink>}
          {buttonSecondaryText && <ButtonLink href={buttonSecondaryUrl} variant="outline">{buttonSecondaryText}</ButtonLink>}
        </div>
      )}
      {note && <p className="mt-4 text-sm opacity-60">{note}</p>}
      {highlights.length > 0 && (
        <dl className={cn("mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3", centered && "mx-auto max-w-xl")}>
          {highlights.map((h, i) => (
            <div key={i}>
              <dt className="font-heading text-2xl font-semibold">{h.value}</dt>
              <dd className="text-sm opacity-70">{h.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );

  const cardGrid =
    cards.length > 0 ? (
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <SmartLink key={i} href={card.url} className="block rounded-site border border-current/10 bg-background/60 p-6 text-left transition hover:border-primary">
            {card.title && <p className="font-heading text-lg font-semibold">{card.title}</p>}
            {card.description && <p className="mt-2 text-sm opacity-75">{card.description}</p>}
          </SmartLink>
        ))}
      </div>
    ) : null;

  if (withForm) {
    return (
      <section id={id} className="relative isolate overflow-hidden">
        {image && (
          <>
            <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-black/55" />
          </>
        )}
        <div className={cn("mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.2fr_1fr]", image && "text-white")}>
          {copy}
          <HeroForm title={formTitle} button={formButton} />
        </div>
      </section>
    );
  }

  if (fullBleed) {
    return (
      <section id={id} className="relative isolate overflow-hidden text-white">
        <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
          {copy}
          {cardGrid}
        </div>
      </section>
    );
  }

  return (
    <Section id={id} tone={tone} className="pt-16 sm:pt-20">
      {split ? (
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {copy}
          <img src={image} alt="" className="aspect-[4/3] w-full rounded-site object-cover shadow-xl" />
        </div>
      ) : (
        copy
      )}
      {cardGrid}
    </Section>
  );
}
