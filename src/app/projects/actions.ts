"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function archiveProject(id: string) {
  await prisma.project.update({
    where: {
      id,
    },
    data: {
      status: "ARCHIVED",
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);

  redirect("/projects");
}
