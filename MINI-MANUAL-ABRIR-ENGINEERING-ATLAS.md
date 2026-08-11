# 📋 Mini Manual — Abrir o SoeiroTech Engineering Atlas

## 📂[PJ] Projeto

**SoeiroTech Engineering Atlas**

Aplicação principal:

```text
http://localhost:3010
```

---

## 🚀[DEV] Abrir o projeto

### 1. Abra o terminal WSL

Entre na pasta do projeto:

```bash
cd soeirotech-engineering-atlas
```

> Se você já estiver dentro da pasta, pule este comando.

### 2. Inicie o projeto

Execute:

```bash
./abrir-engineering-atlas.sh
```

O script faz automaticamente:

```text
Docker Compose
↓
PostgreSQL
↓
Next.js
↓
aguarda a aplicação
↓
testa /api/health
↓
tenta abrir o navegador
```

---

## 🌍[WEB] Links principais

**Dashboard**

```text
http://localhost:3010/
```

**Projetos**

```text
http://localhost:3010/projects
```

**Skills**

```text
http://localhost:3010/skills
```

**Evidências**

```text
http://localhost:3010/evidences
```

**Showcase**

```text
http://localhost:3010/showcase
```

**Health**

```text
http://localhost:3010/health
```

---

## 🔍[CHECK] Conferir os containers

```bash
docker compose ps
```

---

## 📜[LOG] Se não abrir

Ver os últimos logs:

```bash
docker compose logs --tail=100 web
```

Acompanhar logs em tempo real:

```bash
docker compose logs -f web
```

Para sair dos logs:

```text
Ctrl + C
```

---

## 🧪[TEST] Validação completa

Quando quiser testar a base inteira:

```bash
./validate-engineering-atlas-v3.sh
```

Ele verifica:

```text
Prisma
Next.js Build
TypeScript
Vitest
Docker
Rotas HTTP
PostgreSQL
Health Check
```

---

## ⛔ Parar o projeto

Quando terminar:

```bash
docker compose down
```

---

# 🎯[OBJ] Fluxo rápido

```text
Abrir WSL
↓
cd soeirotech-engineering-atlas
↓
./abrir-engineering-atlas.sh
↓
http://localhost:3010/
```

## ✅ Comando principal

```bash
./abrir-engineering-atlas.sh
```

Esse é o comando principal para retomar o projeto.
