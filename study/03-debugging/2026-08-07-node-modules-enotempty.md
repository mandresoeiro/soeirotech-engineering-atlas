# Debugging — `node_modules` com ENOTEMPTY

📋 **Painel de Sinais Organizados (Compacto)**  
🐞[BUG] 🔧[FIX] 🐳[SYSTEM] 📚[STUDY]

## Sintoma

```text
npm error ENOTEMPTY
npm error syscall rmdir
```

## Contexto

O container `web` utilizava volume Docker separado para `node_modules`.

## Aprendizado

```text
node_modules volume
→ pode ser recriado

PostgreSQL pgdata
→ contém dados persistentes
→ não apagar sem decisão explícita
```
