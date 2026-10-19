# Intertravamento U-39 — By-pass de partida, parada e manutenção

## Conteúdo técnico integral e cinco cenários de avaliação CIC

**Protótipo exclusivamente educacional.** Não representa a configuração validada do PLC e não substitui os procedimentos vigentes.

Este arquivo é uma reprodução integral, em formato de leitura, dos capítulos técnicos e das 20 decisões que constam do módulo interativo. A ordem de alternativas aqui é a ordem de cadastro; no aplicativo ela é embaralhada a cada tentativa.

## 1. Filosofia dos três tipos de by-pass

**By-pass**, no contexto deste módulo, significa contorno temporário de uma função instrumentada segundo lógica e autorização definidas. Não se confunde com válvula física de desvio, reset de trip, rearme de elemento final ou reconhecimento de alarme.

O objetivo comum dos contornos de partida, parada e manutenção é administrar condições transitórias específicas. A diferença reside na **forma de habilitação, sequência de atuação, permanência, retorno à proteção e risco residual**.

| Característica | Partida | Parada | Manutenção |
| --- | --- | --- | --- |
| Acionamento | HSBP-39001 no SDCD | HSBP39STOP no SDCD; outra seção histórica usa HS\_PARADA | Liberação autorizada da manutenção no PLC, com chave física descrita |
| Finalidade | Permitir a partida apesar de condições de processo ainda não normalizadas | Permitir a redução prevista de carga, temperatura, circulação e ar sem trips decorrentes da sequência esperada | Permitir intervenção em canal ou instrumento da proteção |
| Seleção dos contornos | Somente condições elegíveis e em trip no momento de aceitação, conforme documento | Liberação sequencial, vinculada às condições das etapas | Contorno individual, condicionado a autorização |
| Retirada | Individual e automática, segundo critérios por função | Condições de reset e/ou transição para partida previstas no descritivo | Restabelecimento formal após manutenção |
| Questão crítica CIC | Qual proteção já retornou? | Qual proteção ainda não foi liberada? | Qual capacidade de proteção continua disponível? |

Na partida, o comando geral não significa contorno permanente de tudo; na parada, o comando aceito não significa que todas as funções estejam contornadas; na manutenção, a medição normalizada não comprova que o desvio tenha sido retirado.

**Segurança de processo:** nenhum desses recursos representa autorização de ignorar um intertravamento real. O Concept é exclusivamente educacional, não envia comandos ao SDCD nem ao PLC e não estabelece uma sequência operacional para execução em planta.

### Estados que o CIC deve distinguir

1. **Comando recebido:** a chave recebeu a solicitação do operador.
2. **Comando aceito:** permissivos pertinentes foram avaliados.
3. **Função contornada:** o estado específico daquela função indica by-pass efetivo.
4. **Função protegida:** o canal participa novamente da lógica de intertravamento.
5. **Função em trip:** as condições programadas solicitaram uma ação de segurança.
6. **Reset/rearme:** há requisitos próprios de processo, instrumentação e elementos finais.

Esses estados são diferentes. A análise operacional exige consultar a função específica na tela, não apenas o botão geral de partida ou parada.

---

## 2. By-pass de partida — HSBP-39001

**Objetivo:** permitir a partida do conversor quando determinadas variáveis de processo ainda não atingiram suas condições normais. O projeto histórico descreve contorno seletivo apenas das funções elegíveis que estejam em trip quando o comando for aceito.

### Sequência lógica descrita

1. O operador solicita a partida pela HSBP-39001 no SDCD.
2. O PLC verifica permissivos e impedimentos; com conversor em trip, o histórico informa que o J-3901 não deve possuir trip ativo para permitir o by-pass de partida e reset do conversor.
3. A qualidade dos instrumentos é avaliada. O histórico declara que a presença de instrumento em BAD impede a aceitação do comando; sinal BAD pode gerar trip quando assim configurado.
4. As funções elegíveis que estiverem em trip são contornadas; o SDCD sinaliza "processo de partida" e informa quais funções estão contornadas.
5. À medida que cada variável satisfaz seu critério de normalização, o by-pass correspondente é retirado **individualmente**.
6. O retorno da proteção não prova, isoladamente, que todos os demais contornos tenham sido retirados. O rearme dos elementos finais possui requisitos próprios.

### Funções previstas para contorno de partida (documento histórico)

| Tag | Função | Condição citada para contorno |
| --- | --- | --- |
| FSLL-39005B | Baixa vazão de carga no ramal inferior | Abaixo de 1.259 m³/d por mais de 120 s e comando HSBP-39001 |
| FSLL-39006B | Baixa vazão de carga no ramal superior | Abaixo de 1.259 m³/d por mais de 120 s e comando HSBP-39001 |
| TSL-39010B | Baixa temperatura de reação | Abaixo de 500 °C e comando HSBP-39001 |
| FSLL-39003B | Baixa vazão de ar do conversor | Abaixo de 1.350 m³/d e comando HSBP-39001 |
| PDSLL-39018 | Baixo ΔP catalisador gasto (L-3901) | Conversor em trip total e comando HSBP-39001 |
| PDSLL-39022 | Baixo ΔP catalisador regenerado (L-3902) | Conversor em trip total e comando HSBP-39001 |
| FSLL-39044B | Baixa vazão de vapor de dispersão | Abaixo de 550 t/d por mais de 300 s e comando HSBP-39001 |
| LSLL-39005 | Baixo nível de catalisador no regenerador | Abaixo de 40% e comando HSBP-39001 |

### Condições históricas de reset individual do by-pass de partida

| Função | Condição registrada no descritivo | Observação crítica |
| --- | --- | --- |
| FSLL-39005B | Ramal inferior acima de 1.637 m³/d por mais de 30 s | Valor para reset de by-pass histórico; não confundir com rearme da tela 39GW0014. |
| FSLL-39006B | Texto imprime "abaixo de 1.637 m³/d" por mais de 30 s | Divergência/suspeita de erro documental: NÃO corrigir por suposição. |
| TSL-39010B | Critérios envolvendo carga de um dos ramais ou borra de reciclo e T reação acima de 525 °C | Conferir precedência E/OU no PLC e revisão; o documento apresenta conjunções e alternativas cuja tradução operacional precisa ser validada. |
| FSLL-39003B | Critérios envolvendo fotocélulas do forninho e vazão de ar acima de 3.500 m³/d, ou fase densa acima de 400 °C e vazão acima de 3.500 m³/d | As duas situações dependem de condições específicas do forninho/temperatura. |
| PDSLL-39018 / 39022 | Condições de vazão de carga/borra e ΔP acima de 200 gf/cm² por mais de 30 s | A precedência exata dos operadores lógicos precisa da carta validada. |
| FSLL-39044B | Vapor de dispersão acima de 50 t/d por mais de 30 s | Não corresponde automaticamente à condição de rearme na 39GW0014. |
| LSLL-39005 | Nível acima de 50% por mais de 30 s | Estado de habilitação indicado em captura do SDCD exige validação atual. |

### Primeiro evento, BAD e reset

O documento descreve registro de primeiro evento pelo PLC; os demais eventos posteriores também podem ser exibidos. Para apagar a indicação de primeiro evento do conversor, menciona-se o by-pass de partida; nas grandes máquinas existem resets locais específicos. Isso **não** significa que apagar registro identifique ou corrija a causa física.

Com o conversor em trip, o histórico relaciona o reset das válvulas ao by-pass de partida, menciona FV-39001A/B associadas às blow-off/antissurge do J-3901 e cita comportamentos próprios de XV-39001, XV-39808 e XV-39002. A condição de pressão citada para reset automático da XV-39002 é menor que 0,150 kg/cm²; todos esses critérios exigem validação no arranjo vigente.

**Questão em aberto:** o texto não comprova que uma função cujo by-pass já foi retirado volte a ser contornada automaticamente por nova queda de variável. Para ensinar o cenário, presume-se proteção restabelecida até confirmação da lógica atual.

---

## 3. By-pass de parada — HSBP39STOP

**Objetivo:** promover parada programada controlada sem que reduções intencionais de carga, dispersão, temperatura, circulação de catalisador e vazão de ar provoquem automaticamente trips decorrentes da sequência esperada. A documentação ressalta: uma variável fora da sequência pode provocar trip mesmo com by-pass geral de parada ativo.

### Sequência descrita operacionalmente

1. **Comando:** HSBP39STOP na tela de intertravamento do conversor / GW315. A seção de projeto também usa a denominação HS\_PARADA; verificar identificação em campo.
2. **Permissivo:** não pode haver condição de segurança no estado de by-pass de partida para aceitar o comando de parada.
3. **Primeira liberação:** são contornados FSLL-39005, baixa vazão de carga no ramal inferior, e a função de baixa vazão de vapor de dispersão (citada como FSLL-39044 no texto operacional).
4. **Próxima etapa:** após o ramal inferior cumprir sua condição de redução, o PLC contorna FSLL-39006, proteção de baixa vazão do ramal superior.
5. **Redução do ramal superior:** após cumprir a condição prevista, o PLC libera TSL-39010, baixa temperatura de reação, e o LSLL-39005 quando aplicável.
6. **Redução térmica:** com temperatura de reação inferior a 500 °C e o by-pass de temperatura efetivamente ativo, o histórico prevê contornar PDSLL-39018, PDSLL-39022 e FSLL-39003.
7. **Redução do ar:** abaixo da condição documentada de vazão de ar ao regenerador, o projeto prevê contorno associado à parada do J-3901.
8. **Confirmação em tela:** o texto operacional descreve sinalização amarela nas funções contornadas e texto "parada" na tela de by-pass. Comando aceito não substitui confirmação função a função.

**Divergência:** a seção operacional menciona 500 m³/d na transição entre ramais, enquanto a seção de engenharia utiliza 5% e 1.259 m³/d em trechos diferentes. Não usar esses valores como comando de redução sem confirmar a versão atual do PLC e o procedimento vigente.

### Retirada do by-pass de parada e desistência da parada

O material descreve reset da condição de parada em resposta ao comando de by-pass de partida e mediante determinadas normalizações de processo. Alguns textos históricos citam retorno da carga acima de 1.259 ou de 1.637 m³/d por tempos especificados, vazão de ar acima de 3.500 m³/d, temperatura acima de 525 °C, níveis e pressões diferenciais. Há divergências entre as versões e funções citadas.

Quando a operação desiste da parada, o descritivo operacional orienta transição para by-pass de partida **antes** do retorno às condições normais, a fim de evitar retirada inadequada do estado de parada com variáveis ainda em trip. Também menciona o comando de partida antes do rearme relacionado ao J-3901 após o término da parada.

Esse registro deve ser interpretado como requisito histórico a confirmar. Ele não deve ser aplicado como instrução isolada, fora do procedimento vigente ou sem os permissivos de equipamento.

### Por que o by-pass de parada não elimina todos os trips?

Ao ser acionado, o contorno começa pelas primeiras funções autorizadas. As demais dependem da progressão de variáveis do processo. Assim, reduzir prematuramente o ramal superior pode atingir o FSLL-39006 quando este ainda está protegido; reduzir a temperatura antes de liberar TSL-39010 também pode solicitar a proteção.

Referência operacional adicional: PE.REF.OPE.CCF.106, etapa 5.2.1.9, registra explicitamente o acionamento e a sinalização das funções iniciais FSLL-39005 e FSLL-39044. O restante do procedimento trata das manobras de parada e não deve ser substituído pelo módulo.

---

## 4. By-pass de manutenção, BAD e votação

O by-pass de manutenção permite contornar individualmente instrumento que participa de uma função instrumentada de segurança, de acordo com autorização e gestão de desvio. O documento descreve liberação por chave física no PLC e necessidade de APR nível 2 e ADTCP. Como documentos internos e critérios podem mudar, a autorização, medidas compensatórias, prazo e retorno devem seguir o sistema vigente de gestão de segurança.

### Sequência lógica e administrativa

1. Identificar o instrumento, a função instrumentada envolvida, a configuração de votação e a anomalia demonstrada.
2. Avaliar consequências de perda ou degradação da camada de proteção e obter a autorização formal de desvio.
3. Confirmar a seleção do instrumento e a configuração de contorno efetivamente implementada no PLC, com manutenção e operação.
4. Confirmar o estado lógico sinalizado e a capacidade de proteção remanescente antes e durante a intervenção.
5. Executar diagnóstico e correção pelos responsáveis, monitorando condições e prazo do desvio.
6. Testar, retirar o contorno autorizado, verificar canais e votar novamente conforme a lógica implantada; confirmar encerramento formal do desvio.

### Votação 2oo3: tabela-verdade conceitual

| Canal A | Canal B | Canal C | Trip 2oo3? |
| --- | --- | --- | --- |
| 0 | 0 | 0 | Não |
| 1 | 0 | 0 | Não |
| 0 | 1 | 0 | Não |
| 0 | 0 | 1 | Não |
| 1 | 1 | 0 | Sim |
| 1 | 0 | 1 | Sim |
| 0 | 1 | 1 | Sim |
| 1 | 1 | 1 | Sim |

**0** representa ausência de solicitação e **1** representa solicitação de trip, em um exercício abstrato, sem tratamento de BAD ou de temporização.

### Falha do canal A e oscilação do C

Com A=1 por falha permanente, B=0 e C=0, a função 2oo3 ainda não atua, mas está degradada. Caso C passe a solicitar trip, A=1 e C=1 atingem a votação. Isso não prova que ambos representam desvio real de processo; o diagnóstico deve confrontar evidências independentes.

### O que muda durante o contorno?

**Arquitetura ilustrativa 1:** se o canal contornado for tratado como 0 e a lógica 2oo3 permanecer inalterada, os dois canais remanescentes precisam solicitar trip juntos. O efeito comportamental equivale a 2oo2 entre eles.

**Arquitetura ilustrativa 2:** se a aplicação reconfigurar explicitamente a votação para 1oo2, qualquer um dos dois canais remanescentes poderá solicitar a função, com efeitos diferentes em disponibilidade e trips indevidos.

**Uma votação 2oo2** também admite comportamentos distintos durante manutenção. Se um canal for fixado em condição normal sem reconfiguração, um canal isolado não atinge 2oo2; se houver reconfiguração para 1oo1, a função pode atuar por um canal, porém sem redundância.

**Não inferir a votação degradada da U-39:** o documento consultado não comprova qual das arquiteturas se aplica a cada função do PLC. A frase histórica sobre contornar primeiro o instrumento defeituoso não substitui procedimento autorizado, análise da configuração de votação e verificação independente.

### Pontos forçados ≠ by-pass operacional

O histórico descreve pontos forçados no PLC para testes, simulações ou contingências de instrumentação. A sinalização no SDCD pode informar a quantidade de pontos fixados sem mostrar qual variável está forçada. Essa limitação de visibilidade exige rastreabilidade pela manutenção e pela documentação do desvio.

---

## 5. Aprofundamento das quatro situações críticas

Caso crítico 1 — Parada acionada, ramal superior reduzido fora de sequência

**Condição inicial:** ambos os ramais normais; by-pass de partida inativo; operador aciona HSBP39STOP; PLC aceita comando e contorna inicialmente FSLL-39005 e baixa vazão de dispersão. FSLL-39006, TSL-39010 e outras funções aguardam suas condições.

**Desvio:** o operador reduz primeiro o ramal superior sem confirmar liberação do seu FSLL. Se a vazão atingir o critério de intertravamento enquanto a proteção ainda estiver ativa, poderá ocorrer trip, com consequências previstas na matriz causa e efeito.

**Raciocínio do CIC:** separar comando geral aceito, funções sinalizadas em by-pass e funções ainda protegidas. Confirmar cada transição antes de considerar completa uma etapa; observar tendências e interdependências.

**Conclusão:** o by-pass de parada funciona por liberação condicionada, não por supressão geral de trips.

Caso crítico 2 — Partida solicitada com um instrumento BAD

**BAD** indica qualidade de sinal reconhecida como inválida ou falha. A variável real pode estar normal, mas a função configurada no PLC pode tratar BAD como condição de trip.

O documento declara que BAD impede a aceitação do by-pass de partida, exigindo tratamento autorizado da falha. Pressionar reset, por si só, não elimina a causa da invalidez do sinal.

**Outro permissivo:** com conversor em trip, o histórico informa exigência de ausência de trip ativo no J-3901 para aceitar by-pass de partida e permitir resets. Não confundir a lógica do conversor com os resets próprios das máquinas.

**Decisão de diagnóstico:** confirmar origem do BAD, redundância disponível, impacto na função instrumentada, condição da máquina e autorização de manutenção, sem presumir que um contorno seja admissível.

Caso crítico 3 — By-pass de partida retirado, variável volta a cair

O exemplo didático usa FSLL-39005: o histórico cita condição abaixo de 1.259 m³/d por mais de 120 s e reset do by-pass quando o ramal inferior fica acima de 1.637 m³/d por mais de 30 s. Os valores representam funções documentais diferentes e não são parâmetros operacionais homologados.

| Momento | Vazão ilustrativa | Estado lógico didático |
| --- | --- | --- |
| A | 0 m³/d | Partida; função elegível contornada |
| B | 800 m³/d | Permanece contornada |
| C | 1.400 m³/d | Não atingiu o critério histórico de reset |
| D | 1.700 m³/d | Condição de normalização alcançada |
| E | 1.700 m³/d por mais de 30 s | By-pass individual retirado |
| F | 1.200 m³/d | Nova redução com proteção supostamente ativa |
| G | Condição de trip pelo tempo programado | Possível intertravamento |

**Histerese:** a diferença entre o critério de atuação e o de normalização ajuda a evitar alternância por pequenas oscilações próximas do limite; não impede um trip real. O PLC não deve ser interpretado como mantendo contorno permanente só porque a chave geral havia sido acionada.

**Pendência:** o documento não comprova a reentrada automática de contorno após a retirada individual. Necessária confirmação da lógica implantada.

Caso crítico 4 — Manutenção 2oo3 e trip real em outro canal

Um canal A indicando trip por defeito, combinado com B e C normais, não atinge 2oo3. Se C oscilar e atingir a condição de trip, A+C poderão completar a votação, mesmo que uma indicação seja defeituosa.

Se o contorno substituir o canal A por 0 sem reconfiguração, restarão B e C e a atuação exigirá os dois, equivalente a 2oo2. Se a aplicação reconfigurar para 1oo2, um único remanescente solicitará trip. A diferença é importante para avaliar integridade e disponibilidade da proteção.

**Risco de seleção inadequada:** contornar um canal normal deixando o canal defeituoso votando pode manter uma condição degradada. Os resultados dependem estritamente da lógica implantada e devem ser tratados pela manutenção com autorização formal.

**Retorno:** somente após verificação funcional, retirada do contorno e confirmação do estado de votação e do encerramento do desvio.

### Primeiro evento e encadeamento de consequências

O PLC registra o primeiro evento de intertravamento; outros sinais podem ocorrer depois por consequência do processo. Uma baixa pressão diferencial de catalisador pode preceder alteração de circulação, queda de temperatura de reação e outros alarmes. O **primeiro sinal registrado não prova, isoladamente, a causa física fundamental**; analisar sequência de eventos, tendências e estado dos elementos finais.

O documento associa trips do conversor a ações sobre os potes de selagem da GV-3901 e os vapores do riser. A automação de vapor depende da seleção descrita para solenóide ou controlador. A conclusão deve partir da matriz causa e efeito, não de suposições sobre posição das válvulas.

### Checklist diagnóstico do CIC

1. O comando geral foi aceito?
2. Quais funções individuais estão efetivamente contornadas?
3. Quais proteções continuam habilitadas e quais estão em trip?
4. Há BAD, ponto forçado, desvio formal ou condição de máquina que impede reset?
5. Quais efeitos foram registrados e quais estados finais precisam de confirmação?

---

## 6. Rastreabilidade, conflitos e limites do modelo

Fontes utilizadas: **Intertravamento U39 maior.doc** (descritivo histórico com seções de by-pass de partida/parada, engenharia de 2005); **PE.REF.OPE.CCF.042 — Partida do J-3901** (revisão 02, 26/09/2025); **PE.REF.OPE.CCF.062 — Partida geral após manutenção** (revisão 02 indicada no histórico, 24/03/2026); **PE.REF.OPE.CCF.106 — Parada da U-39 para reparo no FO-39143 e CI-3907** (revisão 01, 25/09/2025); **tela 39GW0014** e **matriz 39GR0051** conservadas no Intertravamento Concept.

| Ponto a validar | Fontes/valores disponíveis | Conduta técnica |
| --- | --- | --- |
| Ramal inferior/superior na sequência de parada | 500 m³/d no texto operacional; 5% em sequência de engenharia; 1.259 m³/d em seção de condições | Conferir critério programado, faixa e unidade; não escolher por aproximação. |
| Reset de carga da partida | 1.637 m³/d no histórico; campo de rearme da 39GW0014 indica 3.000 m³/d | Separar reset de by-pass, rearme de trip e versão. |
| Reset do ramal superior | Texto histórico imprime "abaixo de 1.637" | Possível divergência de redação; não corrigir silenciosamente. |
| Vapor de dispersão | Histórico: 550 e 50 t/d; 39GW0014: referência a 75 t/d | Confirmar tag, tipo da função, temporização, unidade e revisão. |
| PDSLL-39018/022 | Histórico de reset: 200 gf/cm²; menção de 20 g no campo trip em captura | Confrontar função, escala e método de medição. |
| LSLL-39005 | Histórico menciona contorno; captura indica trip desabilitado à época | Verificar estado vigente e a política de habilitação. |
| Votação durante manutenção | Documento não comprova 2oo3→1oo2 ou 2oo3→2oo2 por função | Validar carta lógica e matriz vigente. |
| Reentrada automática em by-pass | Não demonstrada explicitamente após reset individual da partida | Confirmar lógica de estado, memória e permissivos no PLC. |
| Reset do estado de parada | Diferenças históricas entre condições listadas e tempos de normalização | Confrontar implementação e procedimentos atuais. |

**Regra de apresentação:** nenhuma divergência foi resolvida por inferência. Todos os números acima são *informações históricas para análise*, nunca setpoints autorizados de manobra.

As simulações a seguir são fictícias, demonstram consequências possíveis e não constituem uma cópia executável do PLC. As respostas procuram privilegiar diagnóstico e proteção, e não a execução de contornos em planta. Avaliações de engenharia, instrumentação e operação devem validar este material antes de qualquer emprego institucional.

---

## CENÁRIO 1 — Queda de vazão após normalização do by-pass de partida

**Sistema:** Conversor / HSBP-39001  
**Dificuldade:** Avançado  
**Competências:** Estados de proteção, histerese, primeiro evento e recuperação

### Situação inicial

A unidade está em processo de partida. O PLC aceitou a HSBP-39001. O ramal inferior aumentou sua vazão, atingiu a condição histórica de retirada de contorno e o FSLL-39005 voltou à proteção normal. O ramal superior continua em by-pass de partida. A temperatura de reação está em elevação, a circulação de catalisador está em estabelecimento e o J-3901 está em operação.

### Variáveis iniciais

- FSLL-39005: proteção restabelecida
- FSLL-39006: by-pass de partida
- Temperatura: em elevação
- J-3901: em operação

### Decisão 1.1

O FSLL-39005 deixou de exibir by-pass e o FSLL-39006 permanece contornado. Os dois ramais participam da mesma partida, mas não têm estados de proteção iguais.

**Pergunta:** Como interpretar os estados individuais apresentados?

- A) Ambos permanecem contornados enquanto durar a partida.
- B) O inferior está protegido, e o superior segue contornado.
- C) O inferior só volta à proteção após normalizar o superior.

**Resposta tecnicamente adequada:** B

**Fundamentação:** A retirada do contorno é individual: um ramal pode estar protegido enquanto o outro ainda permanece em by-pass de partida.

**Risco da interpretação inadequada:** Confundir o comando geral com contorno permanente impede reconhecer um trip possível do ramal inferior.

### Decisão 1.2

O ramal inferior apresenta redução inesperada de vazão, aproximando-se da condição de baixa vazão, enquanto o superior ainda normaliza.

**Pergunta:** Qual verificação é mais relevante para o diagnóstico do CIC?

- A) Concentrar a análise no ramal superior ainda em partida.
- B) Aguardar a tendência térmica antes de avaliar a vazão.
- C) Confirmar vazão, qualidade da medição e proteção ativa.

**Resposta tecnicamente adequada:** C

**Fundamentação:** Confirmação da variável, do instrumento e do estado efetivo da proteção permite avaliar risco de atuação sem presumir falha da lógica.

**Risco da interpretação inadequada:** Atraso na identificação da perda de vazão pode consumir a temporização da proteção.

### Decisão 1.3

A condição de baixa vazão persiste pelo tempo programado. O PLC registra atuação associada ao FSLL-39005 e, na sequência, a temperatura de reação diminui.

**Pergunta:** Como interpretar a cronologia dos eventos?

- A) A baixa vazão pode ser iniciadora; a queda térmica, efeito.
- B) A baixa temperatura necessariamente iniciou o intertravamento.
- C) Os dois eventos devem ser tratados como causas simultâneas.

**Resposta tecnicamente adequada:** A

**Fundamentação:** O primeiro evento registrado ajuda a localizar a proteção iniciadora; tendências anteriores e posteriores são necessárias para estabelecer causa física.

**Risco da interpretação inadequada:** Classificar um efeito tardio como causa inicial prejudica o diagnóstico e a recuperação.

### Decisão 1.4

O conversor encontra-se em trip. Algumas variáveis e elementos finais ainda não retornaram à condição esperada.

**Pergunta:** Qual é a abordagem adequada para analisar a recuperação?

- A) Rearmar o que estiver disponível e acompanhar a reação.
- B) Confirmar causa, permissivos e recuperação autorizada.
- C) Acionar a partida novamente e investigar após a retomada.

**Resposta tecnicamente adequada:** B

**Fundamentação:** Um reset não corrige necessariamente a causa. É preciso confirmar a condição segura e seguir o procedimento vigente.

**Risco da interpretação inadequada:** Rearme precipitado pode mascarar o diagnóstico ou expor sistemas a nova atuação.

### Consequência global do cenário

A interpretação incorreta do primeiro estado pode fazer o CIC acreditar que o ramal inferior continua contornado. Se a perda de vazão não for reconhecida, um intertravamento poderá ocorrer durante etapa sensível da partida. Uma recuperação sem causa esclarecida pode resultar em nova atuação.

---

## CENÁRIO 2 — Queda antecipada da temperatura durante by-pass de parada

**Sistema:** Conversor / HSBP39STOP  
**Dificuldade:** Avançado  
**Competências:** Sequência condicionada, temperatura, causa e efeito, automações associadas

### Situação inicial

A U-39 executa parada programada. O PLC aceitou HSBP39STOP, contornou o FSLL-39005 e o vapor de dispersão. Depois da redução do ramal inferior, o FSLL-39006 também entrou em contorno. Porém o ramal superior ainda não atingiu a condição prevista para liberar TSL-39010. A temperatura de reação começa a cair.

### Variáveis iniciais

- FSLL-39005: by-pass de parada
- FSLL-39006: by-pass de parada
- TSL-39010: proteção ativa
- Temperatura: em redução

### Decisão 2.1

A tendência mostra temperatura de reação em redução, enquanto o ramal superior não cumpriu a condição que libera o contorno térmico.

**Pergunta:** Qual proteção merece atenção imediata?

- A) PDSLL-39018, pois sempre precede a proteção térmica.
- B) FSLL-39003, já liberado apenas pelo comando geral.
- C) TSL-39010, que ainda pode permanecer habilitado.

**Resposta tecnicamente adequada:** C

**Fundamentação:** Na sequência histórica, a proteção de temperatura é contornada somente após o ramal superior atender a condição programada.

**Risco da interpretação inadequada:** Desconsiderar o estado de TSL-39010 pode conduzir a uma condição de trip não esperada pelo operador.

### Decisão 2.2

A temperatura continua caindo e TSL-39010 permanece protegido. A condição para sua liberação ainda não foi satisfeita.

**Pergunta:** Qual posicionamento é mais coerente com a segurança?

- A) Interromper a progressão inadequada e investigar a queda.
- B) Manter a redução, pois o PLC contornará a temperatura.
- C) Solicitar contorno de manutenção para preservar a parada.

**Resposta tecnicamente adequada:** A

**Fundamentação:** A avaliação deve priorizar a condição real e o estado da proteção antes de progredir; não presumir contorno automático.

**Risco da interpretação inadequada:** A continuidade da sequência fora de seus pressupostos pode antecipar o intertravamento.

### Decisão 2.3

Considere que a temperatura atinge o limiar de proteção antes da liberação de seu by-pass. O PLC registra o evento.

**Pergunta:** Qual interpretação é adequada?

- A) Houve falha do by-pass geral, que deveria impedir trips.
- B) A função ainda ativa pode ter atuado coerentemente.
- C) A temperatura deveria ser contornada em qualquer redução.

**Resposta tecnicamente adequada:** B

**Fundamentação:** O by-pass de parada é progressivo. A proteção de uma etapa futura pode continuar habilitada.

**Risco da interpretação inadequada:** Tratar a atuação como falha do PLC, sem reconstruir a sequência, dificulta a investigação.

### Decisão 2.4

Após o evento, aparecem indicações relacionadas a potes de selagem da GV-3901 e vapores do riser.

**Pergunta:** O que deve ser confirmado na análise dos efeitos?

- A) Recuperar primeiro a temperatura e avaliar o resto depois.
- B) Considerar as automações concluídas pelo registro de trip.
- C) Confrontar matriz e estados finais realmente observados.

**Resposta tecnicamente adequada:** C

**Fundamentação:** O documento cita respostas de potes de selagem e de vapores em trips do conversor. O estado de saída deve ser confirmado, nunca presumido.

**Risco da interpretação inadequada:** Pressupor ação física apenas com base no evento pode ocultar falha de elemento final.

### Consequência global do cenário

O by-pass geral de parada não é uma autorização ampla. Se a temperatura baixar antes da liberação de TSL-39010, poderá ocorrer trip. As consequências são avaliadas pela matriz causa e efeito do conversor e incluem sistemas associados.

---

## CENÁRIO 3 — Instrumentação em manutenção: função votada 2oo3

**Sistema:** PLC / votação 2 de 3 — caso conceitual  
**Dificuldade:** Especialista  
**Competências:** Votação, falha permanente, contorno e retorno da função de proteção

### Situação inicial

Uma função hipotética do conversor é representada por três canais independentes, A, B e C, em votação 2oo3. O canal A indica trip permanente e é suspeito de defeito; B e C estão normais. Enquanto a manutenção investiga, o canal C começa a oscilar. Uma solicitação de contorno precisa ser formalmente analisada.

### Variáveis iniciais

- Canal A: 1 (suspeita de defeito)
- Canal B: 0 (normal)
- Canal C: 0 (normal)
- Votação: 1oo3 presente; 2oo3 requerida

### Decisão 3.1

A=1 por anomalia suspeita; B=0 e C=0. Não existe ainda votação 2oo3 atingida.

**Pergunta:** Qual é a interpretação inicial mais adequada?

- A) Não houve votação, mas há degradação da confiabilidade.
- B) A função está íntegra, pois dois instrumentos estão normais.
- C) O trip já ocorreu, pois existe uma solicitação no canal A.

**Resposta tecnicamente adequada:** A

**Fundamentação:** Uma solicitação não atinge 2oo3, mas um canal anormal pode transformar a próxima indicação em voto decisivo.

**Risco da interpretação inadequada:** Confundir ausência de trip com integridade total da função omite um estado degradado.

### Decisão 3.2

O canal C oscila e passa a indicar trip em alguns instantes; A continua solicitando trip.

**Pergunta:** O que a votação básica 2oo3 pode produzir?

- A) Nenhum trip, porque A já era defeituoso antes.
- B) Trip quando A e C solicitarem simultaneamente.
- C) Atuação apenas se o canal B também sair do normal.

**Resposta tecnicamente adequada:** B

**Fundamentação:** Na votação 2oo3 conceitual, dois canais com valor 1 satisfazem a condição, mesmo se uma indicação for defeituosa.

**Risco da interpretação inadequada:** Desconsiderar o canal defeituoso pode levar a surpresa com trip durante oscilação de um segundo canal.

### Decisão 3.3

A manutenção solicita contornar A. O desvio foi submetido à avaliação e a equipe precisa saber como a votação remanescente será interpretada.

**Pergunta:** O que determina a votação após o contorno de A?

- A) A votação permanece 2oo3 em qualquer arquitetura.
- B) A configuração muda sempre para 1oo2 automaticamente.
- C) Validar a implementação específica da lógica do PLC.

**Resposta tecnicamente adequada:** C

**Fundamentação:** A arquitetura pode equivaler a 2oo2, reconfigurar para 1oo2 ou usar outro tratamento. Não extrapolar a partir da votação original.

**Risco da interpretação inadequada:** Supor uma reconfiguração inexistente pode tornar errada a avaliação de proteção residual.

### Decisão 3.4

O instrumento A foi reparado e voltou a indicar valor coerente. A tela ainda sinaliza by-pass de manutenção da função.

**Pergunta:** O que caracteriza a conclusão correta do desvio?

- A) Verificar, retirar o contorno e confirmar a proteção.
- B) Manter o contorno até a próxima janela de manutenção.
- C) Encerrar ao estabilizar o sinal, sem verificar a votação.

**Resposta tecnicamente adequada:** A

**Fundamentação:** O restabelecimento exige validação funcional e retirada formal do desvio, não apenas o retorno aparente do sinal.

**Risco da interpretação inadequada:** Manter contorno inadvertido pode deixar camada de segurança degradada após manutenção.

### Consequência global do cenário

Há dois riscos: trip indevido pela combinação de falha permanente e segunda indicação anormal, e perda de integridade de proteção por contorno inadequado. O resultado real depende da lógica de votação implantada no PLC.

---

## CENÁRIO 4 — Desistência de parada e transição para operação

**Sistema:** Conversor / HSBP39STOP ↔ HSBP-39001  
**Dificuldade:** Especialista  
**Competências:** Transições de estados, reset, BAD, confirmação da proteção

### Situação inicial

Uma parada programada foi iniciada com HSBP39STOP. A carga foi parcialmente reduzida; FSLL-39005 e FSLL-39006 estão em by-pass de parada; a temperatura e a circulação de catalisador encontram-se abaixo da condição usual. Por decisão de supervisão, a equipe avalia cancelar a parada e retornar à operação.

### Variáveis iniciais

- By-pass de parada: ativo
- FSLL-39005/006: contornados
- Temperatura: reduzida
- Vazão de ar: em redução

### Decisão 4.1

O estado de parada está ativo e as variáveis do conversor apresentam condições transitórias. A supervisão decide interromper a parada.

**Pergunta:** O que deve ser esclarecido antes da recuperação?

- A) A carga deve recuperar primeiro, para eliminar os contornos.
- B) A transição de estados e permissivos precisa ser validada.
- C) O estado de parada pode permanecer até operação normal.

**Resposta tecnicamente adequada:** B

**Fundamentação:** O documento histórico descreve a transição de by-pass de parada para partida, evitando exposição prematura de funções em trip.

**Risco da interpretação inadequada:** Elevar variáveis sem compreender a transição pode retirar contornos antes de outras condições estarem regularizadas.

### Decisão 4.2

A vazão de um ramal começa a aumentar, enquanto temperatura e outras funções ainda se encontram fora das condições usuais.

**Pergunta:** Qual risco lógico a equipe deve considerar?

- A) Normalizar a vazão restabelece todas as demais funções.
- B) O ramal normalizado mantém todos os contornos de parada.
- C) A normalização parcial pode retirar proteções de parada.

**Resposta tecnicamente adequada:** C

**Fundamentação:** O retorno de certas variáveis pode alterar o estado do by-pass de parada. Uma condição isolada não garante prontidão global.

**Risco da interpretação inadequada:** Retirada antecipada de estado de parada pode expor outras variáveis às suas funções ativas.

### Decisão 4.3

Durante a avaliação, o CIC identifica instrumento de proteção em BAD. O comando de partida não é aceito.

**Pergunta:** O que melhor explica o impedimento histórico?

- A) O BAD pode impedir aceitação; exige diagnóstico autorizado.
- B) O PLC deve ignorar BAD após uma parada programada.
- C) BAD interfere apenas no desvio de manutenção, não na partida.

**Resposta tecnicamente adequada:** A

**Fundamentação:** O descritivo histórico descreve BAD como impedimento para o by-pass de partida; um reset não substitui investigação da qualidade de sinal.

**Risco da interpretação inadequada:** Tratar falha de qualidade como simples atraso de processo pode desconsiderar deficiência instrumental.

### Decisão 4.4

A anomalia foi tratada por equipe autorizada; o sistema volta a permitir a avaliação de recuperação. Ainda restam indicadores de contorno.

**Pergunta:** Qual confirmação deve encerrar a transição lógica?

- A) Confirmar variáveis principais, sem revisar contornos ativos.
- B) Verificar proteções, contornos, permissivos e elementos.
- C) Assumir normalização completa após comando aceito.

**Resposta tecnicamente adequada:** B

**Fundamentação:** Um comando aceito não significa que todas as funções estejam protegidas ou os elementos finais estejam na posição segura.

**Risco da interpretação inadequada:** Contornos esquecidos ou permissivos não checados deixam riscos residuais na recuperação.

### Consequência global do cenário

A normalização de variáveis durante transição pode retirar o estado de parada quando outras funções permanecem em trip. O histórico prevê transição pela lógica de partida; sua execução prática deve seguir procedimento e permissivos vigentes.

---

## CENÁRIO 5 — Trip do conversor e sequência de efeitos associados

**Sistema:** Conversor / PDSLL-39022, GV-3901 e sistemas integrados  
**Dificuldade:** Especialista  
**Competências:** Primeiro evento, causa física, registros e recuperação

### Situação inicial

O conversor opera em condição estável. Aparece queda súbita de pressão diferencial associada ao catalisador regenerado e o PLC registra PDSLL-39022 como primeiro evento. Em seguida ocorrem alterações de circulação, temperatura de reação, vazão e sinais dos sistemas integrados.

### Variáveis iniciais

- PDSLL-39022: primeiro evento registrado
- Conversor: condição de trip
- Temperatura: tendência descendente
- Outros alarmes: posteriores ao primeiro evento

### Decisão 5.1

O PLC registrou PDSLL-39022 como primeiro evento; ainda não foi confirmada a causa física da alteração de ΔP.

**Pergunta:** Como classificar tecnicamente esse primeiro registro?

- A) É confirmação de travamento mecânico da L-3902.
- B) É prova de reversão de fluxo no catalisador.
- C) É o evento registrado, não a causa física.

**Resposta tecnicamente adequada:** C

**Fundamentação:** O primeiro evento aponta a solicitação inicial registrada. Para concluir mecanismo físico é preciso confrontar tendências, instrumentação e pressões do sistema.

**Risco da interpretação inadequada:** Atribuir causa física apenas pelo tag pode levar a diagnóstico prematuro e incorreto.

### Decisão 5.2

O conversor entra em trip e o CIC observa indicações relativas aos potes de selagem da GV-3901 e vapores do riser.

**Pergunta:** Qual avaliação corresponde ao descritivo da U-39?

- A) Confrontar a resposta dos potes e vapores com a matriz.
- B) Aguardar obrigatoriamente o trip do J-3901 para isso ocorrer.
- C) Priorizar reset dos controladores antes das verificações.

**Resposta tecnicamente adequada:** A

**Fundamentação:** O PLC envia sinal de trip do conversor ao SDCD; a lógica associada pode alterar potes e vapor, com comportamento condicionado à seleção.

**Risco da interpretação inadequada:** Presumir atuação efetiva de uma válvula sem confirmação de seu estado final pode ocultar condição insegura.

### Decisão 5.3

O SDCD registra queda térmica, mudanças na vazão e ΔP e alarmes de grandes máquinas após o evento inicial.

**Pergunta:** Qual método é o mais confiável para separar causa e efeito?

- A) Escolher como causa o alarme de maior gravidade.
- B) Correlacionar eventos, tendências e elementos finais.
- C) Tratar todas as ocorrências como causas independentes.

**Resposta tecnicamente adequada:** B

**Fundamentação:** A sequência temporal e as evidências físicas ajudam a distinguir causa iniciadora, propagação e efeito secundário.

**Risco da interpretação inadequada:** Atribuir todos os alarmes a causas separadas impede reconhecer o encadeamento do evento.

### Decisão 5.4

O conversor está parado. Persistem estados de trip memorizados e elementos finais aguardam avaliação.

**Pergunta:** O que fundamenta uma recuperação operacional autorizada?

- A) Rearmar inicialmente cada elemento que aceitar comando.
- B) Usar by-pass de partida para apagar registros e seguir.
- C) Confirmar causa, proteção, permissivos e rearme.

**Resposta tecnicamente adequada:** C

**Fundamentação:** A recuperação depende de diagnóstico e condições seguras; reset de primeiro evento e rearme de saídas não corrigem falhas por si.

**Risco da interpretação inadequada:** Rearme sem análise da causa pode desencadear nova atuação e exposição desnecessária.

### Consequência global do cenário

O primeiro evento aponta a função que iniciou o registro de proteção, mas não prova a causa física. Trips do conversor podem produzir efeitos nos potes da GV-3901, vapores do riser e equipamentos associados; a conclusão depende da matriz e do registro efetivo.

---

## Bibliografia e ressalva

Intertravamento U39 maior.doc (histórico de 2005), PE.REF.OPE.CCF.042, PE.REF.OPE.CCF.062, PE.REF.OPE.CCF.106, telas 39GW0014 e 39GR0051. Os dados historicamente divergentes permanecem identificados; a lógica atual precisa de validação de engenharia/instrumentação.
