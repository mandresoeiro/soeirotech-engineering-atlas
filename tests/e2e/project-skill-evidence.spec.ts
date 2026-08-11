import { expect, test } from "@playwright/test";

test.setTimeout(90_000);

test("valida o fluxo Project -> Skill -> Contexto -> Evidence", async ({
  page,
}) => {
  const uniqueId = Date.now();
  const projectName = `E2E Project Skill Evidence ${uniqueId}`;
  const skillName = `E2E Skill ${uniqueId}`;
  const context =
    "Skill aplicada no fluxo E2E para validar contexto entre projeto e evidência.";
  const evidenceTitle = `E2E Evidence ${uniqueId}`;
  const evidenceDescription =
    "Evidência criada pelo Playwright para validar a rastreabilidade do fluxo.";

  await page.goto("/projects");

  await page.getByRole("link", { name: "Novo projeto" }).click();
  await page.getByLabel("Nome").fill(projectName);
  await page
    .getByLabel("Descrição")
    .fill("Projeto criado pelo Playwright para validar o fluxo E2E.");
  await page.getByRole("button", { name: "Criar projeto" }).click();

  await expect(
    page.getByRole("heading", { name: projectName }),
  ).toBeVisible();

  const projectUrl = page.url();

  await page.getByRole("link", { name: "Gerenciar skills" }).click();
  await expect(
    page.getByRole("heading", { name: projectName }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Criar nova skill" }).click();
  await page.getByLabel("Nome").fill(skillName);
  await page
    .getByLabel("Descrição")
    .fill("Skill criada pelo Playwright para o fluxo de evidência.");
  await page.getByRole("button", { name: "Criar skill" }).click();

  await expect(
    page.getByRole("heading", { name: skillName }),
  ).toBeVisible();

  await page.goto(`${projectUrl}/skills`);
  await page.getByLabel("Skill").selectOption({ label: skillName });
  await page.getByLabel("Contexto de aplicação").fill(context);
  await page.getByRole("button", { name: "Associar skill" }).click();

  await expect(page.getByText(skillName)).toBeVisible();
  await expect(page.getByText(context)).toBeVisible();

  await page.getByRole("link", { name: /Voltar ao projeto/ }).click();
  await page.getByRole("link", { name: "Nova evidência" }).click();

  await page.getByLabel("Título").fill(evidenceTitle);
  await page.getByLabel("Descrição").fill(evidenceDescription);
  await page.getByLabel("Projeto").selectOption({ label: projectName });
  await page
    .getByLabel(/Skill relacionada/)
    .selectOption({ label: skillName });
  await page.getByRole("button", { name: "Criar evidência" }).click();

  await expect(
    page.getByRole("heading", { name: evidenceTitle }),
  ).toBeVisible();
  await expect(page.getByText(projectName)).toBeVisible();
  await expect(page.getByText(skillName)).toBeVisible();
});
