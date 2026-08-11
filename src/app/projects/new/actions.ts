"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { projectSchema } from "@/lib/validations/project";

export async function createProject(formData: FormData) {
  const data = projectSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    status: formData.get("status"),
    repository: formData.get("repository"),
    demoUrl: formData.get("demoUrl"),
  });

  const slug = slugify(data.name);

  const existing = await prisma.project.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  if (existing) {
    redirect(`/projects/${existing.id}`);
  }

  const project = await prisma.project.create({
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

  redirect(`/projects/${project.id}`);
}
