import { z } from "zod";

import { projectStatusValues } from "@/lib/project-status";

export const projectFiltersSchema = z.object({
  q: z.string().trim().max(120).catch(""),
  status: z.enum(["ALL", ...projectStatusValues]).catch("ALL"),
});
