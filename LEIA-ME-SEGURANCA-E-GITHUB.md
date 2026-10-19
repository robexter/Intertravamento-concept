# Intertravamento Concept — módulo By-pass Avançado 0.4.3 (reconstruído)

## Segurança e limitações

A versão anterior (V0.4.2) foi sinalizada pelo Microsoft Defender como Trojan:Win32/MalUri.A!cl. **Não execute nem restaure o pacote anterior.**

Esta edição foi construída novamente, sem copiar os arquivos JavaScript da V0.4.2. Não contém `.exe`, `.bat`, `.ps1`, `.py`, `.dll`, `service-worker.js`, plugins, bibliotecas externas, chamadas de rede, código baixado ou componentes instaláveis. O comportamento interativo está embutido em um HTML único, com Política de Segurança de Conteúdo (CSP) restritiva por hash SHA-256, sem acesso externo ou formulários.

**Não se pode garantir 100% de ausência de malware.** Houve revisão estática automatizada, testes de integridade e sintaxe, mas **NÃO foi executada uma varredura antivírus do Microsoft Defender neste ambiente**. Se o Windows bloquear novamente, mantenha o bloqueio e envie o nome exato da detecção; não crie exceções.

## Publicação aditiva no GitHub Pages

1. Não substitua o arquivo `index.html` da raiz do Intertravamento Concept.
2. Na raiz do repositório `Intertravamento-concept`, crie a pasta `bypass-avancado`.
3. Dentro da pasta, coloque apenas `bypass-avancado/index.html` deste pacote.
4. Após a publicação, o módulo abrirá em `https://robexter.github.io/Intertravamento-concept/bypass-avancado/`.
5. Se desejar, inclua no menu atual um link normal para `bypass-avancado/` (exemplo abaixo). A integração do menu precisa de edição manual e teste porque o arquivo `index.html` atual não foi incluído no pacote.

```html
<a href="bypass-avancado/">By-pass avançado — estudo e simulações CIC</a>
```

## O que foi preservado

- Texto histórico integral sem sumarização no anexo `.md`.
- Capítulos técnicos do sistema (partida, parada, manutenção, BAD, votação, forçamentos, conflitos documentais) expostos na aba Conteúdo integral.
- 5 cenários CIC com todas as 20 decisões, alternativas originais, fundamentações, riscos e consequências.
- Abas, três fluxos pedagógicos interativos, modos de treinamento e avaliação, alternativas embaralhadas e revisão ao término.

## O que NÃO está nesta versão

- Integração automática com index ou service worker existente; não há execução de scripts locais.
- Certificação antivírus ou validação da configuração real do PLC.
- PWA offline instalado como app: a página pode ser hospedada separadamente, mas não registra service worker.

O conteúdo é educativo e não orienta operar by-passes em planta sem procedimentos autorizados.
