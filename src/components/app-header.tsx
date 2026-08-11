import Link from "next/link";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/projects", label: "Projetos" },
  { href: "/skills", label: "Skills" },
  { href: "/evidences", label: "Evidências" },
  { href: "/showcase", label: "Showcase" },
  { href: "/health", label: "Health" },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid size-9 place-items-center rounded-xl bg-blue-500 font-black text-white shadow-lg shadow-blue-950/30">
            S
          </span>

          <span className="hidden sm:inline">
            SoeiroTech <span className="text-blue-400">Engineering Atlas</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200">
            Menu
          </summary>

          <nav className="absolute right-0 mt-2 grid min-w-48 gap-1 rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-2xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
