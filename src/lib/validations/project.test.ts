import { describe, expect, it } from "vitest";

import { projectSchema } from "./project";

describe("projectSchema", () => {
  it("aceita um projeto válido", () => {
    const result = projectSchema.safeParse({
      name: "Engineering Atlas",
      description: "Projeto profissional.",
      status: "IN_PROGRESS",
      repository: "https://github.com/example/repo",
      demoUrl: "",
    });

    expect(result.success).toBe(true);
  });

  it("transforma URLs vazias em undefined", () => {
    const result = projectSchema.parse({
      name: "Engineering Atlas",
      description: "",
      status: "PLANNED",
      repository: "",
      demoUrl: "",
    });

    expect(result.repository).toBeUndefined();
    expect(result.demoUrl).toBeUndefined();
  });
});
