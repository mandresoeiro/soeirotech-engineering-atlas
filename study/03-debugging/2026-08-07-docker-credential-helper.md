# Debugging — Docker Credential Helper no WSL

📋 **Painel de Sinais Organizados (Compacto)**  
🐞[BUG] 🔧[FIX] 🐳[SYSTEM] 📚[STUDY]

## Sintoma

```text
error getting credentials - err: exit status 1
```

## Diagnóstico

Um `DOCKER_CONFIG` temporário sem credential helper conseguiu executar:

```bash
docker pull node:24-alpine
```

Isso isolou o problema na configuração de credenciais do Docker do usuário.

## Aprendizado

Investigar por camadas:

```text
Docker CLI
→ credenciais
→ registry
→ imagem
→ build
→ container
→ aplicação
```
