import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  project: { findUnique: vi.fn() },
  projectSkill: { findUnique: vi.fn() },
  evidence: { findUnique: vi.fn(), create: vi.fn(), update: vi.fn() },
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({ prisma: mocks }));
vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));
vi.mock("next/navigation", () => ({
  redirect: (path: string) => {
    throw new Error(`REDIRECT:${path}`);
  },
}));

import { createEvidence } from "./new/actions";
import { updateEvidence } from "./[id]/edit/actions";

function evidenceForm(type: string, url: string) {
  const form = new FormData();
  form.set("title", "Entrega verificável");
  form.set("projectId", "project-1");
  form.set("type", type);
  form.set("url", url);
  return form;
}

beforeEach(() => {
  vi.resetAllMocks();
  mocks.project.findUnique.mockResolvedValue({ id: "project-1" });
  mocks.evidence.findUnique.mockResolvedValue({
    id: "evidence-1",
    projectId: "project-1",
    skillId: null,
  });
  mocks.evidence.create.mockResolvedValue({ id: "evidence-1" });
  mocks.evidence.update.mockResolvedValue({ id: "evidence-1" });
});

describe("persistência da fonte de evidência", () => {
  it("cria a evidência com o tipo e a fonte informados", async () => {
    await expect(createEvidence(evidenceForm("TEST", "https://example.com/test"))).rejects.toThrow(
      "REDIRECT:/evidences/evidence-1",
    );
    expect(mocks.evidence.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        type: "TEST",
        url: "https://example.com/test",
        projectId: "project-1",
      }),
    });
  });

  it("não consulta nem grava uma entrada com protocolo inválido", async () => {
    await expect(createEvidence(evidenceForm("TEST", "javascript:alert(1)"))).rejects.toThrow();
    expect(mocks.project.findUnique).not.toHaveBeenCalled();
    expect(mocks.evidence.create).not.toHaveBeenCalled();
  });

  it("atualiza tipo e fonte sem alterar a associação do projeto", async () => {
    await expect(
      updateEvidence("evidence-1", evidenceForm("DEPLOY", "https://soeirotech.com.br/")),
    ).rejects.toThrow("REDIRECT:/evidences/evidence-1");
    expect(mocks.evidence.update).toHaveBeenCalledWith({
      where: { id: "evidence-1" },
      data: expect.objectContaining({
        type: "DEPLOY",
        url: "https://soeirotech.com.br/",
        projectId: "project-1",
      }),
    });
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/showcase");
  });

  it("remove o link persistido quando o campo é esvaziado", async () => {
    await expect(updateEvidence("evidence-1", evidenceForm("OTHER", "   "))).rejects.toThrow(
      "REDIRECT:/evidences/evidence-1",
    );
    expect(mocks.evidence.update).toHaveBeenCalledWith({
      where: { id: "evidence-1" },
      data: expect.objectContaining({ url: null }),
    });
  });
});
