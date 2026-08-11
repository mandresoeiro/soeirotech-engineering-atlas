"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { skillSchema } from "@/lib/validations/skill";

export async function updateSkill(id: string, formData: FormData) {
  const data = skillSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  const slug = slugify(data.name);

  const duplicate = await prisma.skill.findFirst({
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
    redirect(`/skills/${duplicate.id}`);
  }

  await prisma.skill.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      slug,
      description: data.description ?? null,
    },
  });

  revalidatePath("/");
  revalidatePath("/skills");
  revalidatePath(`/skills/${id}`);

  redirect(`/skills/${id}`);
}
