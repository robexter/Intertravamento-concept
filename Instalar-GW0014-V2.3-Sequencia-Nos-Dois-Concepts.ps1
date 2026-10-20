# U-39 | GW0014 V2.3 COM SEQUENCIA HISTORICA (SOMENTE A ORDEM)
# Gera dois pacotes para GitHub Pages sem modificar o GitHub automaticamente.
# Execute apos extrair TODO este ZIP no Windows. Requer acesso ao GitHub publico.
$ErrorActionPreference = 'Stop'
$srcJs = Join-Path $PSScriptRoot 'laboratorio-bypass-gw0014-v23-sequencia.js'
$srcPng = Join-Path $PSScriptRoot 'gw0014-referencia.png'
$destino = Join-Path $HOME 'Downloads\Atualizacao-GW0014-V2.3-Sequencia'
$utf8 = New-Object System.Text.UTF8Encoding($false)

foreach ($p in @($srcJs, $srcPng)) {
  if (-not (Test-Path -LiteralPath $p)) {
    throw "Arquivo obrigatorio ausente: $p. Extraia todo o ZIP antes de iniciar."
  }
}

$repos = @(
  @{ Nome='partida-Rampas'; Tipo='rampas'; Cache='partida-u39-concept-v38-gw0014-v23-sequencia' },
  @{ Nome='Intertravamento-concept'; Tipo='intertravamento'; Cache='u39-concept-v050-gw0014-v23-sequencia' }
)
foreach ($r in $repos) {
  $repo = $r.Nome
  $pasta = Join-Path $destino $repo
  New-Item -ItemType Directory -Path $pasta -Force | Out-Null
  $url = "https://raw.githubusercontent.com/robexter/$repo/main"
  $indexPath = Join-Path $pasta 'index.html'
  $swPath = Join-Path $pasta 'service-worker.js'
  Write-Host "Buscando os arquivos atuais de $repo ..." -ForegroundColor Cyan
  Invoke-WebRequest -UseBasicParsing -Uri "$url/index.html" -OutFile $indexPath
  Invoke-WebRequest -UseBasicParsing -Uri "$url/service-worker.js" -OutFile $swPath

  $index = [IO.File]::ReadAllText($indexPath, [Text.Encoding]::UTF8)
  $sw = [IO.File]::ReadAllText($swPath, [Text.Encoding]::UTF8)
  if (-not $index.Contains('</body>')) { throw "BODY nao encontrado: $repo" }
  if (-not $index.Contains('laboratorio-bypass')) {
    throw "Este repositorio nao contem um laboratorio de by-pass para atualizar: $repo"
  }

  # Remover APENAS as chamadas dos antigos laboratorios de by-pass.
  # Os demais scripts, equipamentos, conteudo e quizzes permanecem intactos.
  $oldScriptPattern = '<script[^>]+src=.[^>]*laboratorio-bypass[^>]*\.js[^>]*>\s*</script>'
  $index = [regex]::Replace($index, $oldScriptPattern, '', [Text.RegularExpressions.RegexOptions]::IgnoreCase)
  $novaTag = '<script defer src="./laboratorio-bypass-gw0014-v23-sequencia.js"></script>'
  $index = $index.Replace('</body>', "  $novaTag`n</body>")

  $sw = [regex]::Replace($sw, "const CACHE='[^']+';", "const CACHE='$($r.Cache)';")
  $novos = @('./laboratorio-bypass-gw0014-v23-sequencia.js','./gw0014-referencia.png')
  foreach ($item in $novos) {
    if (-not $sw.Contains($item)) {
      if ($r.Tipo -eq 'rampas') {
        if (-not $sw.Contains('const assets=[')) { throw "Nao encontrei assets no SW: $repo" }
        $sw = $sw.Replace('const assets=[', 'const assets=[' + "'$item',")
      } else {
        if (-not $sw.Contains('const FILES=[')) { throw "Nao encontrei FILES no SW: $repo" }
        $sw = $sw.Replace('const FILES=[', 'const FILES=[' + '"' + $item + '",')
      }
    }
  }

  if (-not $index.Contains($novaTag)) { throw "A inclusao do script falhou: $repo" }
  if ($index.Contains('src="./laboratorio-bypass-gw0014-v22-exclusivo.js"')) {
    throw "O script anterior V2.2 permanece no HTML: $repo"
  }
  [IO.File]::WriteAllText($indexPath, $index, $utf8)
  [IO.File]::WriteAllText($swPath, $sw, $utf8)
  Copy-Item -LiteralPath $srcJs -Destination (Join-Path $pasta 'laboratorio-bypass-gw0014-v23-sequencia.js') -Force
  Copy-Item -LiteralPath $srcPng -Destination (Join-Path $pasta 'gw0014-referencia.png') -Force

  $node = Get-Command node -ErrorAction SilentlyContinue
  if ($node) {
    & node --check (Join-Path $pasta 'laboratorio-bypass-gw0014-v23-sequencia.js')
    if ($LASTEXITCODE -ne 0) { throw "O script JS nao passou na verificacao: $repo" }
  }

  $zipPath = Join-Path $destino "$repo-GW0014-V2.3.zip"
  if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }
  Compress-Archive -Path (Join-Path $pasta '*') -DestinationPath $zipPath
  Write-Host "OK — ${repo}: 4 arquivos em $pasta" -ForegroundColor Green
  Write-Host "ZIP: $zipPath" -ForegroundColor Green
}
Write-Host 'CONCLUIDO. Cada repositorio tem index.html, service-worker.js, JS V2.3 e imagem GW0014.' -ForegroundColor Green
Write-Host "Pasta: $destino"
