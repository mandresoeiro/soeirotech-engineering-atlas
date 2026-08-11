# Setup rápido

## Primeira execução

```bash
cp .env.example .env
docker compose up --build -d
docker compose exec web npm run db:migrate -- --name init
docker compose exec web npm run db:seed
```

Abra `http://localhost:3010`.

## Se algo falhar

```bash
docker compose ps
docker compose logs -f web
docker compose logs -f db
```

## Portas

- `3010` → Next.js
- `5440` → PostgreSQL no host
- `5432` → PostgreSQL dentro da rede Docker

## Importante

Não altere as portas para `3000`, `3001`, `3002`, `5432`, `5433` ou `5436` sem verificar os
containers já existentes no computador.
