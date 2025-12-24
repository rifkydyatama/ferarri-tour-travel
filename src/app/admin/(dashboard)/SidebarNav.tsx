"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardPlus,
  FileText,
  LayoutDashboard,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

type IconKey = "dashboard" | "booking" | "content" | "finance" | "users";

export type SidebarSection = {
  title: string;
  items: Array<{ href: string; label: string; icon: IconKey }>;
};

const ICONS: Record<IconKey, LucideIcon> = {
  dashboard: LayoutDashboard,
  booking: ClipboardPlus,
  content: FileText,
  finance: Wallet,
  users: Users,
};

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function SidebarNav({ sections }: { sections: SidebarSection[] }) {
  const pathname = usePathname() ?? "";

  return (
    <nav className="mt-6 grid gap-5">
      {sections.map((section) => (
        <div key={section.title} className="grid gap-1">
          <div className="px-3 text-[11px] font-bold tracking-widest text-zinc-500">
            {section.title}
          </div>
          <div className="grid gap-1">
            {section.items.map((item) => {
              const Icon = ICONS[item.icon];
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
                    "text-zinc-400 hover:bg-white/5 hover:text-white",
                    active &&
                      "bg-white/5 text-white ring-1 ring-white/10 before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-r before:bg-ferrari",
                  )}
                >
                  <Icon
                    className={cx(
                      "h-4 w-4 transition",
                      active ? "text-white" : "text-zinc-400 group-hover:text-white",
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
