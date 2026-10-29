import { z } from "zod";

import { evidenceTypes } from "@/lib/evidence-types";

export const evidenceSourceSchema = z
  .string()
  .trim()
  .max(2048, "O link deve ter no máximo 2048 caracteres.")
  .url("Informe um link completo e válido.")
  .refine((value) => {
    if (!URL.canParse(value)) return false;
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password
    );
  }, "Use um link HTTP ou HTTPS sem credenciais.");

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

  type: z.preprocess(
    (value) => (value === null ? undefined : value),
    z.enum(evidenceTypes).default("OTHER"),
  ),

  url: z.preprocess((value) => {
    if (value === null || value === undefined || value === "") return undefined;
    return typeof value === "string" ? value.trim() || undefined : value;
  }, evidenceSourceSchema.optional()),

  projectId: z.string().trim().min(1, "Selecione um projeto."),

  skillId: z.preprocess((value) => {
    if (typeof value !== "string") {
      return undefined;
    }

    const trimmed = value.trim();

    return trimmed === "" ? undefined : trimmed;
  }, z.string().optional()),
});
