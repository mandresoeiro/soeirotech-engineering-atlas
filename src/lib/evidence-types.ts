import type { EvidenceType } from "@/generated/prisma/enums";

export const evidenceTypes = [
  "COMMIT",
  "PULL_REQUEST",
  "TEST",
  "ADR",
  "DIAGRAM",
  "SCREENSHOT",
  "RELEASE",
  "DEPLOY",
  "BENCHMARK",
  "OTHER",
] as const;

export const evidenceTypeLabels = {
  COMMIT: "Commit",
  PULL_REQUEST: "Pull request",
  TEST: "Teste",
  ADR: "Decisão de arquitetura",
  DIAGRAM: "Diagrama",
  SCREENSHOT: "Captura de tela",
  RELEASE: "Versão publicada",
  DEPLOY: "Publicação do site ou aplicação",
  BENCHMARK: "Medição de desempenho",
  OTHER: "Outro",
} satisfies Record<EvidenceType, string>;
