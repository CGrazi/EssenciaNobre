import { useState, type FormEvent } from "react";
import { Section, SectionHeading, type Tone } from "@/components/Section";
import { site } from "@/content/site";
import { submitLead } from "@/lib/micronuage";

const input = "h-12 w-full rounded-site border border-current/20 bg-transparent px-4 outline-none focus:border-primary";

export function Contact({ id, tone, title, subtitle, email, phone, buttonText = site.ui.send, namePlaceholder = site.ui.name, emailPlaceholder = site.ui.email, messagePlaceholder = site.ui.message, showPhone, mode, consentText, successText = site.ui.sent }: { id?: string; tone?: Tone; title?: string; subtitle?: string; email?: string; phone?: string; buttonText?: string; namePlaceholder?: string; emailPlaceholder?: string; messagePlaceholder?: string; showPhone?: boolean; showMap?: boolean; mode?: string; consentText?: string; successText?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const withPhone = showPhone || mode === "lead";

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (form.website) return;
    setStatus("sending");
    try {
      await submitLead({ name: form.name, email: form.email, phone: form.phone || undefined, message: form.message, source: mode || "contact", consent: Boolean(consentText) });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id={id} tone={tone}>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading title={title} intro={subtitle} align="left" />
          <div className="space-y-2 opacity-80">
            {email && <p><a href={"mailto:" + email}>{email}</a></p>}
            {phone && <p><a href={"tel:" + phone.replace(/[^+\d]/g, "")}>{phone}</a></p>}
          </div>
        </div>
        {status === "sent" ? (
          <p className="self-center rounded-site border border-current/15 p-6">{successText}</p>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            <input required className={input} placeholder={namePlaceholder} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required type="email" className={input} placeholder={emailPlaceholder} autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {withPhone && <input type="tel" className={input} placeholder={site.ui.phone} autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />}
            <textarea rows={5} className={input + " h-auto py-3"} placeholder={messagePlaceholder} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            {consentText && <p className="text-xs opacity-70">{consentText}</p>}
            <button type="submit" disabled={status === "sending"} className="h-12 w-full rounded-site bg-primary font-medium text-white hover:opacity-90 disabled:opacity-60">
              {status === "sending" ? "..." : buttonText}
            </button>
            {status === "error" && <p className="text-sm text-red-600">{site.ui.error}</p>}
          </form>
        )}
      </div>
    </Section>
  );
}
