
/*
  INTERTRAVAMENTO CONCEPT U-39
  LABORATÓRIO DE BY-PASS V0.4.5

  Treinamento didático — não validado como lógica de PLC.
  Fonte: Intertravamento U39 maior.doc.
*/
(() => {
  "use strict";

  function iniciar() {
    if (document.getElementById("page-bypass-lab")) return;

    const menu = document.getElementById("nav");
    const paginaAvancada = document.getElementById(
      "page-bypass-avancado"
    );

    if (!menu || !paginaAvancada) return;

    // Integração com a navegação original.
    const atalho = document.createElement("button");
    atalho.type = "button";
    atalho.dataset.page = "bypass-lab";
    atalho.innerHTML =
      '<span class="num">06B</span> Laboratório de By-pass ' +
      '<span class="nav-new">NOVO</span>';

    const referencia =
      menu.querySelector('[data-page="bypass-avancado"]') ||
      menu.querySelector('[data-page="bypass"]');

    referencia.after(atalho);

    const estilo = document.createElement("style");
    estilo.textContent = `
      #page-bypass-lab .bl-box {
        background: #102e42;
        border: 1px solid #48667a;
        border-radius: 14px;
        padding: clamp(12px, 2vw, 20px);
        margin: 14px 0;
      }
      #page-bypass-lab .bl-fields,
      #page-bypass-lab .bl-results {
        display: grid;
        grid-template-columns: repeat(
          auto-fit, minmax(min(190px, 100%), 1fr)
        );
        gap: 10px;
        margin: 12px 0;
      }
      #page-bypass-lab .bl-field {
        display: flex;
        flex-direction: column;
        gap: 5px;
        color: #c4dce7;
        font-size: 13px;
      }
      #page-bypass-lab input,
      #page-bypass-lab select {
        width: 100%;
        min-height: 44px;
        padding: 9px;
        border: 1px solid #688ba1;
        border-radius: 9px;
        background: #0a2030;
        color: white;
        font-size: 16px;
      }
      #page-bypass-lab .bl-btn {
        padding: 10px 14px;
        min-height: 44px;
        border-radius: 10px;
        border: 1px solid #507f96;
        background: #174258;
        color: white;
        font-weight: 700;
        cursor: pointer;
      }
      #page-bypass-lab .bl-btn.selected {
        background: #55d6c0;
        color: #082b36;
      }
      #page-bypass-lab .bl-btn:disabled {
        opacity: .45;
        cursor: not-allowed;
      }
      #page-bypass-lab .bl-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
        margin: 13px 0;
      }
      #page-bypass-lab .bl-card {
        background: #0d2538;
        border: 1px solid #345b73;
        border-radius: 11px;
        padding: 12px;
      }
      #page-bypass-lab .bl-card strong {
        display: block;
        margin-bottom: 6px;
      }
      #page-bypass-lab .bl-card p {
        font-size: 13px;
        margin: 5px 0;
      }
      #page-bypass-lab .bl-status {
        font-size: 12px;
        font-weight: 800;
      }
      #page-bypass-lab .bl-status.ok {
        color: #74e4ae;
      }
      #page-bypass-lab .bl-status.pending {
        color: #ffd090;
      }
      #page-bypass-lab .bl-status.review {
        color: #d6b7ff;
      }
      #page-bypass-lab .bl-warning {
        border-left: 4px solid #edb96f;
        padding: 12px;
        background: #392e20;
        color: #fff0dc;
        border-radius: 7px;
        margin: 13px 0;
      }
      #page-bypass-lab .bl-steps {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 6px;
        margin: 13px 0;
      }
      #page-bypass-lab .bl-step {
        padding: 10px 5px;
        text-align: center;
        border: 1px solid #507088;
        background: #193b50;
        border-radius: 8px;
        font-size: 12px;
      }
      #page-bypass-lab .bl-step.done {
        background: #19533a;
      }
      #page-bypass-lab .bl-step.current {
        border: 2px solid #55d6c0;
      }
      #page-bypass-lab .bl-step.future {
        opacity: .55;
      }
      #page-bypass-lab [hidden] {
        display: none !important;
      }
      @media (max-width: 600px) {
        #page-bypass-lab .bl-steps {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        #page-bypass-lab .bl-step:last-child {
          grid-column: 1 / -1;
        }
      }
    `;
    document.head.appendChild(estilo);

    const pagina = document.createElement("section");
    pagina.id = "page-bypass-lab";
    pagina.className = "screen";

    pagina.innerHTML = `
      <span class="kicker">
        INTERTRAVAMENTO CONCEPT · LABORATÓRIO V0.4.5
      </span>
      <h1>Laboratório de By-pass</h1>
      <p>
        Verifique a normalização individual do by-pass de partida
        e pratique a sequência de by-pass de parada.
      </p>

      <div class="bl-warning">
        <strong>Protótipo didático não validado.</strong>
        Nenhum resultado representa permissivo real do PLC.
        Os documentos históricos apresentam divergências de
        limites e precedência lógica.
      </div>

      <div class="bl-actions">
        <button class="bl-btn selected" id="blStartTab">
          Rearme de partida
        </button>
        <button class="bl-btn" id="blStopTab">
          Sequência de parada
        </button>
        <button class="bl-btn" data-goto="bypass-avancado">
          Conteúdo avançado
        </button>
      </div>

      <section id="blStart" class="bl-box">
        <h2>Teste 1 — Normalização individual</h2>
        <p>
          Informe os valores e tempos hipotéticos para verificar
          os critérios históricos de cada função.
        </p>
        <div id="blInputs" class="bl-fields"></div>
        <div class="bl-actions">
          <button class="bl-btn" id="blEvaluate">
            Avaliar variáveis
          </button>
          <button class="bl-btn" id="blRestore">
            Restaurar valores
          </button>
        </div>
        <p id="blCount" role="status" aria-live="polite"></p>
        <div class="bl-results" id="blOut"></div>
      </section>

      <section id="blStop" class="bl-box" hidden>
        <h2>Teste 2 — Sequência de parada</h2>
        <label class="bl-field">
          Critério documental comparado
          <select id="blSource">
            <option value="op">
              Descritivo operacional — 500 m³/d
            </option>
            <option value="betao">
              Projeto Betão, seção 4.3 — 1259 m³/d
            </option>
          </select>
        </label>
        <div class="bl-warning" id="blSourceText"></div>
        <div id="blStopInputs" class="bl-fields"></div>
        <div id="blSteps" class="bl-steps"></div>

        <div class="bl-card">
          <strong id="blStepTitle"></strong>
          <p id="blRequirement"></p>
          <label id="blNextLabel" class="bl-field">
            Qual grupo deve ser avaliado em seguida?
            <select id="blNext">
              <option value="">Selecione</option>
              <option value="top">FSLL39006 — carga superior</option>
              <option value="temp">TSL39010 / LSLL39005</option>
              <option value="dps">
                PDSLL39018 / PDSLL39022 / FSLL39003
              </option>
              <option value="j3901">J-3901 — etapa final</option>
            </select>
          </label>
          <div class="bl-actions">
            <button class="bl-btn" id="blAdvance">
              Verificar próxima etapa
            </button>
            <button class="bl-btn" id="blReset">
              Reiniciar
            </button>
          </div>
          <p id="blMessage" role="status" aria-live="polite">
            Sequência não iniciada.
          </p>
        </div>

        <h3>Funções incluídas no exercício</h3>
        <div class="bl-results" id="blDone"></div>
      </section>

      <div class="bl-box">
        <h2>Rastreabilidade documental</h2>
        <p>
          Fonte histórica: Intertravamento U39 maior.doc.
          As condições devem ser confrontadas com a tela 39GW0014,
          a matriz de causa e efeito e a lógica atual do PLC.
        </p>
        <p>
          Divergências: FSLL39006B; associação E/OU de TSL39010B
          e diferenciais; referências de parada de 500 m³/d,
          1259 m³/d e 5%.
        </p>
      </div>
    `;

    paginaAvancada.after(pagina);

    const $ = id => document.getElementById(id);

    const campo = (id, titulo, valor, prefixo) =>
      '<label class="bl-field">' + titulo +
      '<input type="number" step="any" min="0" id="' +
      prefixo + id + '" value="' + valor + '"></label>';

    function numero(id) {
      const elemento = $(id);
      if (!elemento || elemento.value.trim() === "") return NaN;
      const n = Number(elemento.value);
      return Number.isFinite(n) && n >= 0 ? n : NaN;
    }

    function cartao(tag, estado, detalhe) {
      const rotulo = {
        ok: "Critério histórico atendido",
        pending: "Critério pendente",
        review: "Validação documental pendente"
      };

      return '<article class="bl-card"><strong>' + tag +
        '</strong><span class="bl-status ' + estado + '">' +
        rotulo[estado] + '</span><p>' + detalhe +
        '</p></article>';
    }

    // Teste de normalização de partida.
    const campos = [
      ["lower", "Carga inferior (m³/d)", 1200],
      ["lowerT", "Tempo carga inferior (s)", 0],
      ["upper", "Carga superior (m³/d)", 1200],
      ["upperT", "Tempo carga superior (s)", 0],
      ["trx", "Temperatura de reação (°C)", 490],
      ["air", "Ar regenerador (m³/d)", 1300],
      ["dense", "Temperatura fase densa (°C)", 350],
      ["dpSpent", "ΔP catalisador gasto (gf/cm²)", 100],
      ["dpSpentT", "Tempo ΔP gasto (s)", 0],
      ["dpReg", "ΔP catalisador regenerado (gf/cm²)", 100],
      ["dpRegT", "Tempo ΔP regenerado (s)", 0],
      ["steam", "Vapor de dispersão (t/d)", 35],
      ["steamT", "Tempo vapor (s)", 0],
      ["level", "Nível regenerador (%)", 35],
      ["levelT", "Tempo nível (s)", 0],
      ["slurry", "Borra de reciclo (m³/d)", 0]
    ];

    $("blInputs").innerHTML = campos.map(
      c => campo(c[0], c[1], c[2], "bls")
    ).join("") + `
      <label class="bl-field">Forninho
        <select id="blFurn">
          <option value="off">Apagado</option>
          <option value="on">Aceso</option>
        </select>
      </label>
      <label class="bl-field">Fotocélula
        <select id="blFlame">
          <option value="none">Sem indicação</option>
          <option value="pilot">BALL39001 (piloto)</option>
          <option value="main">BALL39002 (principal)</option>
        </select>
      </label>
      <label class="bl-field">Qualidade do sinal
        <select id="blBad">
          <option value="no">Sem BAD conhecido</option>
          <option value="yes">Com sinal BAD</option>
        </select>
      </label>
    `;

    function avaliarPartida() {
      const v = {};
      campos.forEach(c => v[c[0]] = numero("bls" + c[0]));

      if (Object.values(v).some(x => !Number.isFinite(x))) {
        $("blCount").textContent = "Preencha os campos corretamente.";
        $("blOut").innerHTML = "";
        return;
      }

      const alimentacao =
        v.lower > 1637 || v.upper > 1637 || v.slurry > 150;

      const arNormalizado =
        v.air > 3500 &&
        ($("blFurn").value === "on"
          ? $("blFlame").value !== "none"
          : v.dense > 400);

      const testes = [
        {
          tag: "FSLL39005B",
          ok: v.lower > 1637 && v.lowerT > 30,
          texto: "Carga inferior > 1637 m³/d por mais de 30 s."
        },
        {
          tag: "FSLL39006B",
          revisar: true,
          texto:
            "Há divergência documental: texto histórico abaixo de " +
            "1637 m³/d; procedimento de partida acima de 1637 m³/d. " +
            "Condição histórica: " +
            (v.upper < 1637 && v.upperT > 30 ? "atendida" : "pendente") +
            ". Condição do procedimento: " +
            (v.upper > 1637 && v.upperT > 30 ? "atendida" : "pendente") +
            "."
        },
        {
          tag: "TSL39010B",
          revisar: true,
          texto:
            "Alimentação acima dos limites: " +
            (alimentacao ? "sim" : "não") +
            ". Temperatura > 525 °C: " +
            (v.trx > 525 ? "sim" : "não") +
            ". Precedência lógica E/OU ainda não comprovada."
        },
        {
          tag: "FSLL39003B",
          ok: arNormalizado,
          texto:
            "Ar > 3500 m³/d e, com forninho aceso, indicação de " +
            "chama; sem forninho, fase densa > 400 °C. " +
            "Agrupamento didático."
        },
        {
          tag: "PDSLL39018",
          revisar: true,
          texto:
            "ΔP L-3901 > 200 gf/cm² por > 30 s: " +
            (v.dpSpent > 200 && v.dpSpentT > 30 ? "sim" : "não") +
            ". Alimentação nos limiares: " +
            (alimentacao ? "sim" : "não") +
            ". Associação E/OU pendente."
        },
        {
          tag: "PDSLL39022",
          revisar: true,
          texto:
            "ΔP L-3902 > 200 gf/cm² por > 30 s: " +
            (v.dpReg > 200 && v.dpRegT > 30 ? "sim" : "não") +
            ". Alimentação nos limiares: " +
            (alimentacao ? "sim" : "não") +
            ". Associação E/OU pendente."
        },
        {
          tag: "FSLL39044B",
          ok: v.steam > 50 && v.steamT > 30,
          texto:
            "Vapor > 50 t/d por mais de 30 s. " +
            "O texto histórico de ativação usa abaixo de " +
            "550 t/d por mais de 300 s; conferir a divergência."
        },
        {
          tag: "LSLL39005",
          revisar: true,
          texto:
            "Nível > 50% por mais de 30 s: " +
            (v.level > 50 && v.levelT > 30 ? "sim" : "não") +
            ". Estado de habilitação atual não comprovado."
        }
      ];

      const bad = $("blBad").value === "yes";
      let atendidos = 0;

      $("blOut").innerHTML = testes.map(t => {
        const estado =
          bad || t.revisar ? "review" : t.ok ? "ok" : "pending";

        if (estado === "ok") atendidos++;

        return cartao(
          t.tag,
          estado,
          bad ? "Qualidade BAD exige avaliação. " + t.texto : t.texto
        );
      }).join("");

      $("blCount").textContent = bad
        ? "Sinal BAD informado: não é possível confirmar normalização."
        : atendidos + " de " + testes.length +
          " verificações sem ressalva atendidas. " +
          "As demais dependem de valores ou validação documental.";
    }

    $("blEvaluate").addEventListener("click", avaliarPartida);
    $("blInputs").addEventListener("input", avaliarPartida);
    $("blInputs").addEventListener("change", avaliarPartida);

    $("blRestore").addEventListener("click", () => {
      campos.forEach(c => $("bls" + c[0]).value = c[2]);
      $("blFurn").value = "off";
      $("blFlame").value = "none";
      $("blBad").value = "no";
      avaliarPartida();
    });

    // Teste de sequência de parada.
    const camposParada = [
      ["lower", "Carga inferior (m³/d)", 1600],
      ["upper", "Carga superior (m³/d)", 1600],
      ["trx", "Temperatura de reação (°C)", 550],
      ["air", "Ar regenerador (m³/d)", 4300]
    ];

    $("blStopInputs").innerHTML = camposParada.map(
      c => campo(c[0], c[1], c[2], "blp")
    ).join("") + `
      <label class="bl-field">
        Existe by-pass de partida ativo?
        <select id="blActiveStartup">
          <option value="yes">Sim</option>
          <option value="no">Não</option>
        </select>
      </label>
    `;

    const etapas = [
      "HSBP39STOP + carga inferior e dispersão",
      "FSLL39006 — ramal superior",
      "TSL39010 / LSLL39005",
      "PDSLL39018 / PDSLL39022 / FSLL39003",
      "J-3901 — etapa de parada"
    ];

    const escolhas = ["", "top", "temp", "dps", "j3901"];

    const grupos = [
      ["FSLL39005", "Vapor de dispersão — conferir tag"],
      ["FSLL39006"],
      ["TSL39010", "LSLL39005"],
      ["PDSLL39018", "PDSLL39022", "FSLL39003"],
      ["J-3901"]
    ];

    let etapa = 0;

    const limite = () => $("blSource").value === "op" ? 500 : 1259;

    function valoresParada() {
      const v = {};
      camposParada.forEach(c => v[c[0]] = numero("blp" + c[0]));
      return v;
    }

    function requisito(i) {
      if (i === 0) return "Nenhum by-pass de partida pode estar ativo.";
      if (i === 1) return "Carga inferior < " + limite() + " m³/d.";
      if (i === 2) return "Carga superior < " + limite() + " m³/d.";
      if (i === 3) return "Temperatura de reação < 500 °C.";
      if (i === 4) return "Ar regenerador < 3500 m³/d.";
      return "Sequência simulada concluída.";
    }

    function permitida(v, i) {
      if (i === 0) return $("blActiveStartup").value === "no";
      if (i === 1) return v.lower < limite();
      if (i === 2) return v.upper < limite();
      if (i === 3) return v.trx < 500;
      if (i === 4) return v.air < 3500;
      return false;
    }

    function atualizarParada() {
      const v = valoresParada();
      const valido = Object.values(v).every(Number.isFinite);

      $("blSourceText").textContent =
        $("blSource").value === "op"
          ? "Texto operacional: limiar de 500 m³/d. " +
            "Outros trechos históricos apresentam valores diferentes."
          : "Projeto Betão, seção 4.3: 1259 m³/d. " +
            "A seção 4.2 menciona 5%, sem conversão aqui.";

      $("blSteps").innerHTML = etapas.map((nome, i) =>
        '<div class="bl-step ' +
        (i < etapa ? "done" : i === etapa ? "current" : "future") +
        '">' + (i < etapa ? "✓ " : "") +
        (i + 1) + ". " + nome + '</div>'
      ).join("");

      $("blStepTitle").textContent =
        etapa === 5 ? "Exercício concluído" : etapas[etapa];

      $("blRequirement").textContent = requisito(etapa);
      $("blNextLabel").hidden = etapa === 0 || etapa === 5;
      $("blAdvance").disabled = etapa === 5 || !valido;

      $("blDone").innerHTML = etapa
        ? grupos.slice(0, etapa).flat().map(tag =>
            cartao(
              tag,
              "ok",
              "Incluída na etapa simulada. Estado real não verificado."
            )
          ).join("")
        : "<p>Nenhuma função contornada no exercício.</p>";
    }

    $("blAdvance").addEventListener("click", () => {
      const v = valoresParada();

      if (Object.values(v).some(x => !Number.isFinite(x))) {
        $("blMessage").textContent = "Valores inválidos.";
        return;
      }

      if (etapa > 0 && $("blNext").value !== escolhas[etapa]) {
        $("blMessage").textContent =
          "Escolha fora da sequência. Revise o agrupamento.";
        return;
      }

      if (!permitida(v, etapa)) {
        $("blMessage").textContent =
          "Critério pendente: " + requisito(etapa);
        return;
      }

      etapa++;
      $("blNext").value = "";

      $("blMessage").textContent = etapa === 5
        ? "Exercício concluído. Não autoriza manobras."
        : "Etapa atendida no exercício. Avalie a próxima.";

      atualizarParada();
    });

    function reiniciarParada() {
      etapa = 0;
      $("blNext").value = "";
      $("blMessage").textContent = "Sequência reiniciada.";
      atualizarParada();
    }

    $("blReset").addEventListener("click", reiniciarParada);
    $("blSource").addEventListener("change", reiniciarParada);
    $("blStopInputs").addEventListener("input", atualizarParada);
    $("blStopInputs").addEventListener("change", atualizarParada);

    function alternar(parada) {
      $("blStart").hidden = parada;
      $("blStop").hidden = !parada;
      $("blStartTab").classList.toggle("selected", !parada);
      $("blStopTab").classList.toggle("selected", parada);
    }

    $("blStartTab").addEventListener("click", () => alternar(false));
    $("blStopTab").addEventListener("click", () => alternar(true));

    avaliarPartida();
    atualizarParada();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  } else {
    iniciar();
  }
})();
