"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type IconName = "dashboard" | "projects" | "skills" | "evidences" | "showcase" | "health";

const navigationGroups: Array<{
  label: string;
  items: Array<{
    href: string;
    label: string;
    icon: IconName;
  }>;
}> = [
  {
    label: "Visão geral",
    items: [{ href: "/", label: "Dashboard", icon: "dashboard" }],
  },
  {
    label: "Trabalho",
    items: [
      { href: "/projects", label: "Projetos", icon: "projects" },
      { href: "/skills", label: "Skills", icon: "skills" },
      { href: "/evidences", label: "Evidências", icon: "evidences" },
      { href: "/showcase", label: "Showcase", icon: "showcase" },
    ],
  },
  {
    label: "Sistema",
    items: [{ href: "/health", label: "Health", icon: "health" }],
  },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    dashboard: (
      <>
        <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h3A1.5 1.5 0 0 1 10 5.5v3A1.5 1.5 0 0 1 8.5 10h-3A1.5 1.5 0 0 1 4 8.5v-3Z" />
        <path d="M14 5.5A1.5 1.5 0 0 1 15.5 4h3A1.5 1.5 0 0 1 20 5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 14 8.5v-3Z" />
        <path d="M4 15.5A1.5 1.5 0 0 1 5.5 14h3a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-3Z" />
        <path d="M14 15.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3Z" />
      </>
    ),
    projects: (
      <>
        <path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v1H4V7Z" />
        <path d="M4 10h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7Z" />
      </>
    ),
    skills: (
      <>
        <path d="M12 4 5 7.5 12 11l7-3.5L12 4Z" />
        <path d="m5 12.5 7 3.5 7-3.5" />
        <path d="m5 17 7 3.5 7-3.5" />
      </>
    ),
    evidences: (
      <>
        <path d="M7 4h7l4 4v12H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M14 4v5h5" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </>
    ),
    showcase: (
      <>
        <path d="M5 5h14v10H5V5Z" />
        <path d="M8 19h8" />
        <path d="M12 15v4" />
      </>
    ),
    health: (
      <>
        <path d="M12 21s7-4.5 7-11a4 4 0 0 0-7-2.6A4 4 0 0 0 5 10c0 6.5 7 11 7 11Z" />
        <path d="M9 12h2l1-2 2 4 1-2h2" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[72px] shrink-0 border-r border-slate-800/80 bg-slate-950/45 md:block xl:w-64">
      <div className="flex h-full flex-col gap-6 overflow-y-auto px-3 py-6 xl:px-4">
        <Link
          href="/"
          className="hidden items-center gap-3 rounded-xl px-2 py-1.5 font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500 xl:flex"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue-500 font-black text-white shadow-lg shadow-blue-950/30">
            S
          </span>
          <span className="leading-tight">
            SoeiroTech
            <span className="block text-blue-400">Engineering Atlas</span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="grid gap-6">
          {navigationGroups.map((group) => (
            <div key={group.label} className="grid gap-2">
              <p className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500 max-xl:sr-only">
                {group.label}
              </p>

              <div className="grid gap-1">
                {group.items.map((item) => {
                  const isActive = isActiveRoute(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={item.label}
                      title={item.label}
                      className={[
                        "flex min-h-11 items-center justify-center gap-3 rounded-xl px-3 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500 xl:justify-start",
                        isActive
                          ? "bg-blue-500/15 text-blue-200 ring-1 ring-blue-500/30"
                          : "text-slate-400 hover:bg-slate-900/80 hover:text-white",
                      ].join(" ")}
                    >
                      <SidebarIcon name={item.icon} />
                      <span className="hidden xl:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
