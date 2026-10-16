# U-39 Concept V0.4 — Auditoria da avaliação e simuladores

**Resultado técnico do banco (verificação automatizada dos arquivos empacotados):**

| Teste | Avaliação CIC | Laboratório CIC | Simulador guiado V0.3 mantido |
|---|---:|---:|---:|
| Questões/decisões | 28 | 25 | 30 |
| Correta como maior isolada | 0 | 0 | 0 |
| Maior relação de caracteres máximo/mínimo | 1.45 | 1.39 | 1.43 |
| Alternativas idênticas na mesma questão | 0 | 0 | 0 |

**Distribuição das respostas:** a aplicação sorteia de forma independente as posições e a ordem das perguntas. A cada tentativa, o gabarito pode ter quantidades diferentes de A, B, C e D; não há quotas artificiais nem proibição de sequências repetidas. Isso impede que uma regra fixa do gabarito se transforme em pista. O exemplo de simulação local de 56.000 posições mostrou distribuição aproximada de 25% por letra, mas a distribuição de uma tentativa individual é variável.

**Avaliação CIC:** são 28 questões em cinco competências (Conversor: 6, Partida e parada: 7, Causa e efeito: 6, Máquinas: 5, Diagnóstico: 4). **Treinamento**: feedback após resposta. **Avaliação CIC**: sem destacar correta até a conclusão; conclusão exibe percentual, diagnóstico por competência e revisão com fonte.

**Melhoria pedagógica:** substituição de perguntas repetitivas/triviais e maior foco em leitura de causas, função de setpoints, distinção entre trip, rearme e by-pass, correlação de telas e fundamentos físicos. A equivalência visual das alternativas foi auditada quantitativamente, mas a dificuldade real e a capacidade de eliminação por domínio parcial do assunto requerem avaliação com instrutores e operadores.

**Ambiente de testes:** fluxo do novo investigador (seis cenários completos), mapa de consequências, filtros de rastreabilidade e os 28 itens dos dois modos exercitados em Chromium com viewport 1440×900 e 390×844. Sem erros JavaScript e sem transbordamento horizontal global nessas condições. Os testes de serviço offline após instalação e de integração com dados de produção **não** foram realizados.

**Limitação técnica:** o treinamento usa documento histórico de engenharia e 19 capturas de SDCD. Nenhum valor representa confirmação atual do PLC. As conclusões físicas são didáticas, sem previsão de sequência real de intertravamento.
