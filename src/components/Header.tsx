import { useState } from "react";
import { SmartLink } from "@/components/SmartLink";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={cn("z-40 border-b border-current/10 bg-background/90 backdrop-blur", site.header.sticky && "sticky top-0")}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <SmartLink href="/" className="flex items-center gap-2 font-heading text-lg font-semibold" onClick={close}>
          {site.logo ? <img src={site.logo} alt={site.name} className="h-8 w-auto" /> : site.name}
        </SmartLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {site.navigation.map((item) =>
            item.children && item.children.length > 0 ? (
              <div key={item.label} className="group relative">
                <SmartLink href={item.href} className="rounded-site px-3 py-2 text-[15px] opacity-80 hover:opacity-100">
                  {item.label}
                </SmartLink>
                <div className="invisible absolute left-0 top-full w-72 rounded-site border border-current/10 bg-background p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <SmartLink key={child.href + child.label} href={child.href} className="block rounded-site px-3 py-2 hover:bg-current/5">
                      <span className="block text-[15px] font-medium">{child.label}</span>
                      {child.description && <span className="block text-sm opacity-70">{child.description}</span>}
                    </SmartLink>
                  ))}
                </div>
              </div>
            ) : (
              <SmartLink key={item.label} href={item.href} className="rounded-site px-3 py-2 text-[15px] opacity-80 hover:opacity-100">
                {item.label}
              </SmartLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          {site.header.ctaText && (
            <ButtonLink href={site.header.ctaUrl} className="hidden h-10 px-4 text-sm sm:inline-flex">
              {site.header.ctaText}
            </ButtonLink>
          )}
          <button type="button" className="rounded-site p-2 md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-current/10 px-5 py-4 md:hidden" aria-label="Mobile">
          {site.navigation.map((item) => (
            <div key={item.label}>
              <SmartLink href={item.href} className="block py-2 text-base font-medium" onClick={close}>
                {item.label}
              </SmartLink>
              {item.children?.map((child) => (
                <SmartLink key={child.href + child.label} href={child.href} className="block py-1.5 pl-4 opacity-80" onClick={close}>
                  {child.label}
                </SmartLink>
              ))}
            </div>
          ))}
          {site.header.ctaText && (
            <ButtonLink href={site.header.ctaUrl} className="mt-3 w-full">
              {site.header.ctaText}
            </ButtonLink>
          )}
        </nav>
      )}
    </header>
  );
}
