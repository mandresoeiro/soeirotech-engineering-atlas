export type IconName = "dashboard" | "projects" | "skills" | "evidences" | "showcase" | "health";

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
    items: [{ href: "/", label: "Painel", icon: "dashboard" }],
  },
  {
    label: "Trabalho",
    items: [
      { href: "/projects", label: "Projetos", icon: "projects" },
      { href: "/skills", label: "Competências", icon: "skills" },
      { href: "/evidences", label: "Evidências", icon: "evidences" },
      { href: "/showcase", label: "Vitrine", icon: "showcase" },
    ],
  },
  {
    label: "Sistema",
    items: [{ href: "/health", label: "Status do sistema", icon: "health" }],
  },
];
