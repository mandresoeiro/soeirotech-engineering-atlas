#!/usr/bin/env sh
set -eu

PROJECT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"

cd "$PROJECT_DIR"

echo "=================================================="
echo " SOEIROTECH ENGINEERING ATLAS"
echo " Inicializacao do ambiente"
echo "=================================================="
echo

echo "[1/4] Subindo containers..."
docker compose up -d

echo
echo "[2/4] Conferindo containers..."
docker compose ps

echo
echo "[3/4] Aguardando aplicacao ficar pronta..."

READY=0
ATTEMPT=1
MAX_ATTEMPTS=30

while [ "$ATTEMPT" -le "$MAX_ATTEMPTS" ]; do
  if docker compose exec -T web wget -q -O /dev/null http://localhost:3000/api/health 2>/dev/null; then
    READY=1
    echo
    echo "OK: aplicacao pronta."
    break
  fi

  printf "."
  sleep 2
  ATTEMPT=$((ATTEMPT + 1))
done

if [ "$READY" -ne 1 ]; then
  echo
  echo "ERRO: a aplicacao nao respondeu em ate 60 segundos."
  echo
  echo "Ultimos logs:"
  docker compose logs --tail=100 web
  exit 1
fi

echo
echo "[4/4] Health check:"
docker compose exec -T web wget -q -O- http://localhost:3000/api/health
echo
echo

echo "=================================================="
echo " ENGINEERING ATLAS PRONTO"
echo "=================================================="
echo
echo "Dashboard : http://localhost:3010/"
echo "Projetos  : http://localhost:3010/projects"
echo "Skills    : http://localhost:3010/skills"
echo "Evidencias: http://localhost:3010/evidences"
echo "Showcase  : http://localhost:3010/showcase"
echo "Health    : http://localhost:3010/health"
echo

# Tenta abrir o navegador automaticamente quando executado no WSL/Windows.
if command -v powershell.exe >/dev/null 2>&1; then
  echo "Abrindo no navegador..."
  powershell.exe -NoProfile -Command "Start-Process 'http://localhost:3010/'" >/dev/null 2>&1 || true
elif command -v cmd.exe >/dev/null 2>&1; then
  echo "Abrindo no navegador..."
  cmd.exe /C start "" "http://localhost:3010/" >/dev/null 2>&1 || true
fi

echo
echo "Para parar o projeto depois:"
echo "  docker compose down"
echo
