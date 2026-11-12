import type { ReactNode } from "react";
import { SmartLink } from "@/components/SmartLink";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:opacity-90",
  outline: "border border-current/25 hover:bg-current/5",
  light: "bg-white text-primary hover:opacity-90",
  ghost: "hover:bg-current/5",
};

export function ButtonLink({ href, variant = "primary", className, children }: { href?: string; variant?: Variant; className?: string; children: ReactNode }) {
  return (
    <SmartLink href={href} className={cn("inline-flex h-12 items-center justify-center rounded-site px-6 text-[15px] font-medium transition", variants[variant], className)}>
      {children}
    </SmartLink>
  );
}
