import { SmartLink } from "@/components/SmartLink";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Footer() {
  const social = Object.entries(site.social).filter(([, url]) => Boolean(url));
  const centered = site.footer.variant === "centered";
  return (
    <footer className="border-t border-current/10">
      <div className={cn("mx-auto max-w-6xl gap-10 px-5 py-14 sm:px-8", centered ? "flex flex-col items-center text-center" : "grid md:grid-cols-[1.5fr_repeat(3,1fr)]")}>
        <div>
          <p className="font-heading text-lg font-semibold">{site.name}</p>
          {site.footer.tagline && <p className="mt-3 max-w-sm opacity-70">{site.footer.tagline}</p>}
          <div className="mt-4 space-y-1 text-sm opacity-80">
            {site.contact.email && <p><a href={"mailto:" + site.contact.email}>{site.contact.email}</a></p>}
            {site.contact.phone && <p><a href={"tel:" + site.contact.phone.replace(/[^+\d]/g, "")}>{site.contact.phone}</a></p>}
            {site.contact.address && <p>{site.contact.address}</p>}
          </div>
        </div>
        {site.footer.columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm opacity-75">
              {column.links.map((link) => (
                <li key={link.label + link.url}>
                  <SmartLink href={link.url}>{link.label}</SmartLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {site.footer.links.length > 0 && site.footer.columns.length === 0 && (
          <ul className="space-y-2 text-sm opacity-75">
            {site.footer.links.map((link) => (
              <li key={link.label + link.url}>
                <SmartLink href={link.url}>{link.label}</SmartLink>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t border-current/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm opacity-70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>{site.footer.bottomText || "© " + new Date().getFullYear() + " " + site.name}</p>
          {site.footer.showSocial && social.length > 0 && (
            <div className="flex gap-4">
              {social.map(([network, url]) => (
                <a key={network} href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:opacity-100">
                  {network}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
