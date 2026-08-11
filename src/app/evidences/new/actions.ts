"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { evidenceSchema } from "@/lib/validations/evidence";

export async function createEvidence(formData: FormData) {
  const data = evidenceSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    projectId: formData.get("projectId"),
    skillId: formData.get("skillId"),
  });

  const project = await prisma.project.findUnique({
    where: {
      id: data.projectId,
    },
    select: {
      id: true,
    },
  });

  if (!project) {
    redirect("/evidences/new?invalidProject=1");
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
        `/evidences/new?projectId=${data.projectId}&invalidSkill=1`,
      );
    }
  }

  const evidence = await prisma.evidence.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      type: "OTHER",
      projectId: data.projectId,
      skillId: data.skillId ?? null,
    },
  });

  revalidatePath("/");
  revalidatePath("/evidences");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.projectId}`);
  revalidatePath("/skills");
  revalidatePath("/showcase");

  if (data.skillId) {
    revalidatePath(`/skills/${data.skillId}`);
  }

  redirect(`/evidences/${evidence.id}`);
}
