"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Color Lab",
    href: "/color-lab",
  },
  {
    label: "AI Mentor",
    href: "/ai-mentor",
  },
  {
    label: "Hair Geometry",
    href: "/hair-geometry",
  },
  {
    label: "Academy",
    href: "/academy",
  },
  {
    label: "Saved Work",
    href: "/saved",
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r border-white/10 bg-[#0b0b0b] lg:block">
      <nav className="sticky top-0 w-64 space-y-2 px-4 py-6">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "block rounded-xl px-4 py-3 text-sm font-semibold transition",
                isActive
                  ? "bg-white text-black"
                  : "text-white/55 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}