"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const projectSkillSchema = z.object({
  skillId: z.string().min(1, "Selecione uma skill."),
  context: z
    .string()
    .trim()
    .min(10, "Descreva em pelo menos 10 caracteres como a skill foi aplicada.")
    .max(1200, "O contexto deve ter no máximo 1200 caracteres."),
});

const contextSchema = z.object({
  context: z
    .string()
    .trim()
    .min(10, "Descreva em pelo menos 10 caracteres como a skill foi aplicada.")
    .max(1200, "O contexto deve ter no máximo 1200 caracteres."),
});

function revalidateProjectSkillPaths(projectId: string, skillId?: string) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}`);
  revalidatePath(`/projects/${projectId}/skills`);
  revalidatePath("/skills");

  if (skillId) {
    revalidatePath(`/skills/${skillId}`);
  }
}

export async function addProjectSkill(
  projectId: string,
  formData: FormData,
) {
  const data = projectSkillSchema.parse({
    skillId: formData.get("skillId"),
    context: formData.get("context"),
  });

  const [project, skill] = await Promise.all([
    prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        id: true,
      },
    }),
    prisma.skill.findUnique({
      where: {
        id: data.skillId,
      },
      select: {
        id: true,
      },
    }),
  ]);

  if (!project || !skill) {
    redirect("/projects");
  }

  await prisma.projectSkill.upsert({
    where: {
      projectId_skillId: {
        projectId,
        skillId: data.skillId,
      },
    },
    update: {
      context: data.context,
    },
    create: {
      projectId,
      skillId: data.skillId,
      context: data.context,
    },
  });

  revalidateProjectSkillPaths(projectId, data.skillId);

  redirect(`/projects/${projectId}/skills`);
}

export async function updateProjectSkillContext(
  projectId: string,
  skillId: string,
  formData: FormData,
) {
  const data = contextSchema.parse({
    context: formData.get("context"),
  });

  await prisma.projectSkill.update({
    where: {
      projectId_skillId: {
        projectId,
        skillId,
      },
    },
    data: {
      context: data.context,
    },
  });

  revalidateProjectSkillPaths(projectId, skillId);

  redirect(`/projects/${projectId}/skills`);
}

export async function removeProjectSkill(
  projectId: string,
  skillId: string,
) {
  await prisma.projectSkill.delete({
    where: {
      projectId_skillId: {
        projectId,
        skillId,
      },
    },
  });

  revalidateProjectSkillPaths(projectId, skillId);

  redirect(`/projects/${projectId}/skills`);
}
