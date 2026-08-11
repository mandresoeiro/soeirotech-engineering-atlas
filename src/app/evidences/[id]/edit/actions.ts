"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { evidenceSchema } from "@/lib/validations/evidence";

export async function updateEvidence(
  id: string,
  formData: FormData,
) {
  const data = evidenceSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    projectId: formData.get("projectId"),
    skillId: formData.get("skillId"),
  });

  const existingEvidence = await prisma.evidence.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      projectId: true,
      skillId: true,
    },
  });

  if (!existingEvidence) {
    redirect("/evidences");
  }

  if (data.skillId) {
    const projectSkill = await prisma.projectSkill.findUnique({
      where: {
        projectId_skillId: {
          projectId: data.projectId,
          skillId: data.skillId,
        },
      },
      select: {
        skillId: true,
      },
    });

    if (!projectSkill) {
      redirect(
        `/evidences/${id}/edit?invalidSkill=1`,
      );
    }
  }

  await prisma.evidence.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      description: data.description ?? null,
      projectId: data.projectId,
      skillId: data.skillId ?? null,
    },
  });

  revalidatePath("/");
  revalidatePath("/evidences");
  revalidatePath(`/evidences/${id}`);
  revalidatePath("/projects");
  revalidatePath(`/projects/${existingEvidence.projectId}`);
  revalidatePath(`/projects/${data.projectId}`);
  revalidatePath("/skills");
  revalidatePath("/showcase");

  if (existingEvidence.skillId) {
    revalidatePath(`/skills/${existingEvidence.skillId}`);
  }

  if (data.skillId) {
    revalidatePath(`/skills/${data.skillId}`);
  }

  redirect(`/evidences/${id}`);
}
