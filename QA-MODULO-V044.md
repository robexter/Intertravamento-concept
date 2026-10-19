# QA — By-pass Avançado V0.4.4

## Testes executados na prévia isolada

- `node --check` nos dois JavaScripts: **passou**.
- Chromium/Playwright: **três larguras** 1440×900, 390×844 e 320×750.
- Transição dos estados 1 → 2 e seleção do estado 4: **passou**.
- Votação 2oo3: A=trip e C=trip → solicitação de trip no modelo nominal: **passou**.
- Hipótese A fixado normal → votação B/C sem dois trips: **passou**.
- Hipótese reconfigurada 1oo2 entre B/C → solicitação de trip: **passou**.
- Entrada BAD em canal participante → resultado `INDETERMINADO`: **passou**.
- Checklist primeiro evento (5/5) mantendo aviso sem autorização operacional: **passou**.
- Navegação ao TG-3901: referência XV-39024 exibida: **passou**.
- Troca e retorno de cenário com preservação de respostas: **passou**.
- Salvar e retomar localmente: **passou com armazenamento simulado no teste**, a confirmar no domínio publicado e políticas reais do navegador.
- Modo Avaliação: revisão sem gabarito antes de 20 respostas e liberação após 20: **passou**.
- Avaliação CIC: os cinco cenários e 20 decisões foram respondidos no teste: **passou**.
- Ausência de erros JavaScript / overflow global nas três larguras testadas: **passou**.

## Testes não executados

- A página completa do repositório original com todas as imagens e demais módulos não está incluída na prévia; **teste integrado ainda pendente**.
- Instalação e funcionamento offline do PWA **não testados** nesta edição.
- Comportamento real e programação do PLC/SIS **não testados nem homologados**.
- Verificação de malware por antivírus externo **não executada**; o ZIP final contém apenas HTML, CSS, JS e Markdown, sem `.py`, `.exe` ou macros.

## Integridade de conteúdo

- Banco de 5 cenários, 20 decisões preservado sem reformulação de alternativas ou gabaritos.
- Seção completa de Primeiro Evento e reset por conversor/grandes máquinas/TG-3901 mantida.
- Seções originais de partida, parada, manutenção, votação e divergências preservadas.
- V0.4.4 só altera metadados de versão no arquivo do conteúdo.
