import { describe, expect, it } from "vitest";

import { evidenceSchema } from "./evidence";

describe("evidenceSchema", () => {
  it("aceita uma evidência válida", () => {
    const result = evidenceSchema.safeParse({
      title: "Testes E2E do fluxo de projetos",
      description: "Fluxo validado com Playwright.",
      projectId: "project-id",
      skillId: "skill-id",
    });

    expect(result.success).toBe(true);
  });

  it("aceita skill vazia como opcional", () => {
    const result = evidenceSchema.parse({
      title: "Migration inicial",
      description: "",
      projectId: "project-id",
      skillId: "",
    });

    expect(result.skillId).toBeUndefined();
    expect(result.description).toBeUndefined();
  });

  it("rejeita título curto", () => {
    const result = evidenceSchema.safeParse({
      title: "A",
      description: "",
      projectId: "project-id",
      skillId: "",
    });

    expect(result.success).toBe(false);
  });
});
