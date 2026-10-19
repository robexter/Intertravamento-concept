# Intertravamento Concept U-39 — By-pass Avançado V0.4.4

**Escopo:** atualização **aditiva** do módulo complementar V0.4.3. A base `robexter/Intertravamento-concept` V0.4.1 não é substituída. Todo o conteúdo técnico explicativo e os cinco cenários CIC / 20 decisões foram preservados. A edição V0.4.4 acrescenta componentes interativos e corrige a perda de progresso ao alternar cenários.

## Melhorias efetivamente implementadas

1. **Painel lógico interativo:** seis representações didáticas do estado de funções FSLL, TSL, PDSLL e primeiro evento durante operação/partida/parada/trip. Não simula o programa real do PLC.
2. **Bancada de votação 2oo3:** estados de sinais A, B, C (normal/trip/BAD), saída lógica hipotética, comparação entre 2oo3 nominal, A fixado em normal (exemplo 2oo2 B/C), e reconfiguração de voto para 1oo2 B/C. BAD participante produz indicação *indeterminada* até consulta ao tratamento de qualidade configurado. Não deve ser usado para planejar contornos reais.
3. **Checklist visual do primeiro evento:** cinco verificações de preservação de evidência e diagnóstico. O status 5/5 **não** constitui autorização de reset, partida ou bypass.
4. **Navegação CIC com andamento por cenário:** troca de cenário não elimina respostas previamente registradas; o operador retoma na primeira questão pendente. Erro anterior corrigido na contagem de acertos por cenário.
5. **Salvamento voluntário e recuperação de andamento:** armazenamento **local** no navegador; não transmite dados, não envolve PLC e não salva medidas de processo. O recurso depende de armazenamento habilitado. Trocar o modo Treinamento/Avaliação reinicia o percurso (o botão informa isso).
6. **Consequência da escolha anterior exibida em cada etapa**, sem transformar os exemplos em previsões determinísticas do PLC. A Avaliação CIC mantém o gabarito oculto antes das vinte decisões.
7. **Interface responsiva:** testada em 1440, 390 e 320 px, navegação por toque, estados de foco e ausência de overflow global nos fluxos testados.

## Instalação no repositório existente (GitHub web)

A atualização é feita **somente com arquivos de texto, sem Python, executáveis, instaladores ou macros**.

1. Crie um backup do repositório/branch antes da alteração. A versão publicada no GitHub Pages **ainda não inclui este pacote**.
2. Envie para a raiz do repositório os três arquivos `bypass-avancado-conteudo-v1.js`, `bypass-avancado-v1.js`, `bypass-avancado-v1.css`, **substituindo os arquivos homônimos se a V0.4.3 já estiver instalada**.
3. Se o seu `index.html` **já carrega** a V0.4.3, não duplique nenhuma tag; mantenha as três referências existentes, pois os nomes foram preservados.
4. Se essa extensão ainda não estiver integrada, adicione imediatamente antes de `</head>`:

```html
<link rel="stylesheet" href="./bypass-avancado-v1.css">
```

E antes de `</body>` nesta ordem:

```html
<script defer src="./bypass-avancado-conteudo-v1.js"></script>
<script defer src="./bypass-avancado-v1.js"></script>
```

5. Atualize o `service-worker.js` **preservando o restante**. Altere o identificador de cache para um novo valor, por exemplo `u39-concept-v044-bypass-20261018`, e confirme estes três caminhos em `FILES`:

```js
"./bypass-avancado-conteudo-v1.js",
"./bypass-avancado-v1.js",
"./bypass-avancado-v1.css"
```

6. Aguarde o deploy do GitHub Pages e teste a página tanto em desktop quanto no celular. Para instalações PWA antigas, atualize/reabra o aplicativo para carregar o novo cache.

**Importante:** `PREVIA-INTERATIVA-V044.html` é uma **prévia isolada**. Não a envie como `index.html`, pois isso substituiria a home e os demais módulos. `CONTEUDO-INTEGRAL-E-20-DECISOES.md` é o material de auditoria, não deve substituir nenhum arquivo de origem do Concept. Os três arquivos de código são usados pelo módulo na página original.

## Fonte, risco e limite de uso

Documento histórico `Intertravamento U39 maior.doc` (inclui descrição de 2005), procedimentos operacionais citados nos materiais e telas SDCD. Os pontos da engenharia atual que não foram comprovados permanecem marcados como pendentes. O Concept não se conecta nem comanda SDCD, SIS, PLC, equipamentos ou válvulas.

- Não interpretar o comando HSBP39STOP como contorno simultâneo de todas as proteções.
- Não assumir que uma função retirada do by-pass de partida entra automaticamente em contorno após novo desvio.
- Não equiparar os setpoints de trip, rearme e retirada de by-pass de textos históricos com os exibidos na GW0014 sem revisão técnica.
- Não presumir o algoritmo de votação degradada do PLC real a partir de exemplos 2oo3/2oo2/1oo2.
- Não equiparar reconhecimento de alarme, limpeza do primeiro evento, reset do trip e rearme dos elementos finais.

## Melhorias propostas para a próxima edição (ainda NÃO implementadas)

- **Prioridade alta:** vincular, sob validação da engenharia, cada estado à matriz de causa e efeito *as-built* e à lista real de permissivos; exibir diferenças entre revisão histórica e vigente por tag.
- **Prioridade alta:** ampliar para cenários ramificados com respostas do CIC/campo e eventos de processo interdependentes, após confirmar limites técnicos e salvaguardas reais.
- **Prioridade média:** tendências gráficas fictícias sincronizadas à sequência de eventos, destacando causa inicial versus efeitos posteriores; valores claramente sinalizados como ilustrativos.
- **Prioridade média:** fichas de estudo por equipamento (J-3901, J-3902, GV-3901, TG-3901) com respostas das proteções e links diretos às telas SDCD correspondentes.
- **Prioridade média:** trilhas de aprendizagem por competência, com revisão personalizada dos erros e modo instrutor para discussão de cada hipótese.
- **Prioridade média:** homologação em celular/PWA instalado, offline e recursos de acessibilidade com teste de usuários.

**Estado:** protótipo técnico-pedagógico, publicação e validação de engenharia pendentes.
