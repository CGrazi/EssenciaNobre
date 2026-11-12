import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { isInternal, safeHref } from "@/lib/utils";

export function SmartLink({ href, className, children, onClick }: { href?: string; className?: string; children: ReactNode; onClick?: () => void }) {
  const target = safeHref(href);
  if (isInternal(target)) {
    return (
      <Link to={target} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  const external = /^https?:/i.test(target);
  return (
    <a href={target} className={className} onClick={onClick} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}
