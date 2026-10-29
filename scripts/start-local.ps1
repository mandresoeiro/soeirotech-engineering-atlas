$ErrorActionPreference = 'Stop'
$atlasRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $atlasRoot
$atlasData = Join-Path $atlasRoot '.local\postgres'
if (-not (Test-Path -LiteralPath $atlasData) -or -not (Test-Path -LiteralPath '.env.local')) {
  throw 'Este atalho usa o banco local configurado nesta máquina. Consulte docs/06-project/uso-local-windows.md.'
}
$pgCtl = 'C:\Program Files\PostgreSQL\17\bin\pg_ctl.exe'
if (-not (Test-Path -LiteralPath $pgCtl)) { throw 'PostgreSQL 17 não encontrado neste computador.' }
& $pgCtl -D $atlasData status
if ($LASTEXITCODE -ne 0) {
  & $pgCtl -D $atlasData -l (Join-Path $atlasRoot '.local\postgres.log') -o '-p 5440 -h 127.0.0.1' -w start
  if ($LASTEXITCODE -ne 0) { throw 'Não foi possível iniciar o banco do Atlas.' }
}
$page = $null
try {
  $page = Invoke-WebRequest 'http://127.0.0.1:3010/projects' -UseBasicParsing -TimeoutSec 15
} catch {
  Write-Verbose ('Painel ainda indisponível: ' + $_.Exception.Message)
}
if ($page) {
  if ($page.Content -notmatch 'SoeiroTech Engineering Atlas') { throw 'A porta 3010 está sendo usada por outro aplicativo.' }
  Write-Host 'O Atlas já está aberto: http://127.0.0.1:3010/projects'
  exit 0
}
Write-Host 'Abra http://127.0.0.1:3010/projects. Mantenha esta janela aberta durante o uso.'
npm run dev -- --hostname 127.0.0.1 --port 3010

if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
