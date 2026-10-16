# Intertravamento U-39 Concept V0.4 — PWA didático

**Estado:** protótipo educacional em validação técnica. Versão V0.3 preservada. Esta aplicação **não se conecta ao SDCD nem ao PLC**, não envia comandos, não autoriza by-pass, manobras, reset ou manutenção e não substitui documentação aprovada.

## Melhorias da V0.4

1. **Investigar um trip** — seis cenários com inspeção de áreas, escolha da entrada da matriz, associação a efeito e interpretação física; trilha de quatro fases e feedback contextualizado. São situações **fictícias**, não registros de ocorrências nem simulação determinística do PLC.
2. **Mapa de consequências** — selecione qualquer entrada cadastrada do conversor; visualize tags, descrições das saídas marcadas na captura 39GR0051 e a interpretação física, com cartões de detalhe abertos somente após clique. Os pontos verdes demonstram vínculo da matriz, não atuação real.
3. **Aprofundamento físico** — seis explicações expansíveis sobre carga, temperatura, dispersão, ar, diferencial de catalisador e J-3901. Separa o mecanismo físico geral da evidência documental.
4. **Avaliação CIC em dois modos** — 28 questões contextualizadas em cinco competências: Treinamento com explicação ao responder; Avaliação CIC com gabarito apenas após finalizar, diagnóstico por tema e revisão detalhada com referências. A posição correta é sorteada a cada tentativa, **sem quotas artificiais** ou padrões impostos. Os acertos não habilitam operação.
5. **Laboratório CIC / Simulador guiado preservados** — mantidos os cinco cenários (25 decisões) e os seis encadeamentos (30 decisões), com ajuste adicional dos distratores para que nenhuma correta seja isoladamente a mais longa no banco. O sorteio de alternativas deixa de exigir distribuições exatas.
6. **Rastreabilidade** — comparativo de 11 registros técnicos com fonte SDCD, documento histórico, fundamentos físicos e informações ainda não validadas.
7. **Interface responsiva** — 14 seções no menu, painéis de explicação expansíveis, recursos interativos acessíveis por toque e cartões de equipamentos amplos em celular. As 19 imagens originais permanecem preservadas.

## Auditoria dos distratores

| Banco | Itens | Correta única mais longa | Maior razão entre comprimentos |
| --- | ---: | ---: | ---: |
| Avaliação CIC | 28 | 0 | 1,45 |
| Laboratório CIC | 25 | 0 | 1,39 |
| Simulador guiado | 30 | 0 | 1,43 |

Nenhuma questão possui opções idênticas dentro da mesma questão. A distribuição exibida de A/B/C/D é aleatória, sem forçar exatamente sete por letra. Isso impede padrões de ordem pré-definidos; **não garante** que todas as questões sejam impossíveis de responder por eliminação ou tenham dificuldade equivalente. Esses aspectos devem ser validados pedagogicamente com operadores/instrutores.

Relatório: `QA-AVALIACAO-V04.md`. Banco novo: `question-bank-v04.json`; versões auditadas dos dois bancos anteriores: `lab-bank-v04.json` e `sim-bank-v04.json`.

## Referências e cautelas

- Documento histórico `Intertravamento U39 maior.doc`, fornecido pelo usuário, e **19 capturas do SDCD** em `assets/`.
- GW0014 mostra valores de TRIP e de rearme que **não são sinônimos** dos critérios históricos de reset do by-pass de partida/parada. Diferenças não foram conciliadas por suposição.
- A matriz 39GR0051 mostra associação causa–saída; não prova qual saída ocorreu, quando ocorreu, ou o estado real dos instrumentos.
- 39GR0068 documenta eventos das máquinas; não estabelece a cronologia de um cenário fictício do conversor.
- Votação, temporização, precedência E/OU, condições de bypass, permissivos e lógica implantada requerem descritivo atualizado e validação formal de engenharia/instrumentação.
- Reflexões sobre termodinâmica, fluidização e contato óleo–catalisador são **explicações técnicas complementares**; não são transcrições de justificativas específicas do projeto.

## Publicar no GitHub Pages

1. Extraia `U39-Intertravamentos-Concept-V0.4.zip`.
2. Envie **o conteúdo interno** da pasta extraída à raiz de um repositório GitHub, preservando a estrutura de pastas.
3. Em Settings → Pages, selecione Deploy from branch, `main`, `/ (root)`.
4. Aguarde a publicação e abra o site por HTTPS. A nova versão de cache é `u39-concept-v04-20261016`; se houver uma instalação anterior, atualize a página e aguarde o service worker instalar a nova versão.
5. Teste manualmente a instalação como PWA e o modo offline **em seu aparelho**. A instalação/offline no dispositivo não foi homologada nos testes locais.

**Não envie somente `index.html`.** O PWA precisa de `v04.css`, `v04.js`, `refinement.js`, `enhancement-v03.js`, `sim-v03.js`, `service-worker.js`, `manifest.webmanifest`, `icons/` e `assets/`. Os arquivos JSON estão incluídos para auditoria dos bancos; **a execução dos bancos V0.4 usa as cópias incorporadas ao `v04.js`**. Se alterar um banco JSON, sincronize sua versão incorporada no JavaScript antes de publicar.

## Testes e limitações

- Testados fluxo do investigador (seis casos × quatro fases), mapa interativo, filtros de rastreabilidade e dois modos das 28 questões no Chromium desktop 1440×900 e em viewport móvel 390×844.
- Sem erros de JavaScript ou transbordamento horizontal global nos cenários executados. Também foram executados testes de regressão dos módulos anteriores; o aplicativo continua **sujeito a validação manual após publicação**.
- Nenhuma interface de teste foi conectada à unidade, à malha real ou a sistemas de segurança.

## Arquivos principais

- `index.html` + `v04.css`: interface PWA responsiva.
- `v04.js`: novo simulador investigativo, mapa, fontes e avaliação CIC revisada.
- `refinement.js`, `enhancement-v03.js`, `sim-v03.js`: módulos anteriores preservados.
- `question-bank-v04.json`, `lab-bank-v04.json`, `sim-bank-v04.json`: bancos auditáveis da versão V0.4.
- `QA-AVALIACAO-V04.md`: auditoria de alternativas.
- `assets/`, `icons/`, `service-worker.js`, `manifest.webmanifest`: mídias e instalação.

**A V0.4 não foi congelada como versão operacional validada.**
