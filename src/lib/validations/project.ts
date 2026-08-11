import { z } from "zod";

import { projectStatusValues } from "@/lib/project-status";

const optionalText = (max: number, message: string) =>
  z.preprocess((value) => {
    if (typeof value !== "string") {
      return undefined;
    }

    const trimmed = value.trim();

    return trimmed === "" ? undefined : trimmed;
  }, z.string().max(max, message).optional());

const optionalUrl = z.preprocess((value) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed === "" ? undefined : trimmed;
}, z.string().url("Informe uma URL válida.").optional());

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(120, "O nome deve ter no máximo 120 caracteres."),

  description: optionalText(
    1200,
    "A descrição deve ter no máximo 1200 caracteres.",
  ),

  status: z.enum(projectStatusValues),

  repository: optionalUrl,
  demoUrl: optionalUrl,
});
