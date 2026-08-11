"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { skillSchema } from "@/lib/validations/skill";

export async function createSkill(formData: FormData) {
  const data = skillSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  const slug = slugify(data.name);

  const existingSkill = await prisma.skill.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  if (existingSkill) {
    redirect(`/skills/${existingSkill.id}`);
  }

  const skill = await prisma.skill.create({
    data: {
      name: data.name,
      slug,
      description: data.description ?? null,
    },
  });

  revalidatePath("/");
  revalidatePath("/skills");

  redirect(`/skills/${skill.id}`);
}
