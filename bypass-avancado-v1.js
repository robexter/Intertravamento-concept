/* U-39 Intertravamento Concept — extensão não invasiva do módulo de by-pass.
   Injetada como uma nova tela existente no modelo one-page, sem remover seções.
   Não consulta nem comanda PLC/SDCD. */
(()=>{
'use strict';
const D=window.U39_BYPASS_MATERIAL;
if(!D){console.error('O arquivo bypass-avancado-conteudo-v1.js deve ser carregado antes do módulo.');return;}
if(document.getElementById('page-bypass-avancado'))return;
const $=(id)=>document.getElementById(id);
const esc=(value)=>String(value).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const shuffle=(a)=>{const o=a.slice();for(let i=o.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[o[i],o[j]]=[o[j],o[i]];}return o;};
const nav=$('nav'), old=$('page-bypass'), container=document.querySelector('main.content');
if(!nav||!old||!container){console.error('Estrutura de navegação do Concept não encontrada; módulo não foi instalado.');return;}
const navButton=document.createElement('button');navButton.dataset.page='bypass-avancado';navButton.type='button';navButton.innerHTML='<span class="num">06A</span> Lógica completa dos by-passes <span class="nav-new">NOVO</span>';
const bypassLink=nav.querySelector('[data-page="bypass"]');bypassLink?bypassLink.after(navButton):nav.append(navButton);
const page=document.createElement('section');page.className='screen';page.id='page-bypass-avancado';page.setAttribute('aria-label','Módulo integral de by-passes e simulação CIC');
page.innerHTML=`<span class="kicker">INTERTRAVAMENTO CONCEPT · MÓDULO COMPLEMENTAR</span>
<h1>By-pass de partida, parada e manutenção</h1>
<p class="ax-lead">Conteúdo técnico integral, estados de PLC, causa e efeito, votação e 5 cenários CIC com 20 decisões encadeadas. Nenhum conteúdo anterior do Concept foi substituído.</p>
<div class="ax-banner" role="note"><strong>Protótipo educacional não validado.</strong> Interações fictícias; não executam comandos de by-pass, partida, parada, reset ou manutenção. Os valores e tags históricos devem ser comparados com a carta lógica do PLC e procedimentos vigentes antes de uso operacional. O comportamento não comprovado é identificado explicitamente.</div>
<div class="ax-toolbar"><span class="ax-pill">3 modalidades de by-pass</span><span class="ax-pill">5 cenários completos</span><span class="ax-pill">20 decisões</span><span class="ax-pill">Primeiro evento e reset</span><span class="ax-pill">Painel de estados + votação 2oo3</span><span class="ax-pill ax-risk">Pontos de validação pendentes</span></div>
<div class="ax-ctrl" id="axTopTabs" role="tablist" aria-label="Assuntos da lógica avançada">
 <button class="ax-tab" role="tab" id="axTabTheory" aria-controls="axTheory" aria-selected="true" data-ax-tab="theory">Conteúdo integral</button>
 <button class="ax-tab" role="tab" id="axTabFirst" aria-controls="axFirst" aria-selected="false" data-ax-tab="first">Primeiro evento · reset</button>
 <button class="ax-tab" role="tab" id="axTabLogic" aria-controls="axLogic" aria-selected="false" data-ax-tab="logic">Painel lógico interativo</button>
 <button class="ax-tab" role="tab" id="axTabTimeline" aria-controls="axTimeline" aria-selected="false" data-ax-tab="timeline">Fluxo interativo</button>
 <button class="ax-tab" role="tab" id="axTabCases" aria-controls="axCases" aria-selected="false" data-ax-tab="cases">Cenários e decisões CIC</button>
 <button class="ax-tab" role="tab" id="axTabReview" aria-controls="axReview" aria-selected="false" data-ax-tab="review">Resultados e revisão</button>
</div>
<div id="axTheory" class="ax-panel" role="tabpanel" aria-labelledby="axTabTheory"><div class="ax-toolbar" id="axDocTabs" aria-label="Capítulos do conteúdo integral"></div><div id="axDocument"></div></div>
<div id="axFirst" class="ax-panel" role="tabpanel" aria-labelledby="axTabFirst" hidden>
<h2 class="ax-h">Primeiro evento: onde consultar a referência histórica de reset?</h2>
<p class="ax-lead">Selecione o sistema. O simulador mostra o registro inicial, a referência documental e os cuidados de diagnóstico. <strong>Nenhum botão abaixo corresponde a um comando do PLC.</strong></p>
<div class="ax-toolbar" id="axFirstEquip" role="group" aria-label="Selecionar equipamento para estudar reset de primeiro evento"></div>
<div class="ax-card" id="axFirstInfo" aria-live="polite"></div>
<div class="ax-card"><h3>Fluxo de interpretação — sem execução de reset</h3><div class="ax-timeline" id="axFirstStages"></div><div id="axFirstStageDetail" class="ax-note" aria-live="polite"></div><div class="ax-toolbar"><button type="button" id="axFirstDoc" class="ax-btn">Ler conteúdo integral do primeiro evento</button><button type="button" id="axFirstCase" class="ax-btn">Estudar o cenário 5 (trip e primeiro evento)</button></div></div>
<div class="ax-banner"><strong>Atenção:</strong> reconhecimento no SDCD, limpeza do primeiro evento, reset de trip, rearme de elementos finais e partida da máquina são coisas diferentes. Priorize a preservação das evidências do primeiro evento e a investigação da causa, antes de qualquer comando autorizado.</div>
</div>
<div id="axLogic" class="ax-panel" role="tabpanel" aria-labelledby="axTabLogic" hidden>
 <h2 class="ax-h">Mesa de diagnóstico lógico · proteção por estado</h2>
 <p class="ax-lead">Explore fotografias conceituais da sequência de partida, parada e trip. O quadro identifica quais funções <strong>podem estar em by-pass</strong>, quais seguem protegidas e quais dependem de confirmação no PLC; não é uma reprodução da lógica implantada.</p>
 <div id="axStateButtons" class="ax-logic-switch" role="group" aria-label="Selecionar etapa do estado de proteção"></div>
 <div id="axStateDisplay" class="ax-card" aria-live="polite"></div>
 <div class="ax-logic-actions"><button class="ax-btn" type="button" id="axStatePrev">← Estado anterior</button><button class="ax-btn ax-primary" type="button" id="axStateNext">Próximo estado →</button><button class="ax-btn" type="button" id="axOpenStopCase">Explorar cenário de parada</button></div>
 <h2 class="ax-h">Laboratório de votação — 2oo3 e manutenção</h2>
 <p class="ax-lead">Altere os sinais A, B e C e compare as arquiteturas hipotéticas. <strong>Os modos de manutenção são modelos matemáticos, NÃO especificações do PLC U-39.</strong></p>
 <div class="ax-card"><div class="ax-toolbar"><label for="axVoteMode"><strong>Arquitetura de exemplo:</strong></label><select class="ax-select" id="axVoteMode"><option value="base">Original: 2oo3 (A, B e C)</option><option value="fixed">Hipótese: A fixado em normal → 2oo2 B/C</option><option value="reconfig">Hipótese: A excluído → 1oo2 B/C</option></select></div>
 <div id="axVoteChannels" class="ax-vote-layout" role="group" aria-label="Sinais dos canais"></div><div id="axVoteResult" class="ax-vote-result" aria-live="polite"></div>
 <div class="ax-toolbar"><button type="button" id="axVoteReset" class="ax-btn">Restaurar sinais para normal</button><button type="button" id="axVoteExample" class="ax-btn">Testar A indicando trip indevido e C em trip</button></div></div>
 <h2 class="ax-h">Diagnóstico do primeiro evento — checklist</h2>
 <p class="ax-lead">Marque as evidências reunidas. O indicador abaixo mostra apenas a <strong>completude da investigação didática</strong>, nunca a liberação para reset ou para partida.</p>
 <div class="ax-card"><div id="axChecklist" class="ax-checklist"></div><div id="axChecklistStatus" class="ax-note" role="status"></div><div class="ax-toolbar"><button class="ax-btn" type="button" id="axChecklistReset">Limpar checklist</button><button class="ax-btn" type="button" id="axChecklistFirst">Consultar métodos de primeiro evento →</button></div></div>
</div>
<div id="axTimeline" class="ax-panel" role="tabpanel" aria-labelledby="axTabTimeline" hidden><h2 class="ax-h">Explore cada estado e seus permissivos</h2><p class="ax-lead">Selecione uma modalidade. Depois, toque em cada etapa para ver condições, sinais e consequências. Esta linha do tempo é conceitual e <strong>não substitui</strong> o diagrama de lógica validado.</p><div id="axTimelineTabs" class="ax-toolbar"></div><div class="ax-timeline" id="axTimelineSteps"></div><div class="ax-card" id="axTimelineDetail" aria-live="polite"></div><button class="ax-btn" type="button" data-goto="bypass">Comparar com a tela original 39GW0014 ↗</button></div>
<div id="axCases" class="ax-panel" role="tabpanel" aria-labelledby="axTabCases" hidden><h2 class="ax-h">Simulação CIC · decisões encadeadas</h2><p class="ax-lead">Cinco situações técnicas, cada uma com quatro decisões. Escolhas anteriores modificam o estado fictício e as informações da etapa seguinte. As alternativas mudam de ordem a cada tentativa.</p>
<div class="ax-toolbar"><label for="axScenario">Cenário:</label><select id="axScenario" class="ax-select" aria-label="Selecionar cenário"></select></div>
<div class="ax-progress-zone" id="axScenarioProgress" aria-label="Andamento das situações CIC"></div><div class="ax-toolbar" role="group" aria-label="Modo de aprendizagem"><button type="button" id="axModeTrain" class="ax-btn ax-primary" aria-pressed="true">Treinamento (feedback por etapa)</button><button type="button" id="axModeExam" class="ax-btn" aria-pressed="false">Avaliação CIC (gabarito ao fim)</button><button type="button" id="axSave" class="ax-btn" title="Salva as decisões apenas neste navegador">Salvar andamento</button><button type="button" id="axLoad" class="ax-btn" title="Recupera respostas salvas neste navegador">Retomar andamento</button><button type="button" id="axRestart" class="ax-btn">Reiniciar os 5 cenários ↻</button></div>
<p class="ax-footnote">Trocar entre Treinamento e Avaliação CIC reinicia as decisões desta tentativa. Salve o andamento antes de trocar de modo.</p><div class="ax-save-status" id="axSaveStatus" role="status" aria-live="polite">Seu progresso só será gravado ao tocar em “Salvar andamento”, neste navegador.</div><div id="axSimContent" aria-live="polite"></div></div>
<div id="axReview" class="ax-panel" role="tabpanel" aria-labelledby="axTabReview" hidden><div id="axScoreReview" class="ax-card"></div><div class="ax-toolbar"><button class="ax-btn ax-primary" id="axBackToSim" type="button">Retornar aos cenários</button><button class="ax-btn" type="button" data-ax-doc="validacao">Conferir pendências de validação</button></div></div>
<div class="ax-sources">Fontes internas: <em>Intertravamento U39 maior.doc</em> (descritivo de 2005), PE.REF.OPE.CCF.042 / .062 / .106, telas 39GW0014 e 39GR0051. Consulte o capítulo <strong>Fontes e divergências</strong> para as pendências identificadas.</div>`;
old.after(page);
const originalLink=document.createElement('div');originalLink.className='ax-banner';originalLink.innerHTML='<strong>Novo módulo complementar disponível:</strong> sequência completa de by-pass de partida, parada e manutenção, quatro análises críticas, votação 2oo3 e cinco cenários encadeados (20 decisões). <button type="button" class="ax-btn ax-primary" data-goto="bypass-avancado">Abrir conteúdo integral e simulações →</button>';
old.insertBefore(originalLink,old.children[3]||null);
function activateTab(which){
if(which==='review')renderReview();
for(const button of page.querySelectorAll('[data-ax-tab]')){const yes=button.dataset.axTab===which;button.setAttribute('aria-selected',String(yes));button.tabIndex=yes?0:-1;}
for(const [id,key] of [['axTheory','theory'],['axFirst','first'],['axLogic','logic'],['axTimeline','timeline'],['axCases','cases'],['axReview','review']])$(id).hidden=key!==which;
}
page.querySelector('#axTopTabs').addEventListener('click',e=>{const b=e.target.closest('[data-ax-tab]');if(b)activateTab(b.dataset.axTab);});
let docIndex=0;
function renderDoc(){
$('axDocTabs').innerHTML=D.sections.map((s,i)=>`<button type="button" class="ax-btn ${i===docIndex?'ax-primary':''}" data-ax-doc="${esc(s.id)}" aria-pressed="${i===docIndex}">${esc(s.label)}</button>`).join('');
const sec=D.sections[docIndex];$('axDocument').innerHTML=`<div class="ax-card"><h2 class="ax-h">${esc(sec.title)}</h2>${sec.html}<div class="ax-sources">${esc(D.version)} · Descritivo histórico; nenhuma condição foi homologada aqui.</div></div>`;
}
$('axDocTabs').addEventListener('click',e=>{const b=e.target.closest('[data-ax-doc]');if(!b)return;docIndex=D.sections.findIndex(s=>s.id===b.dataset.axDoc);if(docIndex<0)docIndex=0;renderDoc();});
page.querySelector('#axReview').addEventListener('click',e=>{let b=e.target.closest('[data-ax-doc]');if(b){docIndex=D.sections.findIndex(s=>s.id===b.dataset.axDoc);renderDoc();activateTab('theory');page.scrollIntoView({behavior:'smooth',block:'start'});}});
renderDoc();
// Primeiro evento: a UI apresenta referências históricas de recuperação da indicação;
// nenhum botão executa operação no SDCD, PLC ou máquina.
let firstEq=0,firstStage=0;
const firstStages=[
['Registro','Identificar e preservar primeiro evento, hora, tag e eventos posteriores antes de limpar qualquer indicação.'],
['Diagnóstico','Confrontar tendência, instrumento, BAD, primeiro evento e estado de elementos finais; não presumir causa física a partir do tag.'],
['Referência documental','A referência de limpeza depende do conjunto escolhido: conversor, grandes máquinas e TG-3901 são diferentes.'],
['Condições e autorização','Conferir permissivos, impedimentos, procedimento vigente e autorização antes de eventual recuperação.'],
['Após uma recuperação autorizada','Confirmar memória, trips remanescentes, disponibilidade real das proteções e estados das válvulas.']
];
function renderFirst(){
const x=D.firstEvents[firstEq];
$('axFirstEquip').innerHTML=D.firstEvents.map((it,i)=>`<button type="button" class="ax-btn ${i===firstEq?'ax-primary':''}" aria-pressed="${i===firstEq}" data-ax-equipment="${i}">${esc(it.label)}</button>`).join('');
$('axFirstInfo').innerHTML=`<span class="ax-pill">Referência do descritivo histórico</span><h3 style="margin-top:14px">${esc(x.name)}</h3><div class="ax-fe-grid"><div class="ax-note"><strong>Origem registrada:</strong><p>${esc(x.origin)}</p></div><div class="ax-note"><strong>Como o documento descreve a retirada da indicação:</strong><p>${esc(x.historic)}</p></div><div class="ax-note"><strong>Impedimentos e validação:</strong><p>${esc(x.guard)}</p></div><div class="ax-note"><strong>O que permanece distinto:</strong><p>${esc(x.separate)}</p></div></div>`;
$('axFirstStages').innerHTML=firstStages.map((a,i)=>`<button type="button" data-ax-first-stage="${i}" aria-pressed="${i===firstStage}"><span>Etapa ${i+1}</span>${esc(a[0])}</button>`).join('');
$('axFirstStageDetail').innerHTML=`<strong>${esc(firstStages[firstStage][0])}:</strong> ${esc(firstStages[firstStage][1])}`;
}
$('axFirstEquip').addEventListener('click',e=>{const b=e.target.closest('[data-ax-equipment]');if(!b)return;firstEq=Number(b.dataset.axEquipment);firstStage=0;renderFirst();});
$('axFirstStages').addEventListener('click',e=>{const b=e.target.closest('[data-ax-first-stage]');if(!b)return;firstStage=Number(b.dataset.axFirstStage);renderFirst();});
$('axFirstDoc').addEventListener('click',()=>{docIndex=D.sections.findIndex(s=>s.id==='primeiro-evento');renderDoc();activateTab('theory');page.scrollIntoView({block:'start',behavior:'smooth'});});
$('axFirstCase').addEventListener('click',()=>{sim.scenario=4;sim.step=0;sim.selected=null;sim.order=null;sim.risk=0;sim.answers=sim.answers.filter(x=>x.scenario!==4);$('axScenario').value='4';renderSim();activateTab('cases');page.scrollIntoView({block:'start',behavior:'smooth'});});
renderFirst();
// Linha do tempo: critérios qualitativos. Pontos numéricos e ambiguidade estão na teoria integral.
const flows={
start:{label:'Partida • HSBP-39001',stages:[
['Solicitação e permissivos','O operador solicita HSBP-39001. O PLC avalia impedimentos, inclusive sinal BAD configurado e a condição necessária do J-3901 quando o conversor está em trip.','Pedido de comando não garante sua aceitação.'],
['Identificação das funções','O PLC identifica quais proteções elegíveis se encontram em trip. O documento histórico não descreve contorno irrestrito de todas as funções.','A lista de funções pode diferir segundo seu estado inicial.'],
['Contornos e sinalização','As funções aceitas passam a by-pass de partida; o SDCD identifica o processo de partida e mostra os contornos ativos.','Consultar sinalização individual; botão geral é insuficiente.'],
['Estabilização das variáveis','Carga, dispersão, ar, temperatura, diferenciais de catalisador e nível evoluem conforme a operação.','A sequência real é definida por procedimento, condições físicas e permissivos.'],
['Reset individual automático','Cada função sai de by-pass quando atende seus critérios documentados. A variável normalizada pode voltar a participar da proteção antes de outras.','Não inferir reentrada automática no contorno após nova queda.'],
['Recuperação pós-trip','Primeiro evento e elementos finais possuem requisitos adicionais de análise e reset.','Não substituir investigação da causa por rearme.']]},
stop:{label:'Parada • HSBP39STOP',stages:[
['Solicitação e bloqueio mútuo','O operador solicita HSBP39STOP; o histórico exige ausência de funções em by-pass de partida.','Se ainda existe estado de partida, o comando de parada pode ser recusado.'],
['Primeiros contornos','FSLL-39005 (ramal inferior) e proteção de vapor de dispersão recebem by-pass de parada.','O restante das proteções permanece condicionado às etapas seguintes.'],
['Condição do ramal inferior','Ao satisfazer a condição de redução do ramal inferior, libera-se a proteção FSLL-39006 do superior.','Confirmar a sinalização; valores históricos dessa condição divergem.'],
['Condição do ramal superior','Ao satisfazer a condição de redução do ramal superior, a lógica prevê contornar TSL-39010 e LSLL-39005 quando aplicável.','Queda térmica prematura pode ocasionar trip.'],
['Temperatura de reação','Com o by-pass de temperatura ativo e condição térmica prevista, são liberados PDSLL-39018/022 e FSLL-39003.','PDSLL e ar ainda protegidos antes desse marco.'],
['Vazão de ar e J-3901','Com vazão de ar na condição documentada, a lógica histórica prevê contorno relacionado à parada do J-3901.','Não interpretar como retirada de proteções intrínsecas da máquina.'],
['Desistência/reset','O histórico prevê transição para by-pass de partida e reset por condições de processo.','Evitar recuperação de carga sem tratar a transição de estados.']]},
maint:{label:'Manutenção • função individual',stages:[
['Identificação','Reconhecer canal, tag, causa da falha e função instrumentada em que participa.','Falha BAD não comprova por si só valor real do processo.'],
['Análise e autorização','Avaliar alteração de risco, capacidade residual, eventual proteção compensatória, APR/ADTCP quando aplicáveis.','Não interpretar by-pass como gesto administrativo trivial.'],
['Liberação e seleção','A manutenção habilita a intervenção conforme o sistema do PLC e confirma canal efetivo.','O documento histórico descreve chave física de manutenção.'],
['Votação degradada','Conferir como o contorno altera a votação, se mantém, reconfigura ou substitui um canal.','Não presumir 1oo2 ou 2oo2 sem lógica atual.'],
['Teste e encerramento','Após correção, testar, retirar o desvio autorizado, confirmar função e encerramento formal.','Sinal normal não é sinônimo de proteção restabelecida.']]}
};
let flowKey='start',flowStep=0;
function renderFlow(){
$('axTimelineTabs').innerHTML=Object.entries(flows).map(([key,v])=>`<button type="button" class="ax-btn ${key===flowKey?'ax-primary':''}" data-flow="${key}" aria-pressed="${key===flowKey}">${esc(v.label)}</button>`).join('');
const stages=flows[flowKey].stages;
$('axTimelineSteps').innerHTML=stages.map(([title],i)=>`<button type="button" aria-pressed="${i===flowStep}" data-step="${i}"><span>ETAPA ${i+1} / ${stages.length}</span>${esc(title)}</button>`).join('');
const [title,desc,risk]=stages[flowStep];
$('axTimelineDetail').innerHTML=`<span class="ax-pill">Etapa ${flowStep+1} de ${stages.length}</span><h3 style="margin-top:12px">${esc(title)}</h3><p>${esc(desc)}</p><div class="ax-note">${esc(risk)}</div>`;
}
$('axTimelineTabs').addEventListener('click',e=>{const b=e.target.closest('[data-flow]');if(b){flowKey=b.dataset.flow;flowStep=0;renderFlow();}});
$('axTimelineSteps').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(b){flowStep=+b.dataset.step;renderFlow();}});
renderFlow();
// V0.4.4 · Modelos exclusivamente didáticos: nenhum estado equivale a validação em PLC.
const logicStates=[
 {title:'Operação normal (referência)',chip:'Proteções segundo sua habilitação real',status:{'FSLL-39005':'proteção prevista','FSLL-39006':'proteção prevista','FSLL-39044':'proteção prevista','TSL-39010':'proteção prevista','PDSLL-39018':'proteção prevista','PDSLL-39022':'proteção prevista','FSLL-39003':'proteção prevista'},meaning:'Sem contornos intencionais de partida ou parada. Uma função pode estar desabilitada ou alterada pela revisão do PLC; o quadro não comprova habilitação efetiva.',risk:'A comparação com a tela e a matriz vigente continua obrigatória.'},
 {title:'Partida aceita (ilustração)',chip:'Somente funções elegíveis em trip',status:{'FSLL-39005':'contorno possível','FSLL-39006':'contorno possível','FSLL-39044':'contorno possível','TSL-39010':'contorno possível','PDSLL-39018':'contorno possível','PDSLL-39022':'contorno possível','FSLL-39003':'contorno possível'},meaning:'O histórico associa a HSBP-39001 ao contorno das funções elegíveis em trip. É necessário conferir a indicação individual: nenhuma destas sete funções é automaticamente garantida em by-pass.',risk:'BAD e trip ativo do J-3901 podem impedir a aceitação; não significa trip geral inibido.'},
 {title:'Partida: um ramal normalizado',chip:'Retirada individual do contorno',status:{'FSLL-39005':'proteção restabelecida no exemplo','FSLL-39006':'contorno possível','FSLL-39044':'a verificar','TSL-39010':'a verificar','PDSLL-39018':'a verificar','PDSLL-39022':'a verificar','FSLL-39003':'a verificar'},meaning:'Neste exemplo hipotético, o FSLL-39005 já cumpriu seu critério de retirada e o FSLL-39006 ainda não. A baixa vazão posterior do ramal inferior pode ser reconhecida pelo intertravamento.',risk:'O histórico não comprova reativação automática do contorno após nova queda de vazão.'},
 {title:'Parada: comando aceito',chip:'Primeiros contornos',status:{'FSLL-39005':'em by-pass de parada no exemplo','FSLL-39044':'em by-pass de parada no exemplo','FSLL-39006':'proteção mantida','TSL-39010':'proteção mantida','PDSLL-39018':'proteção mantida','PDSLL-39022':'proteção mantida','FSLL-39003':'proteção mantida'},meaning:'O descritivo prevê contornos iniciais do ramal inferior e vapor de dispersão; a liberação do ramal superior depende de uma condição posterior.',risk:'Reduzir o superior antes da transição pode gerar solicitação de trip da função ainda ativa.'},
 {title:'Parada: ramais reduzidos',chip:'Transições dependentes da sequência',status:{'FSLL-39005':'em by-pass','FSLL-39044':'em by-pass','FSLL-39006':'contorno após condição inferior','TSL-39010':'contorno após condição superior','PDSLL-39018':'ainda condicionado','PDSLL-39022':'ainda condicionado','FSLL-39003':'ainda condicionado'},meaning:'Ao cumprir os critérios previstos, outras funções são progressivamente liberadas. O estado individual deve ser confirmado; PDSLL e ar não são contornados apenas porque as cargas reduziram.',risk:'Queda prematura de temperatura ou circulação fora da sequência conserva possibilidade de trip.'},
 {title:'Trip: primeiro evento registrado',chip:'Investigar antes de rearme',status:{'Primeiro evento':'memorizado (modelo)','Instrumentação':'BAD? qualidade a verificar','Efeitos na matriz':'verificar individualmente','Elemento final':'posição a confirmar','Proteções remanescentes':'não presumir contornos'},meaning:'Uma indicação de primeiro evento registra a primeira solicitação conhecida. Não comprova causa física. Alarmes posteriores podem ser consequências da parada.',risk:'Reset de indicação, rearme de trip e partida do equipamento são operações distintas.'}
];
let logicStep=0;
function stateClass(value){return /by-pass|contorno possível|contorno após|em by-pass/i.test(value)?'ax-logic-bypass':/proteção|restabelecida/i.test(value)?'ax-logic-armed':'ax-logic-review';}
function renderLogic(){
$('axStateButtons').innerHTML=logicStates.map((x,i)=>`<button type="button" aria-pressed="${i===logicStep}" data-ax-state="${i}"><small>${i+1} / ${logicStates.length}</small><strong>${esc(x.title)}</strong></button>`).join('');
const st=logicStates[logicStep];$('axStateDisplay').innerHTML=`<span class="ax-pill">${esc(st.chip)}</span><h3 class="ax-h">${esc(st.title)}</h3><p>${esc(st.meaning)}</p><div class="ax-state-grid">${Object.entries(st.status).map(([tag,status])=>`<div class="ax-status-cell ${stateClass(status)}"><strong>${esc(tag)}</strong><span>${esc(status)}</span></div>`).join('')}</div><div class="ax-note"><strong>Limite de interpretação:</strong> ${esc(st.risk)}</div>`;
$('axStatePrev').disabled=logicStep===0;$('axStateNext').disabled=logicStep===logicStates.length-1;
}
$('axStateButtons').addEventListener('click',e=>{const b=e.target.closest('[data-ax-state]');if(!b)return;logicStep=Number(b.dataset.axState);renderLogic();});
$('axStatePrev').addEventListener('click',()=>{logicStep=Math.max(0,logicStep-1);renderLogic();});
$('axStateNext').addEventListener('click',()=>{logicStep=Math.min(logicStates.length-1,logicStep+1);renderLogic();});
$('axOpenStopCase').addEventListener('click',()=>{openScenario(1);activateTab('cases');});
renderLogic();
// Bancada: sinal de trip=1; BAD não é sinônimo de trip nem de normal.
const voteSignal=['normal','normal','normal'];
const voteLabels={normal:'Normal (0)',trip:'Solicita trip (1)',bad:'BAD / inválido'};
function voteEvaluate(){let mode=$('axVoteMode').value;
let effective=mode==='base'?voteSignal:voteSignal.slice(1);
if(effective.includes('bad'))return {state:'INDETERMINADO',color:'uncertain',desc:'Existe sinal BAD entre os canais participantes. A resposta depende da lógica de tratamento de qualidade, que não foi verificada para a U-39.'};
const trips=effective.filter(x=>x==='trip').length;
const threshold=mode==='reconfig'?1:2;
const yes=trips>=threshold;
return {state:yes?'SOLICITAÇÃO DE TRIP':'VOTAÇÃO NÃO ATINGIDA',color:yes?'tripped':'clear',desc:`Simulação matemática: ${trips} de ${effective.length} canais efetivos em trip; requisito do modo selecionado: ${threshold} canal(is). Não reproduz lógica de manutenção instalada.`};
}
function renderVote(){const mode=$('axVoteMode').value;
$('axVoteChannels').innerHTML=voteSignal.map((value,i)=>`<div class="ax-vote-channel ${mode!=='base'&&i===0?'ax-muted-channel':''}"><strong>Canal ${'ABC'[i]}</strong><span>${esc(voteLabels[value])}</span><div class="ax-vote-small" role="group" aria-label="Estado do canal ${'ABC'[i]}">${['normal','trip','bad'].map(x=>`<button type="button" class="ax-mini ${value===x?'ax-mini-active':''}" aria-pressed="${value===x}" data-ax-vote="${i}" data-ax-signal="${x}" ${mode!=='base'&&i===0?'disabled':''}>${esc(voteLabels[x])}</button>`).join('')}</div>${mode!=='base'&&i===0?'<small>Canal A excluído do cálculo do exemplo</small>':''}</div>`).join('');
const res=voteEvaluate();$('axVoteResult').className='ax-vote-result ax-vote-'+res.color;$('axVoteResult').innerHTML=`<strong>${esc(res.state)}</strong><p>${esc(res.desc)}</p><p class="ax-footnote">${mode==='base'?'Exemplo 2oo3 nominal.':mode==='fixed'?'Hipótese de substituição por normal: A=0, exigindo dois sinais de B e C.':'Hipótese de reconfiguração de votação: 1oo2 entre B e C.'} Em todos os casos verificar o tratamento de BAD no PLC.</p>`;
}
$('axVoteMode').addEventListener('change',renderVote);
$('axVoteChannels').addEventListener('click',e=>{const b=e.target.closest('[data-ax-vote]');if(!b||b.disabled)return;voteSignal[Number(b.dataset.axVote)]=b.dataset.axSignal;renderVote();});
$('axVoteReset').addEventListener('click',()=>{voteSignal.fill('normal');renderVote();});
$('axVoteExample').addEventListener('click',()=>{$('axVoteMode').value='base';voteSignal.splice(0,3,'trip','normal','trip');renderVote();});
renderVote();
const checklistItems=['Primeiro evento, tag, hora e classe documentados','Tendências antes e depois do evento avaliadas','Qualidade da instrumentação e alarmes BAD verificados','Matriz de efeitos e posições finais conferidas','Pendências, procedimento e responsáveis pela análise identificados'];
let checklist=new Set();
function renderChecklist(){$('axChecklist').innerHTML=checklistItems.map((x,i)=>`<label class="ax-check-line"><input type="checkbox" data-ax-check="${i}" ${checklist.has(i)?'checked':''}><span>${esc(x)}</span></label>`).join('');
$('axChecklistStatus').innerHTML=`<strong>${checklist.size}/5 evidências marcadas.</strong> ${checklist.size===5?'Checklist didático preenchido; isto NÃO autoriza qualquer reset, by-pass ou partida.':'Continue coletando evidências e avaliando os impedimentos. Não existe liberação operacional por este checklist.'}`;}
$('axChecklist').addEventListener('change',e=>{const b=e.target.closest('[data-ax-check]');if(!b)return;const i=Number(b.dataset.axCheck);b.checked?checklist.add(i):checklist.delete(i);renderChecklist();});
$('axChecklistReset').addEventListener('click',()=>{checklist=new Set();renderChecklist();});
$('axChecklistFirst').addEventListener('click',()=>{activateTab('first');$('axFirstInfo').scrollIntoView({block:'nearest',behavior:'smooth'});});
renderChecklist();
const sim={scenario:0,step:0,mode:'train',selected:null,risk:0,answers:[],completed:new Set(),order:null};
D.scenarios.forEach((s,i)=>{$('axScenario').add(new Option(`${i+1}. ${s.title}`,String(i)));});
const letters='ABCD';
function updateModes(){
for(const [id,mode] of [['axModeTrain','train'],['axModeExam','exam']]){const b=$(id),yes=sim.mode===mode;b.setAttribute('aria-pressed',String(yes));b.classList.toggle('ax-primary',yes);}
}
function initNewSim(sc=0,mode=sim.mode){sim.scenario=sc;sim.step=0;sim.mode=mode;sim.selected=null;sim.risk=0;sim.answers=[];sim.order=null;sim.completed=new Set();$('axScenario').value=String(sc);updateModes();renderSim();}
function firstActive(sc,clearExisting=false){sim.scenario=sc;sim.selected=null;if(clearExisting)sim.answers=sim.answers.filter(x=>x.scenario!==sc);const done=sim.answers.filter(x=>x.scenario===sc);sim.step=[0,1,2,3].find(i=>!done.some(x=>x.step===i))??4;sim.risk=done.filter(x=>!x.correct).length;sim.order=null;$('axScenario').value=String(sc);renderSim();renderScenarioProgress();}
function openScenario(sc){firstActive(sc,false);activateTab('cases');$('axCases').scrollIntoView({block:'start',behavior:'smooth'});}
function renderScenarioProgress(){const total=sim.answers.length;$('axScenarioProgress').innerHTML=`<div class="ax-progress-header"><strong>Progresso das decisões: ${total}/20</strong><span>${sim.mode==='exam'?'Gabarito oculto até completar as 20 decisões':'Escolhas registradas neste percurso'}</span></div><div class="ax-meter" role="progressbar" aria-label="Progresso global" aria-valuemin="0" aria-valuemax="20" aria-valuenow="${total}"><span style="width:${total/20*100}%"></span></div><div class="ax-scenario-chips">${D.scenarios.map((s,i)=>{const n=sim.answers.filter(x=>x.scenario===i).length;return `<button type="button" class="ax-scenario-chip ${i===sim.scenario?'ax-scenario-active':''}" data-ax-open-sc="${i}"><strong>Cenário ${i+1}</strong><span>${n}/4 decisões</span></button>`;}).join('')}</div>`;}
// Salvamento opcional, local e limitado a escolhas do exercício; não salva dados de processo.
const progressKey='u39-concept-bypass-avancado-v044';
function saveProgress(){try{const record={v:1,mode:sim.mode,answers:sim.answers.map(({scenario,step,chosen,correct})=>({scenario,step,chosen,correct})),scenario:sim.scenario};localStorage.setItem(progressKey,JSON.stringify(record));return true;}catch(_){return false;}}
function loadProgress(){try{const raw=localStorage.getItem(progressKey);if(!raw)return false;const rec=JSON.parse(raw);if(rec.v!==1||!['train','exam'].includes(rec.mode)||!Array.isArray(rec.answers)||!Number.isInteger(rec.scenario))return false;const seen=new Set();let arr=[];for(const a of rec.answers){if(!Number.isInteger(a.scenario)||a.scenario<0||a.scenario>=D.scenarios.length||!Number.isInteger(a.step)||a.step<0||a.step>=4||!Number.isInteger(a.chosen)||a.chosen<0||a.chosen>=3)continue;const key=a.scenario+'-'+a.step;if(seen.has(key))continue;seen.add(key);arr.push({scenario:a.scenario,step:a.step,chosen:a.chosen,correct:a.chosen===D.scenarios[a.scenario].steps[a.step].a});}sim.answers=arr;sim.mode=rec.mode;updateModes();firstActive(Math.max(0,Math.min(4,rec.scenario)));return true;}catch(_){return false;}}

function riskText(){const s=D.scenarios[sim.scenario];if(sim.risk===0)return 'Até agora, as escolhas priorizam diagnóstico e proteção das funções ainda habilitadas.';
const dict={C1:'O ramal com proteção já restabelecida acumula risco de um novo evento de baixa vazão.',C2:'A sequência fictícia está fora do marco de proteção; uma função ainda ativa pode solicitar trip.',C3:'A confiabilidade da votação encontra-se degradada ou sua arquitetura foi presumida sem comprovação.',C4:'A transição de estados pode retirar contornos antes da normalização de outras variáveis.',C5:'O diagnóstico da causa e a confirmação de elementos finais ficam prejudicados.'};
return (sim.risk>=2?'CONSEQUÊNCIA SIMULADA AGRAVADA: ':'PONTO DE ATENÇÃO SIMULADO: ')+dict[s.id];}
function previousConsequence(){const previous=sim.answers.find(x=>x.scenario===sim.scenario&&x.step===sim.step-1);if(!previous)return 'Sem decisão anterior registrada.';const q=D.scenarios[sim.scenario].steps[previous.step];return 'Decisão registrada: '+q.opts[previous.chosen]+'. '+(previous.correct?'No cenário ilustrativo, a análise mantém as verificações pertinentes.':'No cenário ilustrativo, a escolha deixa pendência para a próxima etapa: '+q.risk);}
function currentCaseHeader(s){return `<div class="ax-card"><span class="ax-pill">Cenário ${sim.scenario+1} / 5</span> <span class="ax-pill">${esc(s.level)}</span><h3 style="margin-top:12px">${esc(s.title)}</h3><p><strong>Sistema:</strong> ${esc(s.system)} · <strong>Competências:</strong> ${esc(s.skills)}</p><p>${esc(s.intro)}</p>${s.id==='C5'?'<div class="ax-toolbar"><button type="button" class="ax-btn" data-ax-first-jump="1">ⓘ Entenda o reset do primeiro evento</button></div>':''}<div class="ax-state" aria-label="Condições iniciais">${s.initial.map(x=>`<span>${esc(x)}</span>`).join('')}</div></div>`;}
function renderSim(){renderScenarioProgress();const s=D.scenarios[sim.scenario],out=$('axSimContent');$('axScenario').value=String(sim.scenario);
if(sim.step>=s.steps.length){renderEndScenario();return;}
const q=s.steps[sim.step];if(!sim.order)sim.order=shuffle(q.opts.map((_,i)=>i));const answered=sim.selected!==null;
const phase=(sim.step+1)/s.steps.length*100;
const choices=sim.order.map((original,i)=>`<button type="button" class="ax-opt ${answered&&sim.selected===original?'ax-selected':''}" data-ax-choice="${original}" ${answered?'disabled':''}><strong>${letters[i]}.</strong> ${esc(q.opts[original])}</button>`).join('');
const response=answered?(sim.mode==='train'?`<div class="ax-feedback ${sim.selected===q.a?'':'ax-alert'}" role="status"><strong>${sim.selected===q.a?'Interpretação adequada.':'Análise da alternativa selecionada.'}</strong><p>${esc(sim.selected===q.a?q.ex:q.risk)}</p>${sim.selected===q.a?'':`<p><strong>Fundamentação técnica:</strong> ${esc(q.ex)}</p>`}</div>`:`<div class="ax-feedback" role="status"><strong>Decisão registrada.</strong> A explicação e o gabarito serão disponibilizados na revisão final da avaliação. A consequência fictícia da escolha altera a próxima etapa.</div>`):'';
out.innerHTML=`${currentCaseHeader(s)}<div class="ax-card"><div class="ax-next"><span class="ax-pill">Decisão ${sim.step+1} de 4 · ${sim.mode==='exam'?'Avaliação CIC':'Treinamento'}</span><span class="ax-pill ${sim.risk?'ax-risk':''}">${sim.risk?'Cenário com desvios simulados':'Cenário sob acompanhamento'}</span></div><div class="ax-meter" role="progressbar" aria-valuemin="0" aria-valuemax="4" aria-valuenow="${sim.step+1}" aria-label="Progresso do cenário"><span style="width:${phase}%"></span></div>${sim.step>0?`<div class="ax-note"><strong>Histórico da etapa anterior:</strong> ${esc(previousConsequence())}<p style="margin-top:8px">${esc(riskText())}</p></div>`:''}
<p><strong>Condição operacional da etapa:</strong> ${esc(q.context)}</p><h3>${esc(q.q)}</h3><div class="ax-options">${choices}</div>${response}<div class="ax-next"><small>Alternativas embaralhadas a cada nova tentativa. Nenhum comando real é executado.</small><button type="button" id="axNext" class="ax-btn ax-primary" ${answered?'':'disabled'}>${sim.step===3?'Concluir cenário →':'Avançar para consequência →'}</button></div></div>`;
}
function renderEndScenario(){renderScenarioProgress();const s=D.scenarios[sim.scenario],n=sim.answers.filter(r=>r.scenario===sim.scenario&&r.correct).length;
$('axSimContent').innerHTML=`${currentCaseHeader(s)}<div class="ax-card"><span class="ax-pill">Cenário concluído</span><h3 style="margin-top:12px">${sim.mode==='exam'?'4 decisões registradas · gabarito apenas ao final':`Resultado do treinamento: ${n}/4`}</h3><p><strong>Consequência global:</strong> ${esc(s.outcome)}</p><div class="ax-note"><strong>Estados simulados:</strong> ${esc(riskText())} Os efeitos são hipóteses didáticas, não uma execução ou previsão determinística do PLC.</div><div class="ax-toolbar"><button class="ax-btn ax-primary" type="button" id="axNextCase">${sim.scenario<4?'Avançar ao cenário seguinte →':'Ver análise geral das 20 decisões →'}</button><button class="ax-btn" type="button" id="axCaseReview">${sim.mode==='exam'&&sim.answers.length<20?'Ver andamento sem gabarito':'Ver justificativas do cenário'}</button><button class="ax-btn" type="button" id="axTryAgain">Repetir cenário (embaralhar)</button></div></div>`;
}
function renderReview(){const answers=sim.answers;let total=0,correct=0;const blocks=[];const unlock=sim.mode!=='exam'||answers.length===20;
for(const [si,s] of D.scenarios.entries()){
 const answersHere=answers.filter(x=>x.scenario===si);total+=answersHere.length;correct+=answersHere.filter(x=>x.correct).length;
 blocks.push(`<details ${si===sim.scenario?'open':''}><summary>${esc(s.title)} — ${answersHere.length} de 4 decisões respondidas</summary><div class="ax-detail-inner">${s.steps.map((step,i)=>{
 const response=answersHere.find(x=>x.step===i);const chosen=response?.chosen;
 return `<div class="ax-review"><strong>Decisão ${i+1} — ${esc(step.q)}</strong><p>${response?`Escolha realizada: ${esc(step.opts[chosen])}${unlock?` · <strong>${response.correct?'adequada':'analisar novamente'}</strong>`:''}`:'Esta etapa ainda não foi respondida.'}</p>${unlock?`<p><strong>Interpretação de referência:</strong> ${esc(step.opts[step.a])}</p><p><strong>Justificativa:</strong> ${esc(step.ex)}</p><p><strong>Risco associado:</strong> ${esc(step.risk)}</p>`:'<p>Justificativas e alternativas de referência disponíveis ao término das 20 decisões.</p>'}</div>`;}).join('')}<p><strong>Consequência global da simulação:</strong> ${esc(s.outcome)}</p></div></details>`);
}
$('axScoreReview').innerHTML=`<span class="ax-pill">Revisão completa das 20 decisões</span><h2 class="ax-h">${unlock?`${correct} decisões adequadas em ${total} respondidas`:`${total} de 20 decisões registradas · sem gabarito`}</h2><p>${unlock?'O resultado é didático. A revisão traz gabarito técnico, justificativa e riscos correspondentes.':'Questões não respondidas estão identificadas. Em avaliação, gabarito e justificativas só aparecem após as 20 decisões.'}</p><div class="ax-meter"><span style="width:${total?correct/20*100:0}%"></span></div><p><strong>Andamento:</strong> ${total}/20 respostas realizadas; ${5-D.scenarios.filter((_,i)=>answers.filter(x=>x.scenario===i).length===4).length} cenários ainda não concluídos.</p>${blocks.join('')}<div class="ax-note"><strong>Validação técnica:</strong> explicações derivadas de descrição histórica e raciocínio de segurança de processo; não comprovam o comportamento efetivo da lógica atual do PLC.</div>`;
}
$('axSimContent').addEventListener('click',e=>{
 if(e.target.closest('[data-ax-first-jump]')){firstEq=0;firstStage=0;renderFirst();activateTab('first');page.scrollIntoView({block:'start',behavior:'smooth'});return;}
 const choice=e.target.closest('[data-ax-choice]');if(choice&&sim.selected===null){
   sim.selected=+choice.dataset.axChoice;
   const step=D.scenarios[sim.scenario].steps[sim.step];
   const right=sim.selected===step.a;
   sim.answers=sim.answers.filter(x=>!(x.scenario===sim.scenario&&x.step===sim.step));
   sim.answers.push({scenario:sim.scenario,step:sim.step,chosen:sim.selected,correct:right});
   if(!right)sim.risk++;
   renderSim();return;
 }
 if(e.target.closest('#axNext')){if(sim.selected===null)return;sim.step++;sim.selected=null;sim.order=null;renderSim();return;}
 if(e.target.closest('#axNextCase')){if(sim.scenario<4){const next=sim.scenario+1;openScenario(next);}else{renderReview();activateTab('review');}return;}
 if(e.target.closest('#axCaseReview')){renderReview();activateTab('review');return;}
 if(e.target.closest('#axTryAgain')){const i=sim.scenario;firstActive(i,true);return;}
});
$('axScenario').addEventListener('change',()=>firstActive(+$('axScenario').value));
$('axScenarioProgress').addEventListener('click',e=>{const b=e.target.closest('[data-ax-open-sc]');if(b)openScenario(Number(b.dataset.axOpenSc));});
$('axSave').addEventListener('click',()=>{$('axSaveStatus').textContent=saveProgress()?'Andamento salvo neste navegador. Não envolve dados reais da unidade.':'Este navegador bloqueou armazenamento local; continue usando o exercício nesta aba.';});
$('axLoad').addEventListener('click',()=>{$('axSaveStatus').textContent=loadProgress()?'Andamento anterior recuperado.':'Não foi encontrado andamento válido salvo neste navegador.';});
$('axModeTrain').addEventListener('click',()=>initNewSim(0,'train'));
$('axModeExam').addEventListener('click',()=>initNewSim(0,'exam'));
$('axRestart').addEventListener('click',()=>initNewSim(0,sim.mode));
$('axBackToSim').addEventListener('click',()=>{activateTab('cases');renderSim();});
// Teclado: navegação dos tabs internos com setas.
$('axTopTabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
 const buttons=[...$('axTopTabs').querySelectorAll('[data-ax-tab]')],curr=buttons.indexOf(document.activeElement);let index=curr;
 if(e.key==='Home')index=0;else if(e.key==='End')index=buttons.length-1;else if(e.key==='ArrowRight')index=(curr+1)%buttons.length;else if(e.key==='ArrowLeft')index=(curr+buttons.length-1)%buttons.length;
 if(index>=0){e.preventDefault();buttons[index].focus();activateTab(buttons[index].dataset.axTab);}});
initNewSim();
// Teste manual auxiliar (não executa teste físico do processo).
window.U39_BYPASS_CONCEPT_INFO=Object.freeze({enhancement:'v044',version:D.version,scenarioCount:D.scenarios.length,decisionCount:D.scenarios.reduce((n,s)=>n+s.steps.length,0),source:'Documento histórico / simulação didática'});
})();
