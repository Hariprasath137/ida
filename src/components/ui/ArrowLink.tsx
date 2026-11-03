import type { ReactNode } from "react";
import Link from "next/link";

export default function ArrowLink({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const text = tone === "dark" ? "text-charcoal" : "text-ivory";
  const ring =
    tone === "dark" ? "border-charcoal/25" : "border-ivory/30";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 font-sans text-sm ${text} ${className}`}
    >
      <span>{children}</span>
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${ring} transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden
          className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <path d="M2 12 12 2M5 2h7v7" />
        </svg>
      </span>
    </Link>
  );
}