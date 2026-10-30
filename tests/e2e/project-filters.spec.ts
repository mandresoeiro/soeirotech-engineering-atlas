import { expect, test } from "@playwright/test";

test.setTimeout(90_000);

test("busca e situação podem ser combinadas e limpas sem alterar os cadastros", async ({
  page,
}) => {
  const prefix = `BuscaAtlas${Date.now()}`;
  for (const [suffix, status] of [
    ["Planejado", "PLANNED"],
    ["Concluído", "COMPLETED"],
  ]) {
    await page.goto("/projects/new");
    await page.getByLabel("Nome", { exact: true }).fill(`${prefix} ${suffix}`);
    await page.getByLabel("Descrição", { exact: true }).fill(`Exemplo de busca ${prefix}`);
    await page.getByLabel("Status", { exact: true }).selectOption(status);
    await page.getByRole("button", { name: "Criar projeto", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: `${prefix} ${suffix}`, exact: true }),
    ).toBeVisible();
  }
  await page.goto("/projects");
  await page.getByLabel("Buscar projetos").fill(prefix.toLowerCase());
  await page.getByRole("button", { name: "Filtrar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: `${prefix} Planejado`, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: `${prefix} Concluído`, exact: true }),
  ).toBeVisible();
  await page.getByLabel("Situação", { exact: true }).selectOption("COMPLETED");
  await page.getByRole("button", { name: "Filtrar", exact: true }).click();
  await expect(page.getByRole("heading", { name: `${prefix} Planejado`, exact: true })).toHaveCount(
    0,
  );
  await expect(
    page.getByRole("heading", { name: `${prefix} Concluído`, exact: true }),
  ).toBeVisible();
  await page.getByLabel("Buscar projetos").fill(`${prefix}Ausente`);
  await page.getByRole("button", { name: "Filtrar", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Nenhum projeto encontrado" })).toBeVisible();
  await page.getByRole("link", { name: "Limpar filtros", exact: true }).click();
  await expect(page.getByLabel("Buscar projetos")).toHaveValue("");
  await expect(page.getByLabel("Situação", { exact: true })).toHaveValue("ALL");
  await expect(
    page.getByRole("heading", { name: `${prefix} Planejado`, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: `${prefix} Concluído`, exact: true }),
  ).toBeVisible();
});
