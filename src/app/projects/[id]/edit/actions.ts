"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { projectSchema } from "@/lib/validations/project";

export async function updateProject(id: string, formData: FormData) {
  const data = projectSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    status: formData.get("status"),
    repository: formData.get("repository"),
    demoUrl: formData.get("demoUrl"),
  });

  const slug = slugify(data.name);

  const duplicate = await prisma.project.findFirst({
    where: {
      slug,
      NOT: {
        id,
      },
    },
    select: {
      id: true,
    },
  });

  if (duplicate) {
    redirect(`/projects/${duplicate.id}`);
  }

  await prisma.project.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      slug,
      description: data.description ?? null,
      status: data.status,
      repository: data.repository ?? null,
      demoUrl: data.demoUrl ?? null,
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);

  redirect(`/projects/${id}`);
}
