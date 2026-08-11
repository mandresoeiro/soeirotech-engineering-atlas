import { z } from "zod";

export const evidenceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "O título deve ter pelo menos 3 caracteres.")
    .max(120, "O título deve ter no máximo 120 caracteres."),

  description: z.preprocess((value) => {
    if (typeof value !== "string") {
      return undefined;
    }

    const trimmed = value.trim();

    return trimmed === "" ? undefined : trimmed;
  }, z.string().max(1500, "A descrição deve ter no máximo 1500 caracteres.").optional()),

  projectId: z.string().trim().min(1, "Selecione um projeto."),

  skillId: z.preprocess((value) => {
    if (typeof value !== "string") {
      return undefined;
    }

    const trimmed = value.trim();

    return trimmed === "" ? undefined : trimmed;
  }, z.string().optional()),
});
