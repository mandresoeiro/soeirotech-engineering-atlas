import { evidenceSourceSchema } from "@/lib/validations/evidence";

export function summarizeProjectDocumentation(
  competencies: ReadonlyArray<{ context: string | null }>,
  evidences: ReadonlyArray<{ url: string | null }>,
) {
  const contextCount = competencies.filter((item) => item.context?.trim()).length;
  const sourceCount = evidences.filter(
    (item) => evidenceSourceSchema.safeParse(item.url).success,
  ).length;
  return {
    contextCount,
    sourceCount,
    missingContexts: competencies.length - contextCount,
    missingSources: evidences.length - sourceCount,
  };
}
