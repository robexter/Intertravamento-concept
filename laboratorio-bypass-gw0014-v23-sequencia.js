/* U-39 — Laboratório GW0014 V2.3 | TRIP/rearme: GW0014; histórico SOMENTE ordem de parada.
   A votação 2oo3 é premissa de treinamento informada pelo operador;
   não é comprovada apenas pela imagem. Software exclusivamente didático.
   Não conecta com SDCD/PLC e não constitui permissivo operacional. */
(() => {
  'use strict';
  function iniciar() {
    const ehRampas = !!document.getElementById('mainNav');
    const menu = document.getElementById(ehRampas ? 'mainNav' : 'nav');
    const app = ehRampas ? document.querySelector('.app-shell') : document.querySelector('main.content');
    if (!menu || !app || document.getElementById('gw23-app')) return;

    // Substituir apenas a visualização antiga do laboratório; demais módulos são preservados.
    const oldId = ehRampas ? 'bypass' : 'page-bypass-lab';
    document.getElementById(oldId)?.remove();
    menu.querySelectorAll(ehRampas ? '[data-target="bypass"]' : '[data-page="bypass-lab"]')
      .forEach(n => n.remove());
    const page = document.createElement('section');
    page.id = oldId;
    page.className = ehRampas ? 'view' : 'screen';
    page.setAttribute('aria-label','Laboratório de proteções GW0014');
    page.innerHTML = `
      <div id="gw23-app" class="gw22">
        <div class="gw22-heading">
          <div><p class="gw22-eyebrow">U-39 / LABORATÓRIO • REVISÃO V2.3</p>
          <h1>GW0014 · Laboratório de proteções e by-pass</h1>
          <p><strong>TRIP/rearme:</strong> valores exclusivamente da GW0014. <strong>By-pass de parada:</strong> somente a ordem de entrada das funções no descritivo histórico, sem importar seus valores antigos.</p></div>
          <div class="gw22-source"><span>TRIP / REARME</span><strong>GW0014</strong></div>
        </div>
        <p class="gw22-warning"><strong>Simulação didática — não validada como lógica de PLC.</strong>
        Estados e tempos são entradas de exercício, não valores lidos do SDCD. Não usar para autorizar TRIP, rearme ou contorno.</p>
        <nav class="gw23-tabs" aria-label="Áreas do laboratório" role="tablist">
          <button id="gw23-tab-prot" type="button" role="tab" aria-selected="true" aria-controls="gw23-protection" class="active">GW0014 · TRIP e rearme</button>
          <button id="gw23-tab-stop" type="button" role="tab" aria-selected="false" aria-controls="gw23-stop">By-pass de parada · sequência</button>
        </nav>
        <section id="gw23-protection" aria-labelledby="gw23-tab-prot">
        <div class="gw22-toolbar">
          <label for="gw22-system">Escolha a proteção</label>
          <select id="gw22-system" aria-label="Selecionar proteção do laboratório">
            <option value="air">FSLL-39003 · Ar do regenerador</option>
            <option value="dpSpent">PDSLL-39018 · Catalisador gasto</option>
            <option value="dpRegen">PDSLL-39022 · Catalisador regenerado</option>
            <option value="trx">TSL-39010 · Temperatura de reação</option>
            <option value="circulation">LSLL-39007D · Trip de circulação</option>
            <option value="upper">FSLL-39006 · Ramal superior</option>
            <option value="lower">FSLL-39005 · Ramal inferior</option>
            <option value="steam">FSLL-39044 · Vapor de dispersão</option>
            <option value="level">LSLL-39005 · Nível regenerador (desabilitada)</option>
          </select>
          <button id="gw22-defaults" class="gw22-ghost" type="button">Restaurar valores</button>
        </div>
        <div class="gw22-headrow">
          <div><h2 id="gw22-name"></h2><p id="gw22-desc"></p></div>
          <span id="gw22-rule" class="gw22-rule"></span>
        </div>
        <div class="gw22-templates" id="gw22-presets" aria-label="Cenários prontos"></div>
        <div class="gw22-columns">
          <section class="gw22-panel" aria-labelledby="gw22-fieldtitle">
            <h3 id="gw22-fieldtitle">Instrumentos e permissivos</h3>
            <p class="gw22-subtle">Altere as leituras para verificar cada expressão lógica.</p>
            <div class="gw22-inputs" id="gw22-fields"></div>
          </section>
          <section class="gw22-panel" aria-labelledby="gw22-resulttitle">
            <h3 id="gw22-resulttitle">Resultado da simulação</h3>
            <div id="gw22-status" role="status" aria-live="polite"></div>
            <div id="gw22-breakdown" aria-label="Detalhamento dos critérios"></div>
          </section>
        </div>
        <details class="gw22-doc"><summary>Consultar imagem GW0014 e notas de interpretação</summary>
          <p>A imagem identifica os limites e permissivos. A votação <strong>2oo3</strong> utiliza a premissa informada
          pelo operador para as três medições, pois a expressão 2oo3 não está escrita diretamente nesta captura.</p>
          <img id="gw22-image" loading="lazy" src="./gw0014-referencia.png" alt="Tela GW0014_M da U-39, referência deste laboratório">
        </details>
        <p class="gw22-footer">Regras de TRIP e rearme avaliadas separadamente. <strong>Critério atendido</strong> não significa proteção efetivamente atuada ou rearmada no PLC.</p>
        </section>
        <section id="gw23-stop" aria-labelledby="gw23-tab-stop" hidden>
          <div class="gw23-stoptitle">
            <div><p class="gw22-eyebrow">EXERCÍCIO SEQUENCIAL DE PARADA</p><h2>By-pass de parada · evolução dos contornos</h2>
            <p>Ordem de entrada extraída exclusivamente do histórico. Os limites e tempos de TRIP/rearme continuam <strong>exclusivamente na GW0014</strong>.</p></div>
            <span class="gw23-sourcechip">ORDEM: HISTÓRICO<br>TRIP/REARME: GW0014</span>
          </div>
          <div class="gw22-warning"><strong>Importante:</strong> a GW0014 não detalha os gatilhos de todas as transições automáticas. O avanço abaixo é <strong>manual, exclusivo do exercício</strong>, e não simula autorização operacional ou atuação de um PLC.</div>
          <div class="gw23-statrow">
            <div class="gw23-stat"><small>PROCESSO DE PARADA</small><strong id="gw23-stop-state">Aguardando comando didático</strong></div>
            <div class="gw23-stat"><small>PROGRESSO DO CENÁRIO</small><strong id="gw23-stop-count">0 de 5 etapas</strong></div>
          </div>
          <div class="gw23-progress"><div id="gw23-progressfill" class="gw23-progressfill"></div></div>
          <div class="gw23-steps" id="gw23-steps" aria-label="Etapas simuladas"></div>
          <div class="gw23-control">
            <div id="gw23-startarea">
              <h3>Início — HSBP39STOP</h3>
              <label class="gw23-formlabel" for="gw23-start-bypass">Existe by-pass de partida ativo no cenário?</label>
              <select id="gw23-start-bypass"><option value="no">Não</option><option value="yes">Sim</option></select>
              <p class="gw22-subtle">O histórico prevê verificar a existência de by-pass de partida antes de aceitar o comando de parada.</p>
              <button id="gw23-start" type="button" class="gw23-primary">Acionar HSBP39STOP (simulação)</button>
            </div>
            <div id="gw23-steparea" hidden>
              <h3 id="gw23-current-title">Próximo agrupamento</h3>
              <p id="gw23-current-desc" class="gw22-subtle"></p>
              <label class="gw23-formlabel" for="gw23-next-choice">Qual conjunto entra em by-pass nesta etapa?</label>
              <select id="gw23-next-choice"><option value="">Selecione o agrupamento</option>
                <option value="upper">FSLL-39006 · Ramal superior</option>
                <option value="temp">TSL-39010 · Temperatura / LSLL-39005 · Nível*</option>
                <option value="dps">PDSLL-39018 / PDSLL-39022 / FSLL-39003</option>
                <option value="blower">J-3901 · Soprador de ar</option></select>
              <label class="gw23-confirm"><input id="gw23-confirm" type="checkbox"><span>Confirmei a <strong>transição fictícia</strong> do cenário. Não é uma confirmação do SDCD.</span></label>
              <button id="gw23-next" type="button" class="gw23-primary">Avaliar próxima etapa</button>
            </div>
            <div id="gw23-done" hidden><h3>Sequência didática concluída</h3><p>Todos os agrupamentos foram apresentados na ordem histórica. Nenhum valor antigo de TRIP ou rearme foi aplicado.</p></div>
            <button id="gw23-reset" type="button" class="gw23-secondary">Reiniciar simulação</button>
            <p id="gw23-feedback" class="gw23-feedback" role="status" aria-live="polite"></p>
          </div>
          <h3 class="gw23-section-heading">Estado didático dos contornos</h3>
          <div class="gw23-groups" id="gw23-groups"></div>
          <p class="gw23-footnote">* A GW0014 apresenta a LSLL-39005 com <strong>TRIP DESABILITADO</strong>. Sua posição na ordem histórica é apenas informativa; o laboratório não a exibe como contorno habilitado. A proteção de circulação LSLL-39007D não aparece como etapa independente na ordem de parada consultada.</p>
          <details class="gw23-log"><summary>Histórico de eventos do exercício</summary><ol id="gw23-loglist"></ol></details>
          <details class="gw23-log"><summary>Fontes e separação dos critérios</summary><p><strong>GW0014:</strong> limites, tempos e condições de TRIP/rearme. <strong>Documento histórico, seção 4.2:</strong> somente ordem dos agrupamentos de by-pass de parada, sem seus limites ou temporizações. A correspondência de nomes utiliza a GW0014, inclusive FSLL-39044 para vapor de dispersão.</p></details>
        </section>
      </div>`;
    app.appendChild(page);
    const entry = document.createElement('button');
    entry.type='button';
    if(ehRampas){entry.className='nav-link';entry.dataset.target='bypass';entry.textContent='Laboratório GW0014';menu.appendChild(entry)}
    else{entry.dataset.page='bypass-lab';entry.innerHTML='<span class="num">06B</span> Laboratório GW0014';menu.appendChild(entry)}

    const css = document.createElement('style');
    css.textContent = `
      #gw23-app{--gw22-fg:#e7f6f7;--gw22-muted:#afcad6;--gw22-line:#406d82;--gw22-accent:#6de4cd;color:var(--gw22-fg);min-width:0;line-height:1.52}
      #gw23-app *{box-sizing:border-box}#gw23-app .gw22-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:15px;flex-wrap:wrap}
      #gw23-app h1{font-size:clamp(25px,3vw,37px);margin:3px 0 10px;line-height:1.17}#gw23-app h2{font-size:clamp(19px,2vw,24px);margin:0 0 5px}#gw23-app h3{font-size:17px;margin:0 0 5px}
      #gw23-app p{margin:7px 0;line-height:1.58}#gw23-app .gw22-eyebrow{color:#7ce9cf;font-weight:850;letter-spacing:.09em;font-size:11px}
      #gw23-app .gw22-source{background:#17483f;border:1px solid #4b9d8b;padding:10px 15px;border-radius:12px;text-align:center}
      #gw23-app .gw22-source span{display:block;font-size:10px;font-weight:800;letter-spacing:.08em;color:#bcf5e4}#gw23-app .gw22-source strong{font-size:19px;color:#e7fff6}
      #gw23-app .gw22-warning{color:#ffe9c6;background:#3e3323;border-left:4px solid #f4c783;border-radius:9px;padding:13px;margin:16px 0 21px}
      #gw23-app .gw22-toolbar{display:flex;align-items:end;flex-wrap:wrap;gap:11px;background:#12384d;border:1px solid var(--gw22-line);border-radius:14px;padding:13px;margin:15px 0}
      #gw23-app .gw22-toolbar label{width:100%;font-size:12px;font-weight:750;color:#c6dce7}
      #gw23-app select,#gw23-app input{font:inherit;border:1px solid #7098aa;background:#0b2637;color:#fff;min-height:45px;border-radius:9px;padding:9px 12px;width:100%;font-size:16px;min-width:0}
      #gw23-app #gw22-system{flex:1 1 310px;width:auto}#gw23-app button{border:1px solid #6395a5;background:#20556a;color:#f0fdff;min-height:44px;border-radius:9px;padding:9px 12px;font:inherit;cursor:pointer;font-weight:750}
      #gw23-app button:hover{filter:brightness(1.15)}#gw23-app button:focus-visible,#gw23-app select:focus-visible,#gw23-app input:focus-visible,#gw23-app summary:focus-visible{outline:3px solid #fcd397;outline-offset:2px}
      #gw23-app .gw22-headrow{display:flex;align-items:start;justify-content:space-between;gap:12px;margin:14px 0;flex-wrap:wrap}#gw23-app .gw22-headrow p{color:#b9d2de;font-size:13px;max-width:790px}
      #gw23-app .gw22-rule{background:#183e53;border:1px solid #5c8796;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:800;white-space:nowrap;color:#a5ecdf}
      #gw23-app .gw22-templates{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 16px}#gw23-app .gw22-templates button{background:#11384a;font-size:12px;min-height:39px}
      #gw23-app .gw22-columns{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:13px}
      #gw23-app .gw22-panel{padding:clamp(13px,2vw,20px);border-radius:15px;background:#102d40;border:1px solid var(--gw22-line);min-width:0}
      #gw23-app .gw22-subtle{color:#a9c3cf;font-size:12px;margin:0 0 15px}
      #gw23-app .gw22-inputs{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(180px,100%),1fr));gap:12px}
      #gw23-app .gw22-field{display:grid;gap:5px;font-size:12px;color:#d0e3e7;font-weight:700;min-width:0}
      #gw23-app .gw22-field small{font-size:11px;color:#abc7d2;font-weight:500}#gw23-app .gw22-vote{grid-column:1/-1;padding:10px;background:#183e51;border:1px solid #416f82;border-radius:8px}
      #gw23-app .gw22-vote strong{color:#98f4da}#gw23-app .gw22-result{padding:12px;background:#123b4d;border:1px solid #4a7890;border-radius:11px;margin:12px 0}
      #gw23-app .gw22-result strong{display:block;font-size:13px;margin-bottom:4px}#gw23-app .gw22-result span{display:inline-block;padding:5px 10px;font-size:12px;font-weight:850;border-radius:999px}
      #gw23-app .gw22-result .ok{background:#1d5443;color:#a3f5ce}#gw23-app .gw22-result .no{background:#453529;color:#ffdb9c}#gw23-app .gw22-result .na{background:#313a52;color:#d3ddff}
      #gw23-app .gw22-break{display:flex;gap:8px;align-items:start;margin:8px 0;padding:10px 9px;background:#0d293b;border-radius:9px;font-size:12px;color:#d4e8ef}
      #gw23-app .gw22-dot{height:10px;width:10px;flex-shrink:0;border-radius:50%;margin-top:4px;background:#ffd38b}#gw23-app .gw22-dot.ok{background:#7cf0c0}
      #gw23-app .gw22-note{color:#bcdded;font-size:12px;padding:11px;border-left:3px solid #79aabf;background:#132f42;border-radius:7px;margin-top:12px}
      #gw23-app .gw22-doc{background:#0f2e42;border:1px solid #42748a;border-radius:12px;padding:14px;margin:18px 0}
      #gw23-app .gw22-doc summary{cursor:pointer;color:#9fe9db;font-weight:750}#gw23-app .gw22-doc p{font-size:12px;color:#c5dfeb}#gw23-app .gw22-doc img{width:100%;height:auto;display:block;margin:12px auto 0;border-radius:6px;max-width:1040px}
      #gw23-app .gw22-footer{font-size:12px;color:#bbd4dc;margin-top:15px}
      @media(max-width:780px){#gw23-app .gw22-columns{grid-template-columns:1fr}}
      @media(max-width:450px){#gw23-app .gw22-inputs{grid-template-columns:1fr}#gw23-app .gw22-toolbar{align-items:stretch}#gw23-app #gw22-system{width:100%}#gw23-app .gw22-templates{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}#gw23-app .gw22-templates button{min-width:0}#gw23-app .gw22-source{margin-top:0}}
    `;

css.textContent += `
  #gw23-app .gw23-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 18px}#gw23-app .gw23-tabs button{flex:1 1 240px;background:#123e52}#gw23-app .gw23-tabs button.active{background:#4dccba;color:#062b36;border-color:#7af2d6}#gw23-app [hidden]{display:none!important}
  #gw23-app .gw23-stoptitle{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;margin:18px 0}#gw23-app .gw23-stoptitle p{color:#c7dbe4;font-size:13px}#gw23-app .gw23-sourcechip{font-size:11px;color:#b9f8e7;background:#183f43;border:1px solid #3a9b8b;border-radius:12px;padding:12px 14px;text-align:center;line-height:1.6;font-weight:750;height:max-content}
  #gw23-app .gw23-statrow{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}#gw23-app .gw23-stat{border:1px solid #517c8f;border-radius:11px;background:#173b4d;padding:14px;min-width:0}#gw23-app .gw23-stat small{display:block;color:#b7d2d8;font-weight:750;font-size:11px;letter-spacing:.06em}#gw23-app .gw23-stat strong{display:block;font-size:clamp(15px,2vw,19px);margin-top:6px}
  #gw23-app .gw23-progress{height:9px;border-radius:999px;background:#123245;overflow:hidden;margin:13px 0 17px}#gw23-app .gw23-progressfill{height:100%;background:#52ceb8;width:0%;transition:width .3s ease}
  #gw23-app .gw23-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:14px 0}#gw23-app .gw23-step{min-width:0;background:#15374a;border:1px solid #47798b;border-radius:10px;padding:11px 9px;font-size:12px;line-height:1.5}#gw23-app .gw23-step b{display:block;color:#d8f1eb}.gw23-step small{display:block;color:#b4cad4}#gw23-app .gw23-step.completed{background:#1c544b;border-color:#4fbc9a}#gw23-app .gw23-step.upcoming{opacity:.56}#gw23-app .gw23-step.current{border:2px solid #79e9d2}
  #gw23-app .gw23-control{background:#102e40;border:1px solid #527d91;padding:18px;border-radius:14px;margin:15px 0}#gw23-app .gw23-control h3{margin:0 0 12px}#gw23-app .gw23-control>button{margin-top:11px}#gw23-app .gw23-formlabel{display:block;color:#d5e7ef;font-size:13px;font-weight:750;margin:11px 0 7px}#gw23-app .gw23-confirm{display:flex;align-items:flex-start;gap:10px;font-size:13px;line-height:1.5;margin:15px 0;color:#d4e9ec}#gw23-app .gw23-confirm input{width:21px;height:21px;min-height:21px;flex:none;margin-top:1px;accent-color:#71dcca}#gw23-app .gw23-primary{background:#49c8b6;color:#092d38;border-color:#89f0d9}#gw23-app .gw23-secondary{background:#173b50}#gw23-app .gw23-feedback{color:#ffdda3;font-weight:750;min-height:25px}
  #gw23-app .gw23-section-heading{margin:24px 0 13px}#gw23-app .gw23-groups{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(245px,100%),1fr));gap:11px;margin-bottom:16px}#gw23-app .gw23-group{background:#123246;border:1px solid #497287;border-radius:13px;padding:13px;min-width:0}#gw23-app .gw23-group.is-active{border-color:#57c7a3;background:#163e42}#gw23-app .gw23-group h4{margin:0 0 7px;font-size:14px}#gw23-app .gw23-pill{display:inline-block;border-radius:999px;font-size:11px;font-weight:800;padding:4px 9px;background:#303c49;color:#dce7ef}#gw23-app .gw23-pill.active{background:#22624c;color:#aff4d2}#gw23-app .gw23-pill.disabled{background:#5a4229;color:#ffe0a9}#gw23-app .gw23-tags{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}#gw23-app .gw23-tags span{padding:5px 7px;background:#0d2939;border-radius:6px;color:#d6e9ef;font-size:12px}#gw23-app .gw23-group p{color:#bcd3de;font-size:12px}#gw23-app .gw23-group button{min-height:36px;padding:7px 10px;font-size:12px}#gw23-app .gw23-footnote{border-left:3px solid #e1b06d;padding:9px 12px;font-size:12px;background:#302e29;color:#f2dec5}#gw23-app .gw23-log{background:#102e40;border:1px solid #416f85;padding:13px;border-radius:11px;margin:12px 0}#gw23-app .gw23-log summary{cursor:pointer;color:#95ecd6;font-weight:750}#gw23-app .gw23-log li{font-size:12px;padding:5px 0}#gw23-app .gw23-log p{font-size:12px;color:#cfdee5}
  @media(max-width:680px){#gw23-app .gw23-steps{grid-template-columns:repeat(2,minmax(0,1fr))}#gw23-app .gw23-statrow{grid-template-columns:1fr}#gw23-app .gw23-control{padding:12px}#gw23-app .gw23-stoptitle{display:block}#gw23-app .gw23-sourcechip{display:inline-block;margin-top:10px}}
`;

    document.head.appendChild(css);

    const $=id=>document.getElementById(id);
    const YN=[['no','Não'],['yes','Sim']];
    const F=(id,label,val,unit='',options=null)=>({id,label,val,unit,options});
    const defaults={
      air:{flow:9661.3,temp:700.1,furnace:'no',level:41.6},
      dpSpent:{a:542.9,b:565.7,c:536.4,seconds:0,xv7:'yes',xv8:'no'},
      dpRegen:{a:364.7,b:351.0,c:411.6,seconds:0,xv7:'yes',xv8:'no'},
      trx:{a:536.3,b:539.1,c:536.7,xv7:'yes',xv8:'no'},
      circulation:{lev:78.9,a:542.9,b:565.7,c:536.4},
      upper:{flow:3465.3,secondsTrip:0,secondsReset:31},
      lower:{flow:3446.8,secondsTrip:0,secondsReset:31},
      steam:{flow:310.2,secondsTrip:0,secondsReset:301},
      level:{a:41.6,b:44.1,minutes:0}
    };
    const configurations={
      air:{title:'FSLL-39003 • Vazão de ar para o regenerador',desc:'TRIP no limite de vazão 2.836; rearme por permissivos combinados indicados na GW0014.',rule:'E / OU · GW0014',
        fields:[F('flow','FI-39003B · vazão',9661.3,'T/D'),F('temp','TI-032M · temperatura',700.1,'°C'),F('furnace','B-3901 aceso?',null,'',YN),F('level','LI-005A/B · nível',41.6,'%')],
        scenarios:[['Padrão',{}],['TRIP por vazão',{flow:2800}],['Rearme por temperatura',{flow:3800,temp:430,furnace:'no',level:20}],['Rearme pelo forno',{flow:3800,temp:350,furnace:'yes',level:20}],['Falta nível',{flow:3800,temp:430,furnace:'no',level:8}],['Ar insuficiente',{flow:3400,temp:430,furnace:'yes',level:20}]]},
      dpSpent:{title:'PDSLL-39018 • ΔP catalisador gasto L-3901',desc:'TRIP por 2 de 3 medições abaixo de 20 g durante mais de 5 s; na GW0014 o rearme é indicado por uma das XV aberta.',rule:'2oo3 · TRIP',
        fields:[F('a','PDI-018A',542.9,'g'),F('b','PDI-018B',565.7,'g'),F('c','PDI-018C',536.4,'g'),F('seconds','Tempo de baixa (s)',0,'s'),F('xv7','XV-39007 aberta?',null,'',YN),F('xv8','XV-39008 aberta?',null,'',YN)],
        scenarios:[['Padrão',{}],['Apenas 1 abaixo',{a:15,b:100,c:100,seconds:6}],['2oo3 em TRIP',{a:15,b:15,c:100,seconds:6}],['Tempo insuficiente',{a:15,b:15,c:100,seconds:4}],['Rearme por XV-39008',{a:100,b:100,c:100,seconds:0,xv7:'no',xv8:'yes'}]]},
      dpRegen:{title:'PDSLL-39022 • ΔP catalisador regenerado L-3902',desc:'TRIP por 2 de 3 medições abaixo de 20 g durante mais de 5 s; na GW0014 o rearme é indicado por uma das XV aberta.',rule:'2oo3 · TRIP',
        fields:[F('a','PDI-022A',364.7,'g'),F('b','PDI-022B',351,'g'),F('c','PDI-022C',411.6,'g'),F('seconds','Tempo de baixa (s)',0,'s'),F('xv7','XV-39007 aberta?',null,'',YN),F('xv8','XV-39008 aberta?',null,'',YN)],
        scenarios:[['Padrão',{}],['Apenas 1 abaixo',{a:15,b:100,c:100,seconds:6}],['2oo3 em TRIP',{a:15,b:15,c:100,seconds:6}],['Tempo insuficiente',{a:15,b:15,c:100,seconds:4}],['Rearme por XV-39008',{a:100,b:100,c:100,seconds:0,xv7:'no',xv8:'yes'}]]},
      trx:{title:'TSL-39010 • Temperatura de reação',desc:'TRIP com a condição 2oo3 abaixo de 500 °C. O rearme da GW0014 é apresentado pelas XV-39007 ou XV-39008 aberta.',rule:'2oo3 · TRIP',
        fields:[F('a','TIC-39001',536.3,'°C'),F('b','TI-39525',539.1,'°C'),F('c','TI-39526',536.7,'°C'),F('xv7','XV-39007 aberta?',null,'',YN),F('xv8','XV-39008 aberta?',null,'',YN)],
        scenarios:[['Padrão',{}],['1 canal abaixo',{a:490,b:535,c:530}],['2oo3 em TRIP',{a:490,b:480,c:535}],['3 canais abaixo',{a:490,b:480,c:470}],['Rearme por XV-39008',{a:530,b:535,c:540,xv7:'no',xv8:'yes'}]]},
      circulation:{title:'LSLL-39007D • Trip de circulação (D-3903 E L-3901)',desc:'TRIP: nível no D-3903 abaixo de 5% E diferencial da L-3901 abaixo de 20 g. Rearme: nível acima de 40% E diferencial acima de 20 g.',rule:'Lógica E + 2oo3',
        fields:[F('lev','Nível D-3903',78.9,'%'),F('a','PDI-018A',542.9,'g'),F('b','PDI-018B',565.7,'g'),F('c','PDI-018C',536.4,'g')],
        scenarios:[['Padrão',{}],['Somente nível baixo',{lev:4,a:100,b:100,c:100}],['Somente ΔP baixo',{lev:70,a:12,b:12,c:100}],['Lógica E em TRIP',{lev:4,a:12,b:12,c:100}],['Lógica E de rearme',{lev:60,a:50,b:50,c:12}],['Falha de ΔP no rearme',{lev:60,a:12,b:12,c:50}]]},
      upper:{title:'FSLL-39006 • Ramal superior de carga',desc:'TRIP por vazão abaixo de 1.259 m³/d por 120 s; rearme com vazão acima de 3.000 m³/d por mais de 30 s.',rule:'Vazão + tempo',
        fields:[F('flow','FI-39006B',3465.3,'m³/d'),F('secondsTrip','Tempo em baixa (s)',0,'s'),F('secondsReset','Tempo acima no rearme (s)',31,'s')],
        scenarios:[['Padrão',{}],['TRIP',{flow:1200,secondsTrip:121,secondsReset:0}],['No limite',{flow:1259,secondsTrip:121,secondsReset:0}],['Rearme',{flow:3450,secondsTrip:0,secondsReset:31}]]},
      lower:{title:'FSLL-39005 • Ramal inferior de carga',desc:'TRIP por vazão abaixo de 1.259 m³/d por 120 s; rearme com vazão acima de 3.000 m³/d por mais de 30 s.',rule:'Vazão + tempo',
        fields:[F('flow','FI-39005B',3446.8,'m³/d'),F('secondsTrip','Tempo em baixa (s)',0,'s'),F('secondsReset','Tempo acima no rearme (s)',31,'s')],
        scenarios:[['Padrão',{}],['TRIP',{flow:1200,secondsTrip:121,secondsReset:0}],['No limite',{flow:1259,secondsTrip:121,secondsReset:0}],['Rearme',{flow:3450,secondsTrip:0,secondsReset:31}]]},
      steam:{title:'FSLL-39044 • Vapor de dispersão',desc:'TRIP por vazão abaixo de 75 t/d por mais de 300 s; rearme com vazão acima de 75 t/d por mais de 300 s.',rule:'Vazão + tempo',
        fields:[F('flow','FI-39044B',310.2,'t/d'),F('secondsTrip','Tempo de baixa (s)',0,'s'),F('secondsReset','Tempo acima para rearme (s)',301,'s')],
        scenarios:[['Padrão',{}],['TRIP',{flow:60,secondsTrip:301,secondsReset:0}],['No limite',{flow:75,secondsTrip:301,secondsReset:301}],['Rearme',{flow:90,secondsTrip:0,secondsReset:301}]]},
      level:{title:'LSLL-39005 • Nível de catalisador no regenerador',desc:'GW0014 identifica TRIP DESABILITADO. Referência de nível abaixo de 48%; rearme acima de 50% e tempo superior a 30 minutos.',rule:'TRIP desabilitado',
        fields:[F('a','LI-39005A',41.6,'%'),F('b','LI-39005B',44.1,'%'),F('minutes','Tempo de rearme (min)',0,'min')],
        scenarios:[['Padrão',{}],['Nível abaixo de 48%',{a:42,b:44}],['Nível recuperado',{a:55,b:56,minutes:31}],['Tempo insuficiente',{a:55,b:56,minutes:20}]]}
    };
    const state=structuredClone(defaults);
    let active='air';
    const fmt=n=>Number(n).toLocaleString('pt-BR',{maximumFractionDigits:2});
    const valid=v=>typeof v==='number'&&Number.isFinite(v)&&v>=0;
    const cond=(label,yes,desc)=>({label,yes,desc});
    const vote=(v,limit,above=false)=>[v.a,v.b,v.c].filter(n=>above?n>limit:n<limit).length;
    function compute(key,v){
      const air=key==='air';
      if(air){
        const t=v.flow<=2836;
        const f=v.flow>3500, h=v.temp>400, forno=v.furnace==='yes', nivel=v.level>10;
        return {trip:t,rearm:f&&(h||forno)&&nivel,
          tripList:[cond('FI-39003B no limite de 2.836 ou abaixo (GW0014)',t,fmt(v.flow)+' na unidade T/D indicada')],
          rearmList:[cond('FI-39003B > 3.500',f,fmt(v.flow)+' T/D'),cond('TI-032M > 400 °C OU B-3901 aceso',h||forno,'Temperatura '+fmt(v.temp)+' °C; B-3901 '+(forno?'aceso':'apagado')),cond('LI-005A/B > 10%',nivel,fmt(v.level)+'%')],
          note:'TRIP (2.836) é indicado na captura sem temporização. O rearme utiliza FI >3500 E (TI >400 OU forno aceso) E LI-005A/B >10%. O ponto 2.836 é tratado como atingido no limite para o exercício; a GW0014 não explicita se o comparador no PLC é menor que ou menor/igual.'};
      }
      if(key==='dpSpent'||key==='dpRegen'){
        const low=vote(v,20), open=v.xv7==='yes'||v.xv8==='yes',duration=v.seconds>5;
        return {trip:low>=2&&duration,rearm:open,
          tripList:[cond('Votação 2oo3 de ΔP abaixo de 20 g',low>=2,low+'/3 canais abaixo de 20 g'),cond('Tempo superior a 5 s',duration,fmt(v.seconds)+' s')],
          rearmList:[cond('XV-39007 OU XV-39008 aberta',open,'XV-39007 '+(v.xv7==='yes'?'aberta':'fechada')+'; XV-39008 '+(v.xv8==='yes'?'aberta':'fechada'))],
          note:'A GW0014 mostra três leituras, TRIP (20 g e 5 seg) e rearme por XV-39007 ou XV-39008 aberta. Votação 2oo3 utilizada como premissa do exercício informada pelo operador. Recuperação de dois canais não foi adicionada como bloqueio do rearme.'};
      }
      if(key==='trx'){
        const low=vote(v,500), open=v.xv7==='yes'||v.xv8==='yes';
        return {trip:low>=2,rearm:open,
          tripList:[cond('Votação 2oo3 abaixo de 500 °C',low>=2,low+'/3 temperaturas abaixo de 500 °C')],
          rearmList:[cond('XV-39007 OU XV-39008 aberta',open,'XV-39007 '+(v.xv7==='yes'?'aberta':'fechada')+'; XV-39008 '+(v.xv8==='yes'?'aberta':'fechada'))],
          note:'A GW0014 mostra três temperaturas e rearme por posição aberta de XV-39007 OU XV-39008. A votação 2oo3 para TRIP é premissa didática informada pelo operador, não texto explícito da imagem.'};
      }
      if(key==='circulation'){
        const low=vote(v,20), high=vote(v,20,true), lowLevel=v.lev<5,highLevel=v.lev>40;
        return {trip:lowLevel&&low>=2,rearm:highLevel&&high>=2,
          tripList:[cond('Nível D-3903 < 5%',lowLevel,fmt(v.lev)+'%'),cond('ΔP L-3901 < 20 g em 2oo3',low>=2,low+'/3 canais abaixo de 20 g')],
          rearmList:[cond('Nível D-3903 > 40%',highLevel,fmt(v.lev)+'%'),cond('ΔP L-3901 > 20 g em 2oo3',high>=2,high+'/3 canais acima de 20 g')],
          note:'A GW0014 mostra NÍVEL <5% E DP <0,02 kg no TRIP de circulação, e NÍVEL >40% E DP >0,02 kg no rearme. Neste exercício, 0,02 kgf/cm² equivale a 20 gf/cm²; a votação 2oo3 dos PDI-018 é premissa informada pelo operador.'};
      }
      if(key==='upper'||key==='lower'){
        const trip=v.flow<1259&&v.secondsTrip>120, rearm=v.flow>3000&&v.secondsReset>30;
        return {trip,rearm,tripList:[cond('Vazão < 1.259 m³/d',v.flow<1259,fmt(v.flow)+' m³/d'),cond('Tempo > 120 s',v.secondsTrip>120,fmt(v.secondsTrip)+' s')],rearmList:[cond('Vazão > 3.000 m³/d',v.flow>3000,fmt(v.flow)+' m³/d'),cond('Tempo > 30 s',v.secondsReset>30,fmt(v.secondsReset)+' s')],note:'Os valores e tempos são representados na GW0014. O teste matemático não modela relógios internos do PLC.'};
      }
      if(key==='steam'){
        const trip=v.flow<75&&v.secondsTrip>300, rearm=v.flow>75&&v.secondsReset>300;
        return {trip,rearm,tripList:[cond('Vazão < 75 t/d',v.flow<75,fmt(v.flow)+' t/d'),cond('Tempo > 300 s',v.secondsTrip>300,fmt(v.secondsTrip)+' s')],rearmList:[cond('Vazão > 75 t/d',v.flow>75,fmt(v.flow)+' t/d'),cond('Tempo > 300 s',v.secondsReset>300,fmt(v.secondsReset)+' s')],note:'Os critérios de TRIP e rearme seguem somente os valores exibidos na GW0014.'};
      }
      if(key==='level'){
        const recovered=v.a>50&&v.b>50, minTime=v.minutes>30;
        return {trip:null,rearm:recovered&&minTime,
          tripList:[cond('Referência de nível < 48%',null,'LI-39005A '+fmt(v.a)+'% · LI-39005B '+fmt(v.b)+'%. TRIP DESABILITADO na tela; não simular atuação.')],
          rearmList:[cond('Níveis A/B acima de 50%',recovered,fmt(v.a)+'% / '+fmt(v.b)+'%'),cond('Tempo > 30 minutos',minTime,fmt(v.minutes)+' min')],
          note:'A GW0014 apresenta a indicação TRIP DESABILITADO e rearme por NÍVEL >50% E TEMPO >30 min. Para leitura didática foram apresentados os dois canais A/B; a associação efetiva deve ser validada.'};
      }
    }
    function make(tag,text,cls){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;}
    function fieldElement(f,val){
      const lab=make('label',undefined,'gw22-field');
      const title=make('span',f.label);lab.appendChild(title);
      const control=f.options?document.createElement('select'):document.createElement('input');
      if(f.options)f.options.forEach(([id,name])=>{const opt=make('option',name);opt.value=id;control.appendChild(opt)});
      else{control.type='number';control.step='any';control.min='0';control.inputMode='decimal';}
      control.id='gw22-'+f.id;control.value=String(val);control.dataset.key=f.id;control.setAttribute('aria-label',f.label);
      lab.appendChild(control);
      if(f.unit)lab.appendChild(make('small',f.unit));
      return lab;
    }
    function displayOne(list,title,val){
      const card=make('div',undefined,'gw22-result');
      card.appendChild(make('strong',title));
      card.appendChild(make('span',val===null?'TRIP desabilitado':val?'Critério atendido':'Critério não atendido',val===null?'na':val?'ok':'no'));
      list.forEach(c=>{
        const row=make('div',undefined,'gw22-break');
        row.appendChild(make('i',undefined,'gw22-dot '+(c.yes===true?'ok':'')));
        const text=make('span',c.label+' · '+c.desc);row.appendChild(text);card.appendChild(row);
      });return card;
    }
    function show(){
      const conf=configurations[active],values=state[active],output=$('gw22-status');
      if(conf.fields.some(f=>!f.options&&!valid(values[f.id]))){output.replaceChildren(make('p','Digite valores numéricos válidos, maiores ou iguais a zero.'));$('gw22-breakdown').replaceChildren();return;}
      if(['level','circulation'].includes(active)&&((values.lev!==undefined&&values.lev>100)||(values.a!==undefined&&active==='level'&&(values.a>100||values.b>100)))){
        output.replaceChildren(make('p','Níveis devem estar entre 0 e 100%.'));$('gw22-breakdown').replaceChildren();return;
      }
      const r=compute(active,values);
      output.replaceChildren(displayOne(r.tripList,'TRIP · simulação',r.trip),displayOne(r.rearmList,'Rearme · simulação',r.rearm));
      $('gw22-breakdown').replaceChildren(make('div',r.note,'gw22-note'));
    }
    function render(){
      const c=configurations[active];$('gw22-name').textContent=c.title;$('gw22-desc').textContent=c.desc;$('gw22-rule').textContent=c.rule;
      const fields=$('gw22-fields');fields.replaceChildren(...c.fields.map(f=>fieldElement(f,state[active][f.id])));
      const presets=$('gw22-presets');presets.replaceChildren(...c.scenarios.map(([label],idx)=>{const b=make('button',label);b.type='button';b.dataset.preset=String(idx);return b}));
      show();
    }
    $('gw22-system').addEventListener('change',e=>{active=e.target.value;render()});
    $('gw22-fields').addEventListener('input',e=>{
      const input=e.target.closest('[data-key]');if(!input)return;
      state[active][input.dataset.key]=input.tagName==='SELECT'?input.value:input.value.trim()===''?NaN:Number(input.value);show();
    });
    $('gw22-fields').addEventListener('change',e=>{
      const input=e.target.closest('[data-key]');if(!input)return;
      state[active][input.dataset.key]=input.tagName==='SELECT'?input.value:input.value.trim()===''?NaN:Number(input.value);show();
    });
    $('gw22-defaults').addEventListener('click',()=>{state[active]=structuredClone(defaults[active]);render()});
    $('gw22-presets').addEventListener('click',e=>{
      const b=e.target.closest('[data-preset]');if(!b)return;
      const values=configurations[active].scenarios[Number(b.dataset.preset)]?.[1];if(!values)return;
      state[active]=Object.assign(structuredClone(defaults[active]),values);render();
    });
    render();

// ORDEM histórica, sem incorporar qualquer setpoint/temporização do histórico.
// Fluxo didático e manual: não representa a lógica automática do PLC.
const stopGroups = [
  {title:'Entrada inicial após HSBP39STOP',tags:['FSLL-39005 · Ramal inferior','FSLL-39044 · Vapor dispersão'],refs:['lower','steam'],detail:'Primeiro agrupamento do exercício após a aceitação didática do comando de parada.'},
  {title:'Ramal superior',tags:['FSLL-39006 · Ramal superior'],refs:['upper'],detail:'Agrupamento seguinte na ordem histórica. Transição reconhecida manualmente no exercício.'},
  {title:'Temperatura e nível',tags:['TSL-39010 · Temperatura de reação','LSLL-39005 · Nível (TRIP DESABILITADO na GW0014)'],refs:['trx','level'],detail:'A LSLL-39005 é exibida apenas como referência histórica: a GW0014 marca o TRIP como desabilitado.'},
  {title:'Diferenciais e ar',tags:['PDSLL-39018 · L-3901','PDSLL-39022 · L-3902','FSLL-39003 · Ar regenerador'],refs:['dpSpent','dpRegen','air'],detail:'As condições quantitativas de TRIP/rearme permanecem exclusivamente na aba GW0014.'},
  {title:'Soprador de ar J-3901',tags:['J-3901 · Sinal de by-pass'],refs:[],detail:'Etapa final da ordem histórica. A GW0014 mostra o campo BY-PASS J-3901, sem detalhar nesta captura a lógica numérica desta etapa.'}
];
let stopStage=0;
let stopEvents=['Cenário preparado; nenhum contorno de parada simulado.'];
function msg(text){$('gw23-feedback').textContent=text}
function recordStop(text){stopEvents.push(new Date().toLocaleTimeString('pt-BR')+' · '+text);if(stopEvents.length>20)stopEvents=stopEvents.slice(-20)}
function groupState(index){return index<stopStage?'by-pass simulado':index===stopStage?'próxima etapa':'aguardando'}
function renderStop(){
  $('gw23-stop-state').textContent=stopStage===0?'Aguardando HSBP39STOP':stopStage===5?'Sequência apresentada':'By-pass de parada simulado';
  $('gw23-stop-count').textContent=stopStage+' de 5 etapas';
  $('gw23-progressfill').style.width=(stopStage*20)+'%';
  $('gw23-startarea').hidden=stopStage!==0;
  $('gw23-steparea').hidden=stopStage===0||stopStage>=5;
  $('gw23-done').hidden=stopStage!==5;
  $('gw23-next-choice').disabled=stopStage===0||stopStage===5;
  $('gw23-confirm').disabled=stopStage===0||stopStage===5;
  $('gw23-steps').replaceChildren(...stopGroups.map((group,i)=>{
    const item=make('div',undefined,'gw23-step '+(i<stopStage?'completed':i===stopStage?'current':'upcoming'));
    item.appendChild(make('b',(i+1)+'. '+group.title));item.appendChild(make('small',groupState(i)));
    return item;
  }));
  if(stopStage>0&&stopStage<5){
    $('gw23-current-title').textContent='Etapa '+(stopStage+1)+': '+stopGroups[stopStage].title;
    $('gw23-current-desc').textContent='Identifique o próximo agrupamento e assuma a transição somente neste exercício. Nenhum limite histórico é calculado.';
  }
  $('gw23-groups').replaceChildren(...stopGroups.map((group,i)=>{
    const isActivated=i<stopStage, card=make('article',undefined,'gw23-group'+(isActivated?' is-active':''));
    card.appendChild(make('h4',(i+1)+'. '+group.title));
    card.appendChild(make('span',groupState(i),'gw23-pill'+(isActivated?' active':'')));
    const tags=make('div',undefined,'gw23-tags');tags.replaceChildren(...group.tags.map(t=>make('span',t)));card.appendChild(tags);
    card.appendChild(make('p',group.detail));
    if(i===2){card.appendChild(make('span','LSLL-39005: TRIP DESABILITADO','gw23-pill disabled'));}
    const buttons=make('div');group.refs.forEach(ref=>{
      const b=make('button','Consultar '+configurations[ref].title.split(' • ')[0]+' na GW0014');b.type='button';
      b.addEventListener('click',()=>{active=ref;$('gw22-system').value=ref;render();switchTab('prot');});
      buttons.appendChild(b);
    });card.appendChild(buttons);return card;
  }));
  $('gw23-loglist').replaceChildren(...stopEvents.map(e=>make('li',e)));
}
function switchTab(which){
  const showProtection=which==='prot';
  $('gw23-protection').hidden=!showProtection;
  $('gw23-stop').hidden=showProtection;
  $('gw23-tab-prot').classList.toggle('active',showProtection);
  $('gw23-tab-stop').classList.toggle('active',!showProtection);
  $('gw23-tab-prot').setAttribute('aria-selected',String(showProtection));
  $('gw23-tab-stop').setAttribute('aria-selected',String(!showProtection));
}
$('gw23-tab-prot').addEventListener('click',()=>switchTab('prot'));
$('gw23-tab-stop').addEventListener('click',()=>switchTab('stop'));
$('gw23-start').addEventListener('click',()=>{
  if($('gw23-start-bypass').value==='yes'){
    msg('Comando não aceito neste exercício: há by-pass de partida ativo no cenário. Nenhum contorno foi marcado.');return;
  }
  stopStage=1;recordStop('HSBP39STOP acionada no cenário; FSLL-39005 e FSLL-39044 em by-pass SIMULADO.');
  msg('Comando aceito no cenário didático. Não equivale a indicação real na GW0014 ou no SDCD.');
  $('gw23-confirm').checked=false;$('gw23-next-choice').value='';renderStop();
});
const choices=['','upper','temp','dps','blower'];
$('gw23-next').addEventListener('click',()=>{
  const choice=$('gw23-next-choice').value;
  if(choice!==choices[stopStage]){
    msg(choice?'Agrupamento incorreto. Revise a ordem antes de avançar.':'Selecione qual agrupamento entra em by-pass nesta etapa.');return;
  }
  if(!$('gw23-confirm').checked){msg('Confirme a transição fictícia do cenário antes de avançar. Nenhum valor do histórico está sendo usado.');return;}
  const group=stopGroups[stopStage];stopStage++;
  recordStop('Contorno didático da etapa '+stopStage+': '+group.tags.join(' / ')+'.');
  $('gw23-confirm').checked=false;$('gw23-next-choice').value='';
  msg(stopStage===5?'Sequência histórica concluída no exercício; nenhum comando foi enviado.':'Agrupamento correto na ordem histórica; próximo passo liberado somente no exercício.');
  renderStop();
});
$('gw23-reset').addEventListener('click',()=>{
  stopStage=0;stopEvents=['Cenário reiniciado; todos os contornos simulados retirados.'];
  $('gw23-start-bypass').value='no';$('gw23-confirm').checked=false;$('gw23-next-choice').value='';msg('Sequência reiniciada.');renderStop();
});
renderStop();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar,{once:true});else iniciar();
})();
