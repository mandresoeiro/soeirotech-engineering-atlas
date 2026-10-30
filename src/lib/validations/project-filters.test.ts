import { describe, expect, it } from "vitest";
import { projectFiltersSchema } from "./project-filters";

describe("filtros de projetos", () => {
  it("lista todos quando não há filtros", () => {
    expect(projectFiltersSchema.parse({})).toEqual({ q: "", status: "ALL" });
  });
  it("combina texto sem espaços excedentes e situação", () => {
    expect(projectFiltersSchema.parse({ q: "  Odonto  ", status: "COMPLETED" })).toEqual({
      q: "Odonto",
      status: "COMPLETED",
    });
  });
  it("ignora situações desconhecidas sem interromper a página", () => {
    expect(projectFiltersSchema.parse({ q: "Atlas", status: "UNKNOWN" })).toEqual({
      q: "Atlas",
      status: "ALL",
    });
  });
  it("não usa parâmetros repetidos ou textos maiores que o limite na consulta", () => {
    expect(projectFiltersSchema.parse({ q: ["a", "b"], status: ["IDEA", "PAUSED"] })).toEqual({
      q: "",
      status: "ALL",
    });
    expect(projectFiltersSchema.parse({ q: "a".repeat(121) }).q).toBe("");
  });
});
