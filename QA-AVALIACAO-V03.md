# Verificação de qualidade — U-39 Concept V0.3

Este documento registra uma **auditoria estrutural** das alternativas. A validação pedagógica e de engenharia das informações operacionais continua dependendo das fontes vigentes.

## Controles aplicados

- **Quatro alternativas** por questão da avaliação; **três** por decisão dos exercícios.
- Nenhuma questão possui alternativas repetidas, índices de gabarito inválidos ou textos de questão duplicados dentro da sua seção.
- Relação entre o maior e o menor texto de cada conjunto de alternativas de, no máximo, **1,50** (contagem de caracteres).
- A resposta correta não é a única alternativa mais longa nas **28 questões** da avaliação.
- A posição correta é redistribuída automaticamente na interface em cada tentativa.
- A avaliação com 28 questões apresenta **sete respostas na letra A, sete na B, sete na C e sete na D** em cada execução; sem sequência de três gabaritos iguais.
- Os exercícios de cinco decisões distribuem a opção correta entre A, B e C de modo balanceado (padrão **2–2–1**, reordenado por execução).
- Explicações e fontes só aparecem após a escolha, sem antecipar o gabarito.

## Resultado quantitativo

| Área | Itens | Maior razão de tamanho | Resposta correta isoladamente mais longa | Correta com menor tamanho |
|---|---:|---:|---:|---:|
| Avaliação CIC | 28 | 1.50 | 0 | 15 |
| Laboratório CIC | 25 | 1.39 | 2 | 10 |
| Simulador conversor | 30 | 1.43 | 7 | 13 |

## Interpretação

A homogeneização de tamanho reduz pistas triviais. Entretanto, uma estatística de caracteres **não garante** que nenhum participante elimine distratores pelo conhecimento parcial. As alternativas foram reescritas para usar instrumentos, funções e estados do mesmo domínio quando possível.

Os valores de trip e rearme representados nas perguntas são **transcrições históricas das telas ou do documento**. Não foram homologados como configuração corrente.

## Verificações funcionais

A lógica do quiz e do laboratório foi percorrida em Chromium. Cada cenário exibe feedback após a escolha e permite refazer a atividade. A simulação não executa comandos no SDCD/PLC.

## Lacunas pendentes

Sem revisão da lógica PLC, continua pendente validar votação real, setpoints, temporizações, permissivos e condições de reset. A sequência do simulador é didática, não temporal.
