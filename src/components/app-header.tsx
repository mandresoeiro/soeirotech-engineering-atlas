"use client";

import { usePathname } from "next/navigation";

function getCurrentSection(pathname: string) {
  if (pathname.startsWith("/projects")) {
    return "Projetos";
  }

  if (pathname.startsWith("/skills")) {
    return "Skills";
  }

  if (pathname.startsWith("/evidences")) {
    return "Evidências";
  }

  if (pathname.startsWith("/showcase")) {
    return "Showcase";
  }

  if (pathname.startsWith("/health")) {
    return "Health";
  }

  return "Dashboard";
}

export function AppHeader() {
  const pathname = usePathname();
  const currentSection = getCurrentSection(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-slate-100">{currentSection}</p>
          <p className="text-xs text-slate-500">SoeiroTech Engineering Atlas</p>
        </div>
      </div>
    </header>
  );
}
