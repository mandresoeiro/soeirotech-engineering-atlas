import { describe, expect, it } from "vitest";

import { skillSchema } from "./skill";

describe("skillSchema", () => {
  it("aceita uma skill válida", () => {
    const result = skillSchema.safeParse({
      name: "Playwright",
      description: "Testes end-to-end.",
    });

    expect(result.success).toBe(true);
  });

  it("remove espaços do nome", () => {
    const result = skillSchema.parse({
      name: "  Prisma  ",
      description: "",
    });

    expect(result.name).toBe("Prisma");
    expect(result.description).toBeUndefined();
  });

  it("rejeita nome muito curto", () => {
    const result = skillSchema.safeParse({
      name: "A",
      description: "",
    });

    expect(result.success).toBe(false);
  });
});
