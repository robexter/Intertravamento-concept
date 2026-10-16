'use strict';
/* CONCEPT V0.2 — extensão educacional, sem interface com SDCD ou PLC */
const REFINEMENT_VERSION='V0.2';
const EVIDENCE_LABEL='Transcrição interpretativa da captura; não é a configuração PLC validada.';
const OUTPUT_TAGS=["1º evento", "Falha de instrumento", "XY-007", "XY-008", "FY-009", "FY-010", "HY-005", "HY-006", "L-3901 / L-3902", "FY-033A", "FY-015A", "FY-016A", "FY-025", "FY-024", "XY-808", "FY-017 / FY-018", "FY-037 / XY-004", "XY-005", "UX-2101 / XY-3051/52", "FY-031", "XY-002", "HV-155", "L-3908 / J-3945"];
const OUTPUT_DESC=["Sinalização do primeiro evento", "Diagnóstico de instrumento", "Fechamento de carga inferior", "Fechamento de carga superior", "Vapor dispersão inferior", "Vapor dispersão superior", "Vapor limpeza inferior", "Vapor limpeza superior", "Fechamento das slides", "Vapor partida riser", "Vapor arraste axial", "Vapor arraste radial", "Vapor retificação superior", "Vapor retificação inferior", "Desvio de pote de selagem", "Linhas de gás/água no riser", "Injeção e retorno de borra", "Vapor de limpeza de borra", "Parada TG-3901 / J-3902", "Fechamento de torch-oil", "Vapor emergência J-3901", "By-pass conversor", "Carga de catalisador/antimônio"];
// Posições das marcações coloridas nas colunas da imagem 39GR0051. A matriz e seus textos originais prevalecem.
const CONVERTER_DOTS={"FSLL-39005 / 39006": [1, 2, 3, 4, 5, 6, 7], "HX-127": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22], "TSL-39010": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22], "FALL-39044BX": [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22], "TSHH-032": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22], "FSLL-39003": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], "PDSLL-39018": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], "PDSLL-39022": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], "PSHH-39046": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], "XSJ3901": [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], "HS-022": [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]};
// Corrigir o enquadramento do HX-127: a linha “CARGA TOTAL” está na seção TRIP PARCIAL da 39GR0051.
const hx=convItems.find(item=>item.tag==='HX-127');
if(hx){hx.kind='Trip parcial';hx.name='Carga total — HX-127';hx.detail='A linha “CARGA TOTAL” aparece na parte superior da matriz, sob a categoria TRIP PARCIAL. O número de saídas assinaladas não modifica essa classificação.';hx.note='Observe a divisória TRIP PARCIAL / TRIP TOTAL à esquerda da 39GR0051. Um mesmo sinal pode ter efeitos amplos sem mudar sua classificação na tela.'}
convItems.push(
{tag:'TSHH-032',name:'Temperatura alta na fase densa',criterion:'760 °C na matriz',kind:'Trip parcial',detail:'A matriz inclui a fase densa no bloco de trip parcial e assinala várias saídas da lógica.',note:'A captura não fornece a votação completa ou todos os permissivos dessa proteção.'},
{tag:'XSJ3901',name:'Trip originado no J-3901',criterion:'Entrada XSJ3901 na matriz',kind:'Trip total',detail:'O sinal de trip do soprador aparece associado às saídas do bloco de trip total do conversor.',note:'Para entender a origem do evento da máquina, compare com as telas 39GR0052 e 39GR0068.'},
{tag:'HS-022',name:'Trip manual pelo SDCD',criterion:'Comando HS-022 na matriz',kind:'Trip total',detail:'A causa corresponde ao desarme manual identificado na matriz do conversor, sem informar por si só a sequência de manobra.',note:'Nunca use esta representação como orientação para acionar comando real.'}
);
const CONCEPT_PHYSICS={
'FSLL-39005 / 39006':'A perda de carga modifica o contato óleo–catalisador, a relação catalisador/óleo e a condição térmica do riser. A matriz apresenta uma resposta parcial. Esta justificativa física é explicação didática, não descritivo de projeto.',
'TSL-39010':'Uma temperatura inferior à faixa adequada altera o craqueamento e pode refletir insuficiência do balanço térmico. O limite apresentado é o da captura, não uma validação da revisão vigente.',
'FALL-39044BX':'A dispersão contribui para a distribuição da carga na região de injeção. A perda de vapor pode prejudicar o contato inicial óleo–catalisador. Não confundir essa função com vapores de emergência.',
'TSHH-032':'A temperatura excessiva na fase densa sugere desvio do balanço térmico do regenerador. O comportamento de cada saída deve ser conferido na matriz.',
'FSLL-39003':'A vazão de ar está relacionada à regeneração do catalisador e ao balanço de combustão. A perda dessa condição aparece na região de trip total da matriz.',
'PDSLL-39018':'O diferencial associado à linha de catalisador gasto é relevante para a estabilidade da circulação. A direção de fluxo e os limites de retorno não podem ser deduzidos dessa captura isolada.',
'PDSLL-39022':'O diferencial associado à linha de catalisador regenerado contribui para avaliar condições da circulação. A lógica de proteção completa requer os documentos instrumentados.',
'PSHH-39046':'A pressão elevada no D-3904 integra o bloco de trip total mostrado na matriz. Identificar o efeito na tela não basta para inferir sua causa física específica.',
'HX-127':'“CARGA TOTAL” é o nome do sinal registrado, mas a linha está localizada em TRIP PARCIAL; a classificação é dada pela divisão da matriz, não pelo nome.',
'XSJ3901':'A indisponibilidade do soprador modifica a capacidade de suprimento de ar do regenerador e pode exigir efeitos coordenados entre a máquina e o conversor.'
};
function converterV2(index){
 const item=convItems[index];
 document.querySelectorAll('#converterCauses button').forEach((b,j)=>b.classList.toggle('selected',j===index));
 $('convClass').textContent=item.kind.toUpperCase();$('convClass').className='pill '+(item.kind==='Trip total'?'warn':'neutral');
 $('convTitle').textContent=item.name; $('convDesc').textContent=item.detail;
 $('convNote').innerHTML='<strong>Critério registrado:</strong> '+item.criterion+'<br><br><strong>Nota de leitura:</strong> '+item.note+'<hr class="divider"><strong>Por que isso importa no processo?</strong><br>'+(CONCEPT_PHYSICS[item.tag]||'O material permite identificar os vínculos de proteção, mas não fornece todos os fundamentos de projeto para detalhar esta condição.');
 const linked=CONVERTER_DOTS[item.tag];
 if(!linked){$('convLinkSummary').textContent='Esta linha não foi transcrita em detalhe para o mapa simplificado. Consulte a captura original.';$('convOutputs').innerHTML='';return}
 $('convLinkSummary').innerHTML='<span class="pill neutral">'+linked.length+' colunas com marcação colorida</span> <span class="mini">Apenas leitura da 39GR0051; <strong>não</strong> equivale a saídas confirmadas em operação.</span>';
 $('convOutputs').innerHTML=OUTPUT_TAGS.map((tag,i)=>'<div class="output-pill '+(linked.includes(i)?'active':'')+'"><strong>'+tag+'</strong><em>'+OUTPUT_DESC[i]+'</em><small>'+(linked.includes(i)?'● marcação na captura':'○ sem marcação nesta linha')+'</small></div>').join('');
}
$('converterCauses').innerHTML='';
convItems.forEach((e,i)=>{const b=document.createElement('button');b.innerHTML='<strong>'+e.name+'</strong><small>'+e.tag+' · '+e.criterion+'</small>';b.onclick=()=>converterV2(i);$('converterCauses').append(b)});
converterV2(0);
const PHASES=[
{title:'Operação normal — proteção sem contorno documentado',desc:'As funções de segurança permanecem disponíveis de acordo com sua configuração. A matriz causa e efeito relaciona entradas e saídas; a tela de processo exibe variáveis, mas não substitui a verificação de diagnósticos.',steps:['Identificar a variável monitorada.','Localizar sua matriz e o tipo de trip.','Separar indicação normal, falha de instrumento e ação do sistema.'],ref:'39GR0051 + 39GW0014'},
{title:'Partida — contorno temporário condicionado',desc:'O documento histórico descreve comando de by-pass de partida, restrição por falha BAD e normalização individual de funções. A GW0014 representa parte das condições e critérios de rearme em tela.',steps:['Reconhecer que o contorno é função diferente do trip.','Checar que as condições históricas podem ter revisões posteriores.','Interpretar o retorno da proteção sem assumir que rearme equivale a reset do by-pass.'],ref:'Documento histórico, pp. 11–14 + 39GW0014'},
{title:'Parada — contornos associados a uma sequência',desc:'O documento descreve contornos sequenciais durante a redução programada, mas suas seções apresentam valores não coincidentes. O exercício não transforma esses passos em manobra executável.',steps:['Identificar o estado de parada e seus sinais.','Conferir divergências entre 500 m³/d, 1259 m³/d e 5%.','Manter limites históricos separados da revisão vigente.'],ref:'Documento histórico, pp. 14–20 + 39GW0014'}
];
function showPhase(i){document.querySelectorAll('#phaseTabs button').forEach((b,j)=>{b.classList.toggle('selected',j===i);b.setAttribute('aria-pressed',String(j===i))});const p=PHASES[i];$('phaseDetail').innerHTML='<span class="pill neutral">'+p.ref+'</span><h3 style="margin-top:12px">'+p.title+'</h3><p>'+p.desc+'</p><ol>'+p.steps.map(x=>'<li>'+x+'</li>').join('')+'</ol>'}
document.querySelectorAll('#phaseTabs button').forEach((b,i)=>b.onclick=()=>showPhase(i));showPhase(0);
const VOTES=[false,false,false];
function renderVotes(){const n=VOTES.filter(Boolean).length;document.querySelectorAll('#voteButtons button').forEach((b,i)=>{b.setAttribute('aria-pressed',String(VOTES[i]));b.textContent=String.fromCharCode(65+i)+' · '+(VOTES[i]?'alta':'normal')});const r=$('voteResult');r.classList.toggle('trip',n>=2);r.innerHTML='<strong>'+n+'/3 canais fictícios em condição alta:</strong> '+(n>=2?'votação 2 de 3 atendida no modelo simplificado.':'votação 2 de 3 não atendida no modelo simplificado.')+' <small>Não representa uma ordem real de trip.</small>'}
document.querySelectorAll('#voteButtons button').forEach((b,i)=>b.onclick=()=>{VOTES[i]=!VOTES[i];renderVotes()});renderVotes();
const COMPRESSOR_FOCUS=[
['PIC-39211 · Performance','Regula a condição de performance exibida na tela CCC. Na captura, SP e PV são 1,70 (unidade abreviada na tela). O estado “RUN” é um status do controlador, não prova de disponibilidade integral do compressor.','39GW0010 — Controladores CCC'],
['FIC-39182 · Antissurge 1º estágio','O primeiro controlador antissurge possui diagnóstico e saída próprios. O processo de recirculação pode proteger contra instabilidade, mas não deve ser interpretado como sinônimo de trip de máquina.','39GW0010 + 39GR0016'],
['FIC-39184 · Antissurge 2º estágio','O segundo controlador antissurge também tem indicação de desvio e estado. As curvas, limites e ações de emergência exigem o manual específico do CCC.','39GW0010 + 39GR0016'],
['Primeiro evento e matriz de trip','A 39GR0068 lista causas de trip do J-3902, incluindo três surges consecutivos, vibração e deslocamento axial. A captura não informa uma linha de tempo histórica específica.','39GR0068 — Primeiro evento das máquinas']
];
function showCompressor(i){document.querySelectorAll('#compressorTabs button').forEach((b,j)=>{b.classList.toggle('selected',i===j);b.setAttribute('aria-pressed',String(i===j))});const c=COMPRESSOR_FOCUS[i];$('compressorPanel').innerHTML='<span class="pill neutral">'+c[2]+'</span><h3 style="margin-top:12px">'+c[0]+'</h3><p>'+c[1]+'</p><p class="mini">TRANFAIL permanece como diagnóstico pendente de manual; não equivale, por si só, à confirmação de um trip.</p>'}
document.querySelectorAll('#compressorTabs button').forEach((b,i)=>b.onclick=()=>showCompressor(i));showCompressor(0);

// Opções são mantidas como textos independentes; ordem é embaralhada a cada início.
const LABS=[
{icon:'◈',name:'Conversor — causa e efeito',tag:'39GR0051',context:'Um exercício hipotético apresenta diferentes causas na tela de intertravamento do conversor.',steps:[
{q:'A baixa vazão de ar para o regenerador aparece em qual grupo da matriz?',o:['No bloco de trip total.','No bloco de trip parcial.','No grupo de controles CCC.'],a:0,why:'FSLL-003 está no bloco TRIP TOTAL da 39GR0051.'},
{q:'A linha “CARGA TOTAL” HX-127 deve receber qual classificação?',o:['Trip parcial, pela posição da linha.','Trip total, pelo nome apresentado.','Condição sem vínculo com a matriz.'],a:0,why:'HX-127 está na área TRIP PARCIAL, apesar de seu nome.'},
{q:'Para estudar a perda de diferencial de L-3901, qual registro consultar?',o:['PDSLL-39018 e sua linha de efeitos.','FIC-39182 e suas curvas antissurge.','PSHH-262A/B/C e suas saídas.'],a:0,why:'A matriz associa a proteção PDSLL-018 à L-3901; é preciso conferir a revisão em vigor.'},
{q:'Dois sinais aparecem acesos na mesma matriz. O que a imagem comprova?',o:['Há marcações naquele registro estático.','O primeiro sinal ocorreu antes do segundo.','O PLC executou dois comandos nesta ordem.'],a:0,why:'Uma captura isolada não estabelece cronologia, causalidade ou execução real.'},
{q:'O trip do J-3901 está representado como qual entrada do conversor?',o:['XSJ3901 no bloco de trip total.','PIC-39211 na seção de trip parcial.','LSLL-2323 na seção da carga total.'],a:0,why:'A linha TRIP DO J-3901 usa a indicação XSJ3901 na área de trip total.'}
]},
{icon:'◇',name:'By-pass — versões e estados',tag:'39GW0014 + documento',context:'O descritivo histórico e a GW0014 exibem critérios numéricos diferentes para funções relacionadas.',steps:[
{q:'O documento mostra 1637 m³/d e a GW0014 mostra 3000 m³/d. Como registrar?',o:['Separar funções e validar a revisão.','Assumir que o maior substitui o menor.','Aplicar uma média entre os valores.'],a:0,why:'O documento trata reset de by-pass; a tela apresenta condição indicada de rearme.'},
{q:'Segundo o descritivo histórico, qual situação pode impedir aceitação do by-pass de partida?',o:['Instrumento em condição BAD.','Uma tela em modo ampliado.','Existência de imagens arquivadas.'],a:0,why:'A seção 3.1 informa que condição BAD pode impedir a aceitação.'},
{q:'A GW0014 exibe “rearme”. Como interpretar esse campo?',o:['É critério visual; exige confirmação de função.','É obrigatoriamente reset de todo by-pass.','É comando suficiente para liberar a planta.'],a:0,why:'Rearme, reset e by-pass não devem ser equiparados sem lógica revisada.'},
{q:'Diante de diferenças entre as seções de parada, qual decisão didática é adequada?',o:['Sinalizar a pendência para engenharia.','Converter 5% diretamente em 500 m³/d.','Usar o texto mais antigo como vigente.'],a:0,why:'As referências trazem 5%, 500 m³/d e 1259 m³/d em contextos distintos.'},
{q:'Qual requisito de segurança é citado para by-pass de manutenção?',o:['APR nível 2 e autorização ADTCP.','Apenas o comando de partida no SDCD.','Somente leitura do indicador de vazão.'],a:0,why:'A seção 6 do documento cita APR nível 2 e ADTCP, conforme norma histórica, exigindo revisão vigente.'}
]},
{icon:'▦',name:'Fracionamento — votação',tag:'39GR0060',context:'Na matriz de fracionamento, as proteções de pressão trazem a indicação “2 × 3”.',steps:[
{q:'Em um modelo puramente lógico 2oo3, só um canal está alto. A votação está atendida?',o:['Não; há apenas um entre três.','Sim; qualquer canal basta.','Sim; são três instrumentos.'],a:0,why:'No modelo simplificado, ao menos dois dos três canais devem indicar a condição.'},
{q:'No mesmo modelo, dois canais estão altos. Qual interpretação corresponde ao 2oo3?',o:['A votação lógica foi atendida.','A votação exige três canais altos.','Os dois sinais se anulam entre si.'],a:0,why:'Este exercício mostra apenas a relação lógica; não simula o PLC real.'},
{q:'Qual causa tem três saídas assinaladas na matriz?',o:['Alta pressão da E-3910.','Alta pressão da E-3908.','Alta pressão da E-3909.'],a:0,why:'A PSHH-262A/B/C vincula XV-207, XV-206 e XV-204.'},
{q:'Que entrada apresenta vínculo com as cinco saídas mostradas?',o:['Falta de energia XA-152.','Alta pressão da E-3909.','Alta pressão da E-3908.'],a:0,why:'A linha XA-152 apresenta cinco marcações na captura 39GR0060.'},
{q:'Na 39GR0060, qual saída corresponde à pressão alta da E-3908?',o:['XV-201, fechamento de vapor para C-3920.','XV-203, fechamento de vapor para C-3922.','XV-204, abertura de gasolina para C-3917.'],a:0,why:'PSHH-243A/B/C está vinculada à XV-201 na captura.'}
]},
{icon:'◎',name:'J-3902 — antissurge e trip',tag:'39GW0010 + 39GR0068',context:'Considere os controladores CCC e o registro de primeiro evento das grandes máquinas.',steps:[
{q:'Qual controlador se refere ao antissurge do primeiro estágio?',o:['FIC-39182.','FIC-39184.','PIC-39211.'],a:0,why:'A tela 39GW0010 identifica FIC-39182 como antissurge do 1º estágio.'},
{q:'A indicação “TRANFAIL” em vermelho permite concluir o quê?',o:['Existe diagnóstico a esclarecer.','Foi registrado um trip confirmado.','A máquina parou por sobrevelocidade.'],a:0,why:'A captura não define o significado funcional ou o efeito de TRANFAIL.'},
{q:'Que função é distinta do controle antissurge contínuo?',o:['Trip de máquina por causa instrumentada.','Modulação de recirculação antissurge.','Ajuste de performance do compressor.'],a:0,why:'Trip, controle CCC e primeiro evento são funções diferentes.'},
{q:'Uma captura da 39GR0068 comprova qual informação?',o:['A lista de eventos que a tela pode registrar.','A ordem cronológica completa do histórico.','O horário exato do evento inicial real.'],a:0,why:'Não há carimbo de tempo de ocorrências na captura enviada.'},
{q:'A tela 39GR0068 menciona qual evento entre as causas de J-3902?',o:['Três surges consecutivos.','Nível baixo no F-3982.','Pressão alta na E-3908.'],a:0,why:'O painel de J-3902 contém a entrada «3 SURGES CONSECUTIVOS».'}
]},
{icon:'↗',name:'GV-3901 — potes e interações',tag:'39GR0057 + 39GW0039',context:'O treinamento combina potes de selagem, a matriz de intertravamento e o documento de automação.',steps:[
{q:'No documento, qual sistema recebe sinal do PLC para mudar os potes?',o:['A lógica de automação do SDCD.','O controlador CCC do J-3902.','O painel do forno B-3901.'],a:0,why:'O documento afirma que o PLC envia sinal ao SDCD, que inicia a mudança dos potes.'},
{q:'Na captura 39GW0039, qual modo de operação aparece destacado?',o:['Manual, com seleção caldeira.','Automático, com seleção chaminé.','Automático, sem fluxo selecionado.'],a:0,why:'Os destaques da tela indicam MANUAL e CALDEIRA no momento fotografado.'},
{q:'Na matriz 39GR0057, qual condição consta como causa?',o:['Trip parcial ou total do conversor.','Seleção local do antissurge do J-3902.','Alta pressão no vaso E-3908.'],a:0,why:'A primeira linha da 39GR0057 contém HX-157/HX-128 para o conversor.'},
{q:'O que define se vapor para o riser atua por solenoide ou controlador no texto histórico?',o:['Seleção indicada na tela de intertravamento.','Modo de atuação do CCC do J-3902.','Nível escolhido no pote F-3901B.'],a:0,why:'O descritivo aponta seleção de trip por solenoide ou por controlador no SDCD.'},
{q:'Que informações são necessárias para confirmar a situação real dos potes?',o:['Telas atuais, lógica revisada e permissivos.','Somente a cor destacada na foto antiga.','Apenas um relatório de grandezas do CCC.'],a:0,why:'A tela histórica não permite confirmar a situação atual nem os permissivos instalados.'}
]}
];
let labCurrent=-1,labStage=0,labScore=0,labChosen=null,labCompleted=0,labBest=0;
try{labBest=Number(localStorage.getItem('u39-lab-best-v02'))||0}catch(e){}
function shuffledIndex(n){const a=Array.from({length:n},(_,i)=>i);for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function renderLabMenu(){ $('labBest').textContent=labBest?labBest+'/5':'—';$('labCompleted').textContent=labCompleted;
 $('labScenarios').innerHTML=LABS.map((s,i)=>'<button class="lab-card '+(i===labCurrent?'selected':'')+'" data-lab="'+i+'"><span class="lab-icon">'+s.icon+'</span><strong>'+s.name+'</strong><small>'+s.tag+'</small></button>').join('');
 document.querySelectorAll('[data-lab]').forEach(b=>b.onclick=()=>startLab(Number(b.dataset.lab)));
}
function startLab(i){labCurrent=i;labStage=0;labScore=0;labChosen=null;renderLabMenu();$('labWorkspace').classList.remove('hidden');renderLabStep();$('labWorkspace').scrollIntoView({block:'start',behavior:'smooth'})}
function renderLabStep(){const s=LABS[labCurrent],step=s.steps[labStage];labChosen=null;$('labTheme').textContent=s.tag;$('labCounter').textContent='Etapa '+(labStage+1)+' de '+s.steps.length;$('labProgress').style.width=((labStage+1)*100/s.steps.length)+'%';$('labTitle').textContent=s.name;$('labContext').textContent=s.context;$('labSource').textContent='Referência documental: '+s.tag+' • exercícios interpretativos sem conexão operacional.';$('labQuestion').textContent=step.q;$('labFeedback').classList.add('hidden');$('labNext').disabled=true;$('labNext').textContent=labStage===s.steps.length-1?'Concluir cenário →':'Próxima etapa →';
 const order=shuffledIndex(step.o.length);$('labOptions').innerHTML='';order.forEach((original,k)=>{const b=document.createElement('button');b.className='choice';b.textContent=String.fromCharCode(65+k)+'. '+step.o[original];b.dataset.original=original;b.onclick=()=>{
 if(labChosen!==null)return;labChosen=original;if(original===step.a)labScore++;
 document.querySelectorAll('#labOptions button').forEach(el=>{el.disabled=true;const idx=Number(el.dataset.original);el.classList.toggle('correct',idx===step.a);el.classList.toggle('incorrect',idx===original&&original!==step.a)});
 $('labFeedback').innerHTML='<strong>'+(original===step.a?'Interpretação correta.':'Revise o critério.')+'</strong> '+step.why;$('labFeedback').classList.remove('hidden');$('labNext').disabled=false;
 };$('labOptions').append(b)})}
function finishLab(){labCompleted++;labBest=Math.max(labBest,labScore);try{localStorage.setItem('u39-lab-best-v02',String(labBest))}catch(e){}
 $('labWorkspace').innerHTML='<span class="pill neutral">CENÁRIO CONCLUÍDO</span><h2 style="margin-top:13px">'+labScore+'/'+LABS[labCurrent].steps.length+' interpretações corretas</h2><p class="muted">Estes resultados avaliam apenas leitura de fontes e diagnóstico didático. Não qualificam para intervenção no SDCD.</p><div class="row"><button class="btn primary" id="labAgain">Refazer cenário</button><button class="btn" id="labChoose">Outro cenário</button></div>';
 $('labAgain').onclick=()=>{location.reload()};$('labChoose').onclick=()=>{location.reload()};renderLabMenu()}
// Para permitir repetição sem recarregar a aplicação, conservar modelo original da área de trabalho.
const labWorkspaceTemplate=$('labWorkspace').innerHTML;
const oldFinish=finishLab;
finishLab=function(){oldFinish();$('labAgain').onclick=()=>{labWorkspaceRestore();startLab(labCurrent)};$('labChoose').onclick=()=>{labWorkspaceRestore();labCurrent=-1;renderLabMenu();$('labWorkspace').classList.add('hidden');document.getElementById('labScenarios').scrollIntoView({block:'nearest'})}}
function labWorkspaceRestore(){$('labWorkspace').innerHTML=labWorkspaceTemplate;$('labExit').onclick=exitLab;$('labNext').onclick=advanceLab;}
function advanceLab(){if(labChosen===null)return;if(labStage===LABS[labCurrent].steps.length-1){finishLab();return}labStage++;renderLabStep()}
function exitLab(){labCurrent=-1;renderLabMenu();$('labWorkspace').classList.add('hidden')}
$('labExit').onclick=exitLab;$('labNext').onclick=advanceLab;renderLabMenu();
// Avaliação técnica de nível intermediário/avançado, com distratores plausíveis.
const NEW_QUESTIONS=[
['Qual condição está classificada em TRIP TOTAL na 39GR0051?',['Baixa vazão de ar do regenerador','Baixa vazão de carga inferior','Baixa temperatura de reação','Baixa dispersão de vapor'],0,'A linha FSLL-003 pertence à área de TRIP TOTAL.'],
['A linha “CARGA TOTAL” HX-127 é apresentada em qual bloco?',['Primeiro evento das máquinas','Proteções dos potes selagem','Bloco TRIP PARCIAL conversor','Intertravamento do fracionamento'],2,'A posição da linha HX-127 está na parte superior, definida como TRIP PARCIAL.'],
['Na 39GR0051, a proteção da L-3902 por diferencial é identificada como:',['PDSLL-39022','PSHH-39046','PDSLL-39018','FSLL-39003'],0,'A matriz associa PDSLL-022 à L-3902.'],
['Qual linha representa alta temperatura da fase densa do conversor?',['FSLL-39005','TSHH-032','PDSLL-39022','FALL-39044BX'],1,'A linha TSHH-032 aparece com valor 760 na seção parcial.'],
['A 39GW0014 informa qual valor de TRIP para vapor de dispersão?',['75 t/d durante 300 s','50 t/d durante 30 s','550 t/d durante 300 s','75 t/d durante 30 s'],0,'A tela exibe 75 t/d e tempo superior a 300 segundos.'],
['O documento histórico menciona 1637 m³/d; a GW0014 mostra 3000 m³/d. A conduta de análise é:',['Substituir pelo valor mais alto','Verificar função e revisão de cada critério','Converter ambos para t/d diretamente','Tomar um valor médio entre as fontes'],1,'São funções documentais distintas: reset de by-pass e rearme visual.'],
['Segundo o descritivo histórico, o by-pass de partida pode ser recusado se houver:',['Falha BAD de instrumento','Indicação de tela ampliada','Dois relatórios com valores distintos','Leitura antiga de tendência'],0,'A seção 3.1 indica bloqueio de aceitação com instrumento BAD.'],
['Após intertravamento, o texto histórico indica que as válvulas atuadas:',['Sempre retornam sozinhas sem condição','Exigem procedimentos de reset sujeitos a permissivos','Devem ser contornadas em toda partida','São controladas apenas pela tela CCC'],1,'O documento descreve o reset das válvulas e a necessidade de permissivos.'],
['A captura GW0014, para baixa vazão de carga, indica rearme acima de:',['1259 m³/d','1637 m³/d','3000 m³/d','3500 m³/d'],2,'FI-005B/006B > 3000 e tempo >30 s aparecem nos campos de rearme.'],
['O que significa a indicação “trip desabilitado” para LSLL-39005 na captura?',['Prova desativação permanente hoje','Exige aplicação de um novo setpoint','Registro estático de configuração indicada','Equivale à ausência de instrumento físico'],2,'Uma captura histórica não comprova a situação vigente.'],
['Uma votação 2oo3 didática se satisfaz com quantos canais ativos?',['Um dos três canais','Dois ou três canais','Os três canais apenas','Nenhum canal ativo'],1,'O modelo lógico ilustrativo considera dois canais dentre três.'],
['Na 39GR0060, alta pressão na E-3910 está associada a:',['Apenas XV-201','XV-207, XV-206 e XV-204','Apenas XV-203','XV-201 e XV-203'],1,'PSHH-262A/B/C aponta essas três saídas.'],
['Qual entrada da 39GR0060 vincula as cinco saídas apresentadas?',['Pressão alta E-3908','Pressão alta E-3909','Falta de energia XA-152','Pressão alta E-3910'],2,'A linha XA-152 está associada às cinco saídas.'],
['Na matriz de fracionamento, a XV-201 está vinculada diretamente a:',['Pressão alta E-3908','Pressão alta E-3909','Pressão alta E-3910','Falha de vapor dispersão'],0,'A linha PSHH-243A/B/C apresenta a ligação à XV-201.'],
['Na matriz de fracionamento, a XV-203 está vinculada diretamente a:',['Pressão alta E-3910','Pressão alta E-3908','Pressão alta E-3909','Baixo nível no regenerador'],2,'A linha PSHH-256A/B/C apresenta a ligação à XV-203.'],
['A indicação “2 × 3” nas proteções de pressão da 39GR0060 é compatível com:',['Duas etapas independentes','Votação de dois entre três','Três comandos consecutivos','Dois grupos de três válvulas'],1,'É uma indicação de votação 2 de 3, cuja implementação deve ser confirmada.'],
['A tela 39GR0068 trata principalmente de:',['Histórico completo do conversor','Diagrama dos dispersores','Primeiro evento das grandes máquinas','Efeito das pressões na fracionadora'],2,'O título é Primeiro Evento de Trip das Máquinas.'],
['Qual instrumento identifica o antissurge do 1º estágio na GW0010?',['FIC-39182','FIC-39184','PIC-39211','PSHH-262A'],0,'FIC-39182 consta no quadro ANTISURGE 1º.'],
['Qual instrumento identifica o antissurge do 2º estágio na GW0010?',['PIC-39211','FIC-39182','FIC-39184','TSHH-032'],2,'FIC-39184 consta no quadro ANTISURGE 2º.'],
['A indicação vermelha “TRANFAIL” na tela CCC demonstra por si só:',['Uma parada confirmada','Uma falha com definição pendente','Uma vibração acima do limite','Um trip por três surges'],1,'Não há na captura a definição nem o efeito do indicador.'],
['Controle antissurge contínuo e trip de máquina devem ser entendidos como:',['Duas funções com objetivos diferentes','Dois nomes para a mesma ação','Duas telas de by-pass do conversor','Dois sinais sempre simultâneos'],0,'O controle CCC e a lógica de trip não devem ser confundidos.'],
['Na 39GW0039, os destaques mostram qual combinação de estado?',['Automático / chaminé','Manual / caldeira','Automático / caldeira','Manual / chaminé'],1,'A captura exibe MANUAL e CALDEIRA destacados.'],
['O documento informa que a mudança de potes após trip do conversor é iniciada por:',['Ajuste do FIC-39184','Sequência do CCC antissurge','Sinal do PLC recebido no SDCD','Alarme exclusivamente sonoro'],2,'O texto histórico situa a automação dos potes no SDCD.'],
['Sobre os vapores para o riser em trip, o documento distingue atuação por:',['Solenoide ou controlador','Bomba de carga ou de reciclo','Nível ou pressão do F-3982','Válvula antissurge do J-3902'],0,'A seleção apresentada no descritivo é solenoide ou controlador.']
];
QUESTIONS.splice(0,QUESTIONS.length,...NEW_QUESTIONS.map(q=>({q:q[0],opts:q[1],a:q[2],ex:q[3]})));
$('qStat').textContent=QUESTIONS.length;
let quizOrder=shuffledIndex(QUESTIONS.length),quizRenderDone=false;
const quizAreaTemplate=$('quizArea').innerHTML;
function newQuizStart(){quizIndex=0;quizHits=0;quizPick=null;quizOrder=shuffledIndex(QUESTIONS.length);$('quizArea').innerHTML=quizAreaTemplate;renderQuizV2()}
function renderQuizV2(){if(quizIndex>=QUESTIONS.length){
 $('quizArea').innerHTML='<span class="pill neutral">AVALIAÇÃO CONCLUÍDA</span><h2 style="margin-top:15px">'+quizHits+' de '+QUESTIONS.length+' respostas corretas</h2><p class="muted">Alternativas foram embaralhadas a cada execução. Esta avaliação é didática e não é habilitação para intervenções no SDCD.</p><div class="row"><button class="btn primary" id="restartQuiz">Refazer com nova ordem</button><button class="btn" id="goLab">Laboratório CIC →</button></div>'; $('restartQuiz').onclick=newQuizStart;$('goLab').onclick=()=>goPage('laboratorio');return;}
 const item=QUESTIONS[quizOrder[quizIndex]],ord=shuffledIndex(item.opts.length);quizPick=null;
 $('quizProgressText').textContent='Questão '+(quizIndex+1)+'/'+QUESTIONS.length;
 $('quizScore').textContent=quizHits+' acertos'; $('quizProgress').style.width=((quizIndex+1)*100/QUESTIONS.length)+'%';
 $('quizQuestion').textContent=item.q;$('quizFeedback').classList.add('hidden');$('quizNext').disabled=true;
 $('quizNext').textContent=(quizIndex===QUESTIONS.length-1?'Ver resultado →':'Próxima questão →');$('quizOptions').innerHTML='';
 ord.forEach((original,i)=>{const b=document.createElement('button');b.className='choice';b.dataset.original=original;b.textContent=String.fromCharCode(65+i)+'. '+item.opts[original];b.onclick=()=>{if(quizPick!==null)return;quizPick=original;if(original===item.a)quizHits++;
 document.querySelectorAll('#quizOptions button').forEach(el=>{el.disabled=true;const j=Number(el.dataset.original);el.classList.toggle('correct',j===item.a);el.classList.toggle('incorrect',j===original&&j!==item.a)});
 $('quizFeedback').textContent=(original===item.a?'Correto. ':'Atenção. ')+item.ex;
 $('quizFeedback').classList.remove('hidden');$('quizScore').textContent=quizHits+' acertos';$('quizNext').disabled=false;};$('quizOptions').append(b)});
 $('quizNext').onclick=()=>{quizIndex++;renderQuizV2()};
}
newQuizStart();
// Modal com zoom sem reconstruir/comprimir capturas originais.
let zoom=100;
function paintZoom(){zoom=Math.max(100,Math.min(350,zoom));$('lightboxImg').style.width=zoom+'%';$('zoomLabel').textContent=zoom+'%'}
const showOriginal=showImage;
showImage=function(name){zoom=100;showOriginal(name);paintZoom();$('imageStage').scrollLeft=0;$('imageStage').scrollTop=0};
$('zoomIn').onclick=()=>{zoom+=50;paintZoom()};$('zoomOut').onclick=()=>{zoom-=50;paintZoom()};$('zoomReset').onclick=()=>{zoom=100;paintZoom();$('imageStage').scrollLeft=0;$('imageStage').scrollTop=0};

// Sincronizar atributos acessíveis e permitir fechar o menu móvel ao tocar fora.
const sidebarObserver=new MutationObserver(()=>$('menuBtn').setAttribute('aria-expanded',String($('sidebar').classList.contains('open'))));
sidebarObserver.observe($('sidebar'),{attributes:true,attributeFilter:['class']});
$('menuBtn').setAttribute('aria-expanded',String($('sidebar').classList.contains('open')));
document.addEventListener('pointerdown',ev=>{if($('sidebar').classList.contains('open')&&!ev.target.closest('#sidebar,#menuBtn'))$('sidebar').classList.remove('open')});
