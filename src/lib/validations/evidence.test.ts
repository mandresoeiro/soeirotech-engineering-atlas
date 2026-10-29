import { describe, expect, it } from "vitest";

import { evidenceSchema, evidenceSourceSchema } from "./evidence";

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

describe("fontes e tipos de evidência", () => {
  const input = { title: "Entrega do projeto", projectId: "project-id" };

  it("preserva registros antigos sem tipo e fonte", () => {
    const data = evidenceSchema.parse(input);
    expect(data.type).toBe("OTHER");
    expect(data.url).toBeUndefined();
  });

  it("aceita tipo e fonte e remove espaços", () => {
    const data = evidenceSchema.parse({
      ...input,
      type: "COMMIT",
      url: " https://github.com/example/project/commit/123 ",
    });
    expect(data.type).toBe("COMMIT");
    expect(data.url).toBe("https://github.com/example/project/commit/123");
  });

  it("permite remover uma fonte existente", () => {
    expect(evidenceSchema.parse({ ...input, url: "   " }).url).toBeUndefined();
  });

  it("rejeita tipo desconhecido", () => {
    expect(evidenceSchema.safeParse({ ...input, type: "INVENTED" }).success).toBe(false);
  });

  it.each([
    "javascript:alert(1)",
    "data:text/html,test",
    "file:///etc/passwd",
    "/local",
    "não é um link",
    "https://user:secret@example.com",
    "https://example.com/" + "a".repeat(2048),
  ])("rejeita fonte inválida: %s", (url) => {
    expect(evidenceSourceSchema.safeParse(url).success).toBe(false);
  });
});
