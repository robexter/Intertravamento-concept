# U-39 — Corrigir integracao e cache da V2.3 nos dois Concepts
# Apenas prepara os arquivos corrigidos para upload manual. Nao faz commit no GitHub.
# Baixa index.html e service-worker.js atuais das branches main.
$ErrorActionPreference = 'Stop'
$destino = Join-Path $HOME 'Downloads\Correcao-Integracao-GW0014-V2.3'
$utf8 = New-Object System.Text.UTF8Encoding($false)
$novaTag = '<script defer src="./laboratorio-bypass-gw0014-v23-sequencia.js"></script>'
$novoJS = './laboratorio-bypass-gw0014-v23-sequencia.js'
$imagem = './gw0014-referencia.png'
$repos = @(
  @{ Nome='Intertravamento-concept'; Cache='u39-concept-v051-gw0014-v23-integracao' },
  @{ Nome='partida-Rampas'; Cache='partida-u39-concept-v39-gw0014-v23-integracao' }
)
foreach ($r in $repos) {
  $repo = $r.Nome
  $pasta = Join-Path $destino $repo
  New-Item -ItemType Directory -Path $pasta -Force | Out-Null
  $base = "https://raw.githubusercontent.com/robexter/$repo/main"
  $indexPath = Join-Path $pasta 'index.html'
  $swPath = Join-Path $pasta 'service-worker.js'
  Write-Host "Verificando $repo ..." -ForegroundColor Cyan
  # Confirma os dois arquivos que ja precisam existir no GitHub.
  $rJs = Invoke-WebRequest -UseBasicParsing -Uri "$base/laboratorio-bypass-gw0014-v23-sequencia.js"
  $rImg = Invoke-WebRequest -UseBasicParsing -Uri "$base/gw0014-referencia.png"
  if ($rJs.StatusCode -ne 200 -or $rImg.StatusCode -ne 200) {
    throw "Arquivo V2.3 ou imagem GW0014 indisponivel no GitHub: $repo"
  }
  Invoke-WebRequest -UseBasicParsing -Uri "$base/index.html" -OutFile $indexPath
  Invoke-WebRequest -UseBasicParsing -Uri "$base/service-worker.js" -OutFile $swPath
  $index = [IO.File]::ReadAllText($indexPath, [Text.Encoding]::UTF8)
  $sw = [IO.File]::ReadAllText($swPath, [Text.Encoding]::UTF8)

  if (-not $index.Contains($novaTag)) {
    throw "O index.html ainda nao chama a V2.3 em $repo. Nao aplicar esta correcao parcial."
  }
  # Remove somente os dois scripts antigos do laboratorio, mantendo os modulos independentes.
  $old = @(
    '<script defer src="./laboratorio-bypass-v045.js"></script>',
    '<script defer src="./laboratorio-bypass-v3-2.js"></script>',
    '<script defer src="./laboratorio-bypass-gw0014-v1.js"></script>'
  )
  foreach ($oldTag in $old) { $index = $index.Replace($oldTag, '') }
  # Reduz risco de duplicidade se a tag foi incluida mais de uma vez.
  if (([regex]::Matches($index, [regex]::Escape($novaTag))).Count -ne 1) {
    throw "V2.3 nao aparece exatamente uma vez no HTML: $repo"
  }

  # Corrige o pre-cache da V2.3: a lista atual ainda inclui a V1.
  $sw = $sw.Replace('./laboratorio-bypass-gw0014-v1.js', $novoJS)
  $sw = [regex]::Replace($sw, "const CACHE='[^']+';", "const CACHE='$($r.Cache)';")
  if (-not $sw.Contains($novoJS)) { throw "Novo laboratorio nao entrou no cache: $repo" }
  if (-not $sw.Contains($imagem)) {
    if ($repo -eq 'partida-Rampas') {
      if (-not $sw.Contains('const assets=[')) { throw "Lista assets nao localizada: $repo" }
      $sw = $sw.Replace('const assets=[', "const assets=['$imagem',")
    } else {
      if (-not $sw.Contains('const FILES=[')) { throw "Lista FILES nao localizada: $repo" }
      $sw = $sw.Replace('const FILES=[', 'const FILES=["' + $imagem + '",')
    }
  }
  # Os caches sao compartilhados por todos os PWAs do dominio robexter.github.io.
  # Evita que Intertravamento Concept apague o cache do Rampas / Partida.
  if ($repo -eq 'Intertravamento-concept') {
    $sw = $sw.Replace('keys.filter(k=>k!==CACHE)',
      "keys.filter(k=>k.startsWith('u39-concept-')&&k!==CACHE)")
    if (-not $sw.Contains("startsWith('u39-concept-')")) {
      throw 'A correcao de isolamento do cache nao foi aplicada.'
    }
  }
  if ($sw.Contains('./laboratorio-bypass-gw0014-v1.js')) {
    throw "Ainda ha V1 no cache: $repo"
  }
  [IO.File]::WriteAllText($indexPath, $index, $utf8)
  [IO.File]::WriteAllText($swPath, $sw, $utf8)
  $node = Get-Command node -ErrorAction SilentlyContinue
  if ($node) {
    & node --check $swPath
    if ($LASTEXITCODE -ne 0) { throw "Erro de sintaxe JS no service worker: $repo" }
  }
  $zip = Join-Path $destino ($repo + '-Correcao-GW0014-V2.3.zip')
  if (Test-Path $zip) { Remove-Item -LiteralPath $zip -Force }
  Compress-Archive -Path "$pasta\*" -DestinationPath $zip
  Write-Host "OK: $pasta" -ForegroundColor Green
  Write-Host "ZIP: $zip" -ForegroundColor Green
}
Write-Host ''
Write-Host 'CONCLUIDO: envie SOMENTE index.html e service-worker.js da pasta correta a cada repositorio.' -ForegroundColor Green
Write-Host "Destino: $destino"
