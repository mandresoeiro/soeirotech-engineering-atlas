import { z } from "zod";

export const skillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(80, "O nome deve ter no máximo 80 caracteres."),

  description: z.preprocess((value) => {
    if (typeof value !== "string") {
      return undefined;
    }

    const trimmed = value.trim();

    return trimmed === "" ? undefined : trimmed;
  }, z.string().max(500, "A descrição deve ter no máximo 500 caracteres.").optional()),
});
