export const projectStatusValues = [
  "IDEA",
  "PLANNED",
  "IN_PROGRESS",
  "PAUSED",
  "COMPLETED",
  "ARCHIVED",
] as const;

export const projectStatusLabels: Record<
  (typeof projectStatusValues)[number],
  string
> = {
  IDEA: "Ideia",
  PLANNED: "Planejado",
  IN_PROGRESS: "Em andamento",
  PAUSED: "Pausado",
  COMPLETED: "Concluído",
  ARCHIVED: "Arquivado",
};
