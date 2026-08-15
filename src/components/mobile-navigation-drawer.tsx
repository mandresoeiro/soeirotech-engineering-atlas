"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationGroups } from "@/lib/navigation";

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNavigationDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="presentation">
      <button
        type="button"
        aria-label="Fechar navegação"
        className="absolute inset-0 bg-slate-950/75"
        onClick={onClose}
      />

      <aside
        aria-label="Navegação principal"
        className="relative flex h-full w-72 max-w-[calc(100vw-2rem)] flex-col border-r border-slate-800 bg-slate-950 p-4 shadow-2xl"
      >
        <div className="flex min-h-12 items-center justify-between gap-4">
          <div className="font-semibold leading-tight">
            SoeiroTech
            <span className="block text-blue-400">Engineering Atlas</span>
          </div>

          <button
            type="button"
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 outline-none transition hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>

        <nav aria-label="Navegação mobile" className="mt-8 grid gap-6">
          {navigationGroups.map((group) => (
            <div key={group.label} className="grid gap-2">
              <p className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
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
                      className={[
                        "rounded-xl px-3 py-3 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500",
                        isActive
                          ? "bg-blue-500/15 text-blue-200 ring-1 ring-blue-500/30"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white",
                      ].join(" ")}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
}
