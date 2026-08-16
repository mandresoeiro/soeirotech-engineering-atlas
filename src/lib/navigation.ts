export type IconName =
  | "dashboard"
  | "projects"
  | "skills"
  | "evidences"
  | "showcase"
  | "health";

export const navigationGroups: Array<{
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
