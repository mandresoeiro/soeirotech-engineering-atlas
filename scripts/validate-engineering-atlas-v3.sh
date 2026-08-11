#!/usr/bin/env sh
set -eu

echo "=================================================="
echo " SOEIROTECH ENGINEERING ATLAS — VALIDACAO LOCAL"
echo "=================================================="
echo

echo "[1/7] Conferindo schema Prisma necessario para Evidence v1..."

if ! grep -q 'model Evidence' prisma/schema.prisma; then
  echo "ERRO: model Evidence nao encontrado em prisma/schema.prisma"
  exit 1
fi

if ! sed -n '/model Evidence {/,/^}/p' prisma/schema.prisma | grep -q 'projectId'; then
  echo "ERRO: Evidence.projectId nao encontrado."
  exit 1
fi

if ! sed -n '/model Evidence {/,/^}/p' prisma/schema.prisma | grep -q 'skillId'; then
  echo "ERRO: Evidence.skillId nao encontrado."
  exit 1
fi

if ! grep -q 'OTHER' prisma/schema.prisma; then
  echo "ERRO: EvidenceType.OTHER nao encontrado."
  exit 1
fi

echo "OK: schema compativel."
echo

echo "[2/7] Conferindo pastas com espacos acidentais..."

BAD_DIRS="$(find src -type d \( -name ' *' -o -name '* ' \) -print || true)"

if [ -n "$BAD_DIRS" ]; then
  echo "ERRO: pastas invalidas encontradas:"
  echo "$BAD_DIRS"
  exit 1
fi

echo "OK: nenhuma pasta com espaco acidental."
echo

echo "[3/7] Gerando Prisma Client..."
docker compose exec web npx prisma generate
echo

echo "[4/7] Build de producao..."
docker compose exec -e NODE_ENV=production web npm run build
echo

echo "[5/7] Testes Vitest, se houver script test..."

if docker compose exec web node -e 'const p=require("./package.json"); process.exit(p.scripts&&p.scripts.test?0:1)' >/dev/null 2>&1; then
  docker compose exec web npm test -- --run
else
  echo "SKIP: package.json nao possui script test."
fi

echo
echo "[6/7] Reiniciando aplicacao..."
docker compose restart web
echo

echo "Aguardando Next.js ficar pronto..."

READY=0
ATTEMPT=1
MAX_ATTEMPTS=30

while [ "$ATTEMPT" -le "$MAX_ATTEMPTS" ]; do
  STATUS="$(
    docker compose exec -T web sh -lc \
      'wget -S -O /dev/null http://localhost:3000/api/health 2>&1 | awk "/HTTP\// {print \$2; exit}"' \
      2>/dev/null || true
  )"

  if [ "$STATUS" = "200" ]; then
    READY=1
    echo "OK: aplicacao pronta na tentativa $ATTEMPT."
    break
  fi

  printf "."
  sleep 2
  ATTEMPT=$((ATTEMPT + 1))
done

echo

if [ "$READY" -ne 1 ]; then
  echo "ERRO: aplicacao nao ficou pronta em ate 60 segundos."
  echo
  echo "Ultimos logs do web:"
  docker compose logs --tail=120 web || true
  exit 1
fi

echo
echo "[7/7] Smoke test HTTP..."

FAILED=0

for route in / /projects /skills /evidences /showcase /health /api/health; do
  if docker compose exec -T web wget -q -O /dev/null "http://localhost:3000$route"; then
    echo "OK   $route -> HTTP 200"
  else
    echo "FAIL $route -> sem resposta HTTP valida"
    FAILED=1
  fi
done

echo
echo "API HEALTH:"
docker compose exec -T web wget -q -O- http://localhost:3000/api/health || true
echo
echo

if [ "$FAILED" -ne 0 ]; then
  echo "RESULTADO: FALHOU."
  echo
  echo "Ultimos logs do web:"
  docker compose logs --tail=120 web || true
  exit 1
fi

echo "=================================================="
echo " RESULTADO: BUILD + TESTES + ROTAS APROVADOS"
echo "=================================================="
