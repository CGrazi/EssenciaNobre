import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Section, SectionHeading } from "@/components/Section";
import { categories, products } from "@/content/products";
import { site } from "@/content/site";
import { submitLead } from "@/lib/micronuage";
import { cn } from "@/lib/utils";

const input = "h-12 w-full rounded-site border border-current/20 bg-transparent px-4 outline-none focus:border-accent";

export function Catalog() {
  const [params, setParams] = useSearchParams();
  const current = params.get("categoria") ?? "todos";
  const [cart, setCart] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const visible = products.filter((p) => current === "todos" || p.category === current);
  const lines = products.filter((p) => (cart[p.id] ?? 0) > 0).map((p) => ({ product: p, qty: cart[p.id] }));
  const total = lines.reduce((sum, l) => sum + l.qty, 0);

  const change = (id: string, delta: number) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + delta) }));
  const choose = (id: string) => setParams(id === "todos" ? {} : { categoria: id }, { replace: true });

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (form.website || total === 0) return;
    setStatus("sending");
    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        message: form.note || undefined,
        fields: { Pedido: lines.map((l) => l.qty + "x " + l.product.name).join("; ") },
        source: "pedido",
      });
      setStatus("sent");
      setCart({});
    } catch {
      setStatus("error");
    }
  }

  const tabs = [{ id: "todos", label: "Todos" }, ...categories.map((c) => ({ id: c.id as string, label: c.label }))];

  return (
    <Section id="catalogo">
      <SectionHeading eyebrow="Coleção" title="Nossos perfumes" intro="Escolha por família olfativa, monte o seu pedido e envie. Confirmamos disponibilidade e valores com você." />
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Categorias">
        {tabs.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={current === t.id} onClick={() => choose(t.id)} className={cn("h-11 rounded-site border px-5 text-sm font-medium transition", current === t.id ? "border-accent bg-accent text-background" : "border-current/25 hover:border-accent")}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => {
          const label = categories.find((c) => c.id === p.category)?.label;
          const qty = cart[p.id] ?? 0;
          return (
            <article key={p.id} className="flex flex-col rounded-site border border-current/10 p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{label}</p>
              <h3 className="mt-3 font-heading text-3xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm italic opacity-70">{p.notes}</p>
              <p className="mt-4 flex-1 opacity-75">{p.description}</p>
              <p className="mt-4 text-sm opacity-60">Valor confirmado no atendimento</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                {qty === 0 ? (
                  <button type="button" onClick={() => change(p.id, 1)} className="h-11 w-full rounded-site bg-primary px-5 text-sm font-medium text-white hover:opacity-90">Adicionar ao pedido</button>
                ) : (
                  <div className="flex w-full items-center justify-between rounded-site border border-accent px-2">
                    <button type="button" aria-label={"Remover um " + p.name} onClick={() => change(p.id, -1)} className="h-11 w-11 text-xl">−</button>
                    <span aria-live="polite">{qty}</span>
                    <button type="button" aria-label={"Adicionar mais um " + p.name} onClick={() => change(p.id, 1)} className="h-11 w-11 text-xl">+</button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div id="pedido" className="mx-auto mt-16 max-w-2xl scroll-mt-24 rounded-site border border-accent/40 p-7 sm:p-9">
        <h2 className="font-heading text-3xl font-semibold">Seu pedido</h2>
        {status === "sent" ? (
          <p className="mt-4">Pedido enviado. Entraremos em contato para confirmar disponibilidade, valores e entrega. Obrigado!</p>
        ) : (
          <form onSubmit={submit} className="mt-5 space-y-3">
            {lines.length === 0 ? (
              <p className="opacity-70">Nenhum perfume adicionado ainda.</p>
            ) : (
              <ul className="divide-y divide-current/10 border-y border-current/10">
                {lines.map((l) => (
                  <li key={l.product.id} className="flex items-center justify-between py-3">
                    <span>{l.product.name}</span>
                    <span className="opacity-80">{l.qty}×</span>
                  </li>
                ))}
              </ul>
            )}
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            <input required className={input} placeholder={site.ui.name} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required type="email" className={input} placeholder={site.ui.email} autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="tel" className={input} placeholder={site.ui.phone} autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <textarea rows={3} className={input + " h-auto py-3"} placeholder="Observações (endereço de entrega, presente, etc.)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
            <button type="submit" disabled={status === "sending" || total === 0} className="h-12 w-full rounded-site bg-primary font-medium text-white hover:opacity-90 disabled:opacity-50">
              {status === "sending" ? site.ui.sending : "Enviar pedido"}
            </button>
            {status === "error" && <p className="text-sm text-red-500">{site.ui.error}</p>}
          </form>
        )}
      </div>
    </Section>
  );
}
