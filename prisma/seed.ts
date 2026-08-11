import { PrismaPg } from "@prisma/adapter-pg";

import {
  DecisionStatus,
  EvidenceType,
  PrismaClient,
  ProjectStatus,
} from "../src/generated/prisma/client";

import { slugify } from "../src/lib/slugify";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL não definida.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const project = await prisma.project.upsert({
    where: {
      slug: "engineering-atlas",
    },

    update: {},

    create: {
      slug: "engineering-atlas",
      name: "SoeiroTech Engineering Atlas",
      description:
        "Plataforma para planejar, documentar e evidenciar evolução prática em Engenharia de Software.",
      status: ProjectStatus.IN_PROGRESS,
    },
  });

  const skillNames = ["TypeScript", "Next.js", "PostgreSQL", "Prisma", "Docker"];

  const skills = await Promise.all(
    skillNames.map((name) =>
      prisma.skill.upsert({
        where: {
          slug: slugify(name),
        },

        update: {
          name,
        },

        create: {
          slug: slugify(name),
          name,
        },
      }),
    ),
  );

  for (const skill of skills) {
    await prisma.projectSkill.upsert({
      where: {
        projectId_skillId: {
          projectId: project.id,
          skillId: skill.id,
        },
      },

      update: {
        context: "Stack inicial do projeto.",
      },

      create: {
        projectId: project.id,
        skillId: skill.id,
        context: "Stack inicial do projeto.",
      },
    });
  }

  const existingEvidence = await prisma.evidence.findFirst({
    where: {
      projectId: project.id,
      title: "Fundação do repositório",
    },
  });

  if (!existingEvidence) {
    await prisma.evidence.create({
      data: {
        title: "Fundação do repositório",
        description: "Estrutura inicial, Docker, Prisma, documentação e qualidade.",
        type: EvidenceType.OTHER,
        projectId: project.id,
      },
    });
  }

  await prisma.architectureDecision.upsert({
    where: {
      code: "ADR-001",
    },

    update: {},

    create: {
      code: "ADR-001",
      title: "Adotar monólito modular",
      context:
        "O projeto precisa evoluir de forma simples sem introduzir complexidade distribuída prematuramente.",
      decision: "Utilizar Next.js com Prisma e PostgreSQL em uma arquitetura de monólito modular.",
      consequences:
        "Menor complexidade operacional e possibilidade de separar serviços futuramente caso exista necessidade real.",
      status: DecisionStatus.ACCEPTED,
      projectId: project.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
