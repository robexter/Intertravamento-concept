/* U-39 GW0014 - Laboratório de by-pass compartilhado
   Treinamento didático. NÃO representa lógica validada de PLC. */
(() => {
  "use strict";

  function iniciar() {
    const rampas = !!document.getElementById("mainNav");
    const menu = document.getElementById(rampas ? "mainNav" : "nav");
    const app = rampas
      ? document.querySelector(".app-shell")
      : document.querySelector("main.content");

    if (!menu || !app || document.getElementById("gw0014-lab")) return;

    const anterior = document.getElementById(
      rampas ? "bypass" : "page-bypass-lab"
    );
    if (anterior) anterior.remove();

    menu.querySelectorAll(
      rampas ? '[data-target="bypass"]' : '[data-page="bypass-lab"]'
    ).forEach(elemento => elemento.remove());

    const pagina = document.createElement("section");
    pagina.id = rampas ? "bypass" : "page-bypass-lab";
    pagina.className = rampas ? "view" : "screen";

    pagina.innerHTML = `
      <div id="gw0014-lab" class="gw-lab">
        <p class="gw-kicker">U-39 · MATRIZ CONSOLIDADA GW0014</p>
        <h1>Laboratório de By-pass</h1>
        <p>Referência prioritária: GW0014, identificada como
        documentação de 2020. Fontes históricas complementam
        condições não descritas pela GW0014.</p>

        <div class="gw-aviso">
          <strong>Protótipo didático não validado.</strong>
          Nenhum resultado representa comando, permissivo,
          liberação ou estado real do PLC/SDCD.
        </div>

        <div class="gw-tabs">
          <button type="button" data-tab="gw" class="selecionado">
            GW0014 · TRIP e rearme
          </button>
          <button type="button" data-tab="partida">
            Reset do by-pass de partida
          </button>
          <button type="button" data-tab="parada">
            Sequência de by-pass de parada
          </button>
        </div>

        <div data-painel="gw">
          <h2>Critérios da GW0014</h2>
          <label>Selecione o sistema
            <select id="gw-sistema"></select>
          </label>
          <p id="gw-fonte" class="gw-nota"></p>
          <div id="gw-entradas" class="gw-grid"></div>
          <div id="gw-resultados" class="gw-grid" aria-live="polite"></div>
        </div>

        <div data-painel="partida" hidden>
          <h2>Normalização do by-pass de partida</h2>
          <div class="gw-aviso">
            Esta área utiliza procedimentos e descritivos históricos.
            Reset do by-pass não equivale ao rearme da proteção na GW0014.
          </div>
          <label>Referência documental para FSLL-39006B
            <select id="gw-referencia-superior">
              <option value="procedimento">
                Procedimento: acima de 1.637 m³/d por mais de 30 s
              </option>
              <option value="historico">
                Histórico: abaixo de 1.637 m³/d por mais de 30 s
              </option>
            </select>
          </label>
          <div id="gw-partida-entradas" class="gw-grid"></div>
          <div id="gw-partida-resultados" class="gw-grid"
               aria-live="polite"></div>
        </div>

        <div data-painel="parada" hidden>
          <h2>Sequência histórica de by-pass de parada</h2>
          <label>Referência para a redução dos ramais
            <select id="gw-referencia-parada">
              <option value="500">
                Descritivo operacional: abaixo de 500 m³/d
              </option>
              <option value="1259">
                Projeto Betão: abaixo de 1.259 m³/d
              </option>
            </select>
          </label>
          <p class="gw-nota">
            A seção 4.2 também menciona 5%, sem base de conversão
            confirmada. A GW0014 mostra LSLL-39005 com TRIP desabilitado.
          </p>
          <div id="gw-parada-entradas" class="gw-grid"></div>
          <div id="gw-parada-resultados" aria-live="polite"></div>
          <div class="gw-acoes">
            <button id="gw-avancar" type="button">Verificar etapa</button>
            <button id="gw-reiniciar" type="button">Reiniciar</button>
          </div>
        </div>

        <div class="gw-referencias">
          <strong>Rastreabilidade</strong>
          <p>Referência principal: tela 39GW0014_M.
          Complementares: procedimento de partida U-39, revisão 00;
          Intertravamento U39 maior.doc, seções 3 e 4.
          Configuração as-built do PLC não verificada.</p>
        </div>
      </div>
    `;

    app.appendChild(pagina);

    const botao = document.createElement("button");
    botao.type = "button";

    if (rampas) {
      botao.className = "nav-link";
      botao.dataset.target = "bypass";
      botao.textContent = "By-pass · GW0014";
    } else {
      botao.dataset.page = "bypass-lab";
      botao.innerHTML =
        '<span class="num">06B</span> By-pass · GW0014';
    }
    menu.appendChild(botao);

    const estilo = document.createElement("style");
    estilo.textContent = `
      .gw-lab {
        color: #e8f5f8;
        min-width: 0;
        max-width: 1250px;
      }
      .gw-lab h1 {
        font-size: clamp(24px, 3vw, 34px);
      }
      .gw-lab h2 {
        font-size: 21px;
        margin: 24px 0 13px;
      }
      .gw-kicker {
        color: #68dcc6;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: .08em;
      }
      .gw-aviso {
        background: #392e20;
        border-left: 4px solid #f5c376;
        padding: 14px;
        border-radius: 8px;
        color: #ffefd8;
        margin: 16px 0;
      }
      .gw-nota {
        color: #c6dce6;
        font-size: 13px;
        margin: 13px 0;
      }
      .gw-tabs, .gw-acoes {
        display: flex;
        gap: 9px;
        flex-wrap: wrap;
        margin: 18px 0;
      }
      .gw-lab button {
        min-height: 44px;
        padding: 10px 13px;
        border-radius: 10px;
        border: 1px solid #7395a5;
        background: #1b4258;
        color: #eefaff;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }
      .gw-lab button.selecionado {
        background: #59d4bd;
        color: #062934;
      }
      .gw-lab button:disabled {
        opacity: .5;
        cursor: not-allowed;
      }
      .gw-lab label {
        display: flex;
        flex-direction: column;
        gap: 7px;
        font-size: 13px;
        margin: 10px 0;
      }
      .gw-lab input, .gw-lab select {
        display: block;
        width: 100%;
        min-width: 0;
        min-height: 44px;
        padding: 10px;
        border: 1px solid #7295a7;
        background: #0c2839;
        color: white;
        border-radius: 9px;
        font-size: 16px;
      }
      .gw-grid {
        display: grid;
        grid-template-columns:
          repeat(auto-fit, minmax(min(190px, 100%), 1fr));
        gap: 12px;
        margin: 14px 0;
      }
      .gw-cartao {
        background: #12374b;
        border: 1px solid #477588;
        border-radius: 11px;
        padding: 14px;
        overflow-wrap: anywhere;
      }
      .gw-cartao strong {
        display: block;
        margin-bottom: 8px;
      }
      .gw-cartao p {
        font-size: 13px;
        margin: 7px 0;
        line-height: 1.6;
      }
      .gw-sim { color: #8ceabb; font-weight: 800; }
      .gw-nao { color: #ffd18c; font-weight: 800; }
      .gw-revisao { color: #dac3ff; font-weight: 800; }
      .gw-referencias {
        border-top: 1px solid #527a8c;
        padding: 16px 0;
        margin-top: 25px;
        font-size: 13px;
      }
      .gw-lab [hidden] { display: none !important; }
      .gw-lab input:focus-visible,
      .gw-lab select:focus-visible,
      .gw-lab button:focus-visible {
        outline: 3px solid #f5c376;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(estilo);

    const $ = id => document.getElementById(id);
    const SIM_NAO = [
      ["nao", "Não"],
      ["sim", "Sim"]
    ];

    function campo(id, titulo, padrao, opcoes) {
      if (opcoes) {
        return '<label>' + titulo +
          '<select data-campo="' + id + '">' +
          opcoes.map(o =>
            '<option value="' + o[0] + '">' + o[1] + '</option>'
          ).join("") +
          '</select></label>';
      }
      return '<label>' + titulo +
        '<input type="number" min="0" step="any" data-campo="' +
        id + '" value="' + padrao + '"></label>';
    }

    function leitura(container, campos) {
      const resultado = {};
      campos.forEach(c => {
        const elemento = container.querySelector(
          '[data-campo="' + c[0] + '"]'
        );
        resultado[c[0]] = c[3]
          ? elemento.value
          : elemento.value.trim() === ""
            ? NaN
            : Number(elemento.value);
      });
      return resultado;
    }

    function valido(campos, valores) {
      return campos.every(c =>
        c[3] ||
        (Number.isFinite(valores[c[0]]) && valores[c[0]] >= 0)
      );
    }

    function cartao(titulo, atende, descricao) {
      const classe = atende === null
        ? "gw-revisao"
        : atende ? "gw-sim" : "gw-nao";

      const mensagem = atende === null
        ? "Referência ou lógica não confirmada"
        : atende
          ? "Critério numérico atendido no exercício"
          : "Critério numérico não atendido";

      return '<div class="gw-cartao"><strong>' + titulo +
        '</strong><span class="' + classe + '">' +
        mensagem + '</span><p>' + descricao + '</p></div>';
    }

    const sistemas = {
      inferior: {
        titulo: "FSLL-39005 — Ramal inferior",
        fonte: "GW0014: TRIP <1.259 m³/d por >120 s. Rearme >3.000 m³/d por >30 s.",
        campos: [
          ["q", "FI-005B (m³/d)", 3446],
          ["trip", "Tempo abaixo do limite (s)", 0],
          ["rearme", "Tempo acima do limite (s)", 31]
        ],
        avaliar: v => [
          ["TRIP", v.q < 1259 && v.trip > 120,
            "FI-005B abaixo de 1.259 m³/d por mais de 120 s."],
          ["Rearme", v.q > 3000 && v.rearme > 30,
            "FI-005B acima de 3.000 m³/d por mais de 30 s."]
        ]
      },

      superior: {
        titulo: "FSLL-39006 — Ramal superior",
        fonte: "GW0014: TRIP <1.259 m³/d por >120 s. Rearme >3.000 m³/d por >30 s.",
        campos: [
          ["q", "FI-006B (m³/d)", 3465],
          ["trip", "Tempo abaixo do limite (s)", 0],
          ["rearme", "Tempo acima do limite (s)", 31]
        ],
        avaliar: v => [
          ["TRIP", v.q < 1259 && v.trip > 120,
            "FI-006B abaixo de 1.259 m³/d por mais de 120 s."],
          ["Rearme", v.q > 3000 && v.rearme > 30,
            "FI-006B acima de 3.000 m³/d por mais de 30 s."]
        ]
      },

      vapor: {
        titulo: "FSLL-39044 — Vapor de dispersão",
        fonte: "GW0014: TRIP <75 t/d por >300 s. Rearme >75 t/d por >300 s.",
        campos: [
          ["q", "Vapor (t/d)", 310],
          ["trip", "Tempo abaixo do limite (s)", 0],
          ["rearme", "Tempo acima do limite (s)", 301]
        ],
        avaliar: v => [
          ["TRIP", v.q < 75 && v.trip > 300,
            "Vapor abaixo de 75 t/d por mais de 300 s."],
          ["Rearme", v.q > 75 && v.rearme > 300,
            "Vapor acima de 75 t/d por mais de 300 s."],
          ["Diferença histórica", null,
            "Os valores de 550 e 50 t/d correspondem a funções históricas de by-pass."]
        ]
      },

      ar: {
        titulo: "FSLL-39003 — Ar do regenerador",
        fonte: "GW0014: referência de TRIP 2.836, com unidade T/D no cabeçalho; rearme com FI-003B >3.500 e condições adicionais.",
        campos: [
          ["q", "Ar — unidade da tela", 9661],
          ["t", "TI-032M (°C)", 701],
          ["n", "LI-005A/B, menor valor (%)", 42],
          ["f", "B-3901 aceso?", 0, SIM_NAO]
        ],
        avaliar: v => [
          ["Referência de TRIP", null,
            "Valor abaixo de 2.836: " +
            (v.q < 2836 ? "sim" : "não") +
            ". Unidade e lógica integral requerem confirmação."],
          ["FI-003B", v.q > 3500,
            "Vazão acima de 3.500 na referência da GW0014."],
          ["Temperatura ou forninho", v.t > 400 || v.f === "sim",
            "TI-032M >400 °C ou B-3901 aceso."],
          ["Nível", v.n > 10,
            "LI-005A/B >10%. Agrupamento global não confirmado."]
        ]
      },

      temperatura: {
        titulo: "TSL-39010 — Temperatura de reação",
        fonte: "GW0014: TRIP referenciado a 500 °C; rearme associado à abertura de XV-39007 ou XV-39008.",
        campos: [
          ["a", "Temperatura 1 (°C)", 536],
          ["b", "Temperatura 2 (°C)", 539],
          ["c", "Temperatura 3 (°C)", 537],
          ["x", "XV-39007 aberta?", 0, SIM_NAO],
          ["y", "XV-39008 aberta?", 0, SIM_NAO]
        ],
        avaliar: v => [
          ["Referência de TRIP", null,
            "Indicações abaixo de 500 °C: " +
            [v.a, v.b, v.c].filter(n => n < 500).length +
            " de 3. Votação não confirmada."],
          ["Indicadores de rearme", v.x === "sim" || v.y === "sim",
            "XV-39007 aberta OU XV-39008 aberta."]
        ]
      },

      gasto: {
        titulo: "PDSLL-39018 — Catalisador gasto",
        fonte: "GW0014: referência de TRIP de 20 g e 5 s; rearme associado às XV. Votação não confirmada.",
        campos: [
          ["a", "PDI-018A", 543],
          ["b", "PDI-018B", 566],
          ["c", "PDI-018C", 536],
          ["t", "Tempo (s)", 0],
          ["x", "XV-39007 aberta?", 0, SIM_NAO],
          ["y", "XV-39008 aberta?", 0, SIM_NAO]
        ],
        avaliar: v => [
          ["Referência de TRIP", null,
            "Canais abaixo de 20: " +
            [v.a, v.b, v.c].filter(n => n < 20).length +
            " de 3. Tempo superior a 5 s: " +
            (v.t > 5 ? "sim" : "não") +
            ". Votação e unidade requerem confirmação."],
          ["Indicadores de rearme", v.x === "sim" || v.y === "sim",
            "XV-39007 aberta OU XV-39008 aberta."]
        ]
      },

      regenerado: {
        titulo: "PDSLL-39022 — Catalisador regenerado",
        fonte: "GW0014: referência de TRIP de 20 g e 5 s; rearme associado às XV.",
        campos: [
          ["a", "PDI-022A", 365],
          ["b", "PDI-022B", 351],
          ["c", "PDI-022C", 412],
          ["t", "Tempo (s)", 0],
          ["x", "XV-39007 aberta?", 0, SIM_NAO],
          ["y", "XV-39008 aberta?", 0, SIM_NAO]
        ],
        avaliar: v => [
          ["Referência de TRIP", null,
            "Canais abaixo de 20: " +
            [v.a, v.b, v.c].filter(n => n < 20).length +
            " de 3. Tempo superior a 5 s: " +
            (v.t > 5 ? "sim" : "não") +
            ". Votação e unidade requerem confirmação."],
          ["Indicadores de rearme", v.x === "sim" || v.y === "sim",
            "XV-39007 aberta OU XV-39008 aberta."]
        ]
      },

      nivel: {
        titulo: "LSLL-39005 — Nível do regenerador",
        fonte: "GW0014: TRIP DESABILITADO; referência <48%. Rearme >50% por mais de 30 MINUTOS.",
        campos: [
          ["n", "Nível do regenerador (%)", 44],
          ["t", "Tempo acima de 50% (min)", 0]
        ],
        avaliar: v => [
          ["TRIP desabilitado", null,
            "Referência de nível abaixo de 48%: " +
            (v.n < 48 ? "sim" : "não") +
            ". A tela apresenta TRIP DESABILITADO."],
          ["Rearme", v.n > 50 && v.t > 30,
            "Nível acima de 50% por mais de 30 MINUTOS."]
        ]
      },

      circulacao: {
        titulo: "LSLL-39007D — Circulação",
        fonte: "GW0014: referências de TRIP nível <5% e ΔP <0,02 kg; rearme nível >40% e ΔP >0,02 kg.",
        campos: [
          ["n", "Nível (%)", 79],
          ["p", "ΔP — unidade da tela", 0.03]
        ],
        avaliar: v => [
          ["Nível baixo", v.n < 5, "Nível abaixo de 5%."],
          ["Diferencial baixo", v.p < 0.02,
            "ΔP abaixo de 0,02 kg."],
          ["Indicadores de rearme", v.n > 40 && v.p > 0.02,
            "Nível >40% e ΔP >0,02 kg; agrupamento não validado."]
        ]
      }
    };

    $("gw-sistema").innerHTML = Object.entries(sistemas)
      .map(([id, s]) =>
        '<option value="' + id + '">' + s.titulo + '</option>'
      ).join("");

    function mostrarSistema() {
      const s = sistemas[$("gw-sistema").value];
      $("gw-fonte").textContent = s.fonte;
      $("gw-entradas").innerHTML =
        s.campos.map(c => campo(...c)).join("");
      avaliarSistema();
    }

    function avaliarSistema() {
      const s = sistemas[$("gw-sistema").value];
      const v = leitura($("gw-entradas"), s.campos);
      $("gw-resultados").innerHTML = valido(s.campos, v)
        ? s.avaliar(v).map(r => cartao(...r)).join("")
        : "<p>Informe valores numéricos válidos.</p>";
    }

    $("gw-sistema").addEventListener("change", mostrarSistema);
    $("gw-entradas").addEventListener("input", avaliarSistema);
    $("gw-entradas").addEventListener("change", avaliarSistema);

    const camposPartida = [
      ["inf", "Carga inferior (m³/d)", 1700],
      ["it", "Tempo inferior (s)", 31],
      ["sup", "Carga superior (m³/d)", 1700],
      ["st", "Tempo superior (s)", 31],
      ["tr", "Temperatura reação (°C)", 540],
      ["borra", "Borra reciclo (m³/d)", 160],
      ["ar", "Ar — referência histórica", 3600],
      ["densa", "Fase densa (°C)", 410],
      ["chama", "Fotocélula acesa?", 0, SIM_NAO],
      ["dp1", "ΔP L-3901 (gf/cm²)", 220],
      ["t1", "Tempo ΔP L-3901 (s)", 31],
      ["dp2", "ΔP L-3902 (gf/cm²)", 220],
      ["t2", "Tempo ΔP L-3902 (s)", 31],
      ["vapor", "Vapor dispersão (t/d)", 60],
      ["vt", "Tempo vapor (s)", 31],
      ["nivel", "Nível regenerador (%)", 55],
      ["nt", "Tempo nível (s)", 31],
      ["bad", "Instrumento com BAD?", 0, SIM_NAO]
    ];

    $("gw-partida-entradas").innerHTML =
      camposPartida.map(c => campo(...c)).join("");

    function avaliarPartida() {
      const v = leitura($("gw-partida-entradas"), camposPartida);

      if (!valido(camposPartida, v)) {
        $("gw-partida-resultados").textContent =
          "Confira os valores numéricos.";
        return;
      }

      if (v.bad === "sim") {
        $("gw-partida-resultados").innerHTML = cartao(
          "Qualidade instrumental", null,
          "Há sinal BAD. Não concluir normalização no exercício."
        );
        return;
      }

      const alimentacao =
        v.inf > 1637 || v.sup > 1637 || v.borra > 150;

      const fonteSuperior = $("gw-referencia-superior").value;
      const superiorOK = v.st > 30 &&
        (fonteSuperior === "procedimento"
          ? v.sup > 1637
          : v.sup < 1637);

      const testes = [
        [
          "FSLL-39005B",
          v.inf > 1637 && v.it > 30,
          "Histórico e procedimento: carga inferior acima de " +
          "1.637 m³/d por mais de 30 segundos."
        ],
        [
          "FSLL-39006B",
          superiorOK,
          "Fonte selecionada: " +
          (fonteSuperior === "procedimento"
            ? "procedimento, acima de 1.637"
            : "histórico, abaixo de 1.637") +
          " m³/d por mais de 30 s. Divergência mantida."
        ],
        [
          "TSL-39010B",
          null,
          "O histórico menciona condições de carga, borra e " +
          "temperatura acima de 525 °C. Hipótese E: " +
          (alimentacao && v.tr > 525
            ? "numericamente atendida"
            : "não atendida") +
          ". A precedência E/OU exige validação."
        ],
        [
          "FSLL-39003B",
          null,
          "Histórico de ar acima de 3.500, associado a " +
          "condições de forninho/fase densa. Indicador: " +
          (v.ar > 3500 && (v.densa > 400 || v.chama === "sim")
            ? "favorável"
            : "não atendido") +
          ". Agrupamento e unidades devem ser confirmados."
        ],
        [
          "PDSLL-39018",
          null,
          "Histórico: diferencial L-3901 acima de 200 gf/cm² " +
          "por mais de 30 s e condições de alimentação. " +
          "Indicador: " +
          (alimentacao && v.dp1 > 200 && v.t1 > 30
            ? "favorável"
            : "não atendido") +
          ". Agrupamento E/OU não confirmado."
        ],
        [
          "PDSLL-39022",
          null,
          "Histórico: diferencial L-3902 acima de 200 gf/cm² " +
          "por mais de 30 s e condições de alimentação. " +
          "Indicador: " +
          (alimentacao && v.dp2 > 200 && v.t2 > 30
            ? "favorável"
            : "não atendido") +
          ". Agrupamento E/OU não confirmado."
        ],
        [
          "FSLL-39044B",
          v.vapor > 50 && v.vt > 30,
          "Histórico de reset do by-pass: acima de 50 t/d " +
          "por mais de 30 s. GW0014 indica rearme da " +
          "proteção acima de 75 t/d por mais de 300 s."
        ],
        [
          "LSLL-39005",
          null,
          "Histórico cita nível acima de 50% por 30 s. " +
          "GW0014 apresenta 30 minutos e TRIP desabilitado. " +
          "A diferença exige confirmação documental."
        ]
      ];

      $("gw-partida-resultados").innerHTML =
        testes.map(t => cartao(...t)).join("");
    }

    $("gw-referencia-superior").addEventListener(
      "change", avaliarPartida
    );
    $("gw-partida-entradas").addEventListener(
      "input", avaliarPartida
    );
    $("gw-partida-entradas").addEventListener(
      "change", avaliarPartida
    );

    const camposParada = [
      ["inf", "Carga inferior (m³/d)", 1600],
      ["sup", "Carga superior (m³/d)", 1600],
      ["tr", "Temperatura reação (°C)", 550],
      ["ar", "Vazão ar — referência histórica", 4200],
      ["bp", "By-pass de partida ativo?", 0, SIM_NAO]
    ];

    $("gw-parada-entradas").innerHTML =
      camposParada.map(c => campo(...c)).join("");

    let etapa = 0;

    const nomes = [
      "Comando de parada: carga inferior e vapor dispersão",
      "Ramal superior: FSLL-39006",
      "Temperatura e nível: TSL-39010 / LSLL-39005",
      "Diferenciais e ar: PDSLL-39018 / 39022 / FSLL-39003",
      "By-pass para parada J-3901"
    ];

    function mostrarParada(mensagem = "") {
      const limite = Number($("gw-referencia-parada").value);

      const titulo = etapa >= 5
        ? "Sequência didática concluída"
        : "Etapa " + (etapa + 1) + " de 5 — " + nomes[etapa];

      $("gw-parada-resultados").innerHTML = cartao(
        titulo,
        etapa >= 5 ? true : null,
        "Referência histórica dos ramais: " + limite +
        " m³/d. " + mensagem
      );

      $("gw-avancar").disabled = etapa >= 5;
    }

    $("gw-avancar").addEventListener("click", () => {
      const v = leitura($("gw-parada-entradas"), camposParada);

      if (!valido(camposParada, v)) {
        mostrarParada("Entradas inválidas.");
        return;
      }

      const limite = Number($("gw-referencia-parada").value);

      const condicoes = [
        v.bp === "nao",
        v.inf < limite,
        v.sup < limite,
        v.tr < 500,
        v.ar < 3500
      ];

      if (condicoes[etapa]) {
        etapa++;
        mostrarParada("Etapa atendida somente no exercício.");
      } else {
        mostrarParada("Condição desta etapa não atendida.");
      }
    });

    $("gw-reiniciar").addEventListener("click", () => {
      etapa = 0;
      mostrarParada("Sequência reiniciada.");
    });

    $("gw-referencia-parada").addEventListener("change", () => {
      etapa = 0;
      mostrarParada("Referência alterada. Sequência reiniciada.");
    });

    pagina.querySelectorAll("[data-tab]").forEach(botao => {
      botao.addEventListener("click", () => {
        pagina.querySelectorAll("[data-tab]").forEach(b =>
          b.classList.toggle("selecionado", b === botao)
        );

        pagina.querySelectorAll("[data-painel]").forEach(p => {
          p.hidden = p.dataset.painel !== botao.dataset.tab;
        });
      });
    });

    mostrarSistema();
    avaliarPartida();
    mostrarParada();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar, {
      once: true
    });
  } else {
    iniciar();
  }
})();