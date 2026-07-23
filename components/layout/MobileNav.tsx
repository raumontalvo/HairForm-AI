"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: "⌂",
  },
  {
    label: "Color",
    href: "/color-lab",
    icon: "◉",
  },
  {
    label: "Mentor",
    href: "/ai-mentor",
    icon: "✦",
  },
  {
    label: "Academy",
    href: "/academy",
    icon: "▤",
  },
  {
    label: "Saved",
    href: "/saved",
    icon: "♡",
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0b0b0b]/95 px-2 py-2 backdrop-blur lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {mobileItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-xs transition",
                isActive
                  ? "bg-amber-300/10 font-semibold text-amber-300"
                  : "text-white/45 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}