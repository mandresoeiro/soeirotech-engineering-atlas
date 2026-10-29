import { describe, expect, it } from "vitest";
import { summarizeProjectDocumentation } from "./project-documentation";

describe("resumo da documentação do projeto", () => {
  it("não considera contextos vazios nem links inválidos como documentação preenchida", () => {
    expect(
      summarizeProjectDocumentation(
        [{ context: "Uso explicado" }, { context: "   " }, { context: null }],
        [
          { url: "https://example.com/commit" },
          { url: "javascript:alert(1)" },
          { url: null },
          { url: "https://user:secret@example.com" },
        ],
      ),
    ).toEqual({ contextCount: 1, sourceCount: 1, missingContexts: 2, missingSources: 3 });
  });
  it("representa um projeto novo sem dar uma avaliação de prontidão", () => {
    expect(summarizeProjectDocumentation([], [])).toEqual({
      contextCount: 0,
      sourceCount: 0,
      missingContexts: 0,
      missingSources: 0,
    });
  });
  it("conta fontes além das seis evidências mais recentes", () => {
    const evidences = Array.from({ length: 8 }, () => ({ url: "https://example.com/evidence" }));
    expect(summarizeProjectDocumentation([], evidences).sourceCount).toBe(8);
  });
});
