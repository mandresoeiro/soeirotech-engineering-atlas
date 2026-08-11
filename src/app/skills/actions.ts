"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function deleteSkill(id: string) {
  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          projectLinks: true,
          evidences: true,
        },
      },
    },
  });

  if (!skill) {
    redirect("/skills");
  }

  if (skill._count.projectLinks > 0 || skill._count.evidences > 0) {
    redirect(`/skills/${id}?deleteBlocked=1`);
  }

  await prisma.skill.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  revalidatePath("/skills");

  redirect("/skills");
}
