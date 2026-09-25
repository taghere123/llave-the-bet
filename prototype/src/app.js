// Journey de la propietaria. Navegación por hash, estado en memoria y copia en localStorage.
(function () {
  var D = window.LLAVE_DATA;
  var R = window.RentScore;
  var CLAVE = "llave-demo-v1";
  var app = document.getElementById("app");

  // ---------- Estado ----------
  function estadoInicial() {
    return {
      inmueble: Object.assign({}, D.inmueble),
      publicado: false,
      aceptado: null,
      modalidad: null, // estandar | cobro | adelanto
      registrado: null
    };
  }
  var S = cargar();

  function cargar() {
    try {
      var s = JSON.parse(localStorage.getItem(CLAVE));
      if (s && s.inmueble) return s;
    } catch (e) { /* sin storage: la demo funciona igual */ }
    return estadoInicial();
  }
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(S)); } catch (e) { /* ignorar */ }
  }

  // ---------- Utilidades ----------
  function soles(n) { return "S/" + Math.round(n).toLocaleString("en-US"); }
  function pct(t) { return (t * 100).toLocaleString("es-PE", { maximumFractionDigits: 1 }) + "%"; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function sup(txt) { return '<span class="sup" title="' + esc(txt || "Supuesto del prototipo, no validado") + '">Supuesto</span>'; }
  function ir(ruta) { location.hash = "#/" + ruta; }
  function postulante(id) { return D.postulantes.filter(function (p) { return p.id === id; })[0]; }
  function primerNombre(p) { return p.nombre.split(" ")[0]; }
  function iniciales(p) { return p.nombre.split(" ").map(function (x) { return x[0]; }).join(""); }
  function avatar(p, cls) { return '<span class="' + (cls || "av") + ' av-' + D.postulantes.indexOf(p) + '" aria-hidden="true">' + iniciales(p) + '</span>'; }
  function evaluar(p) { return R.calcular(p.financiero, S.inmueble.renta); }
  function aceptado() { return postulante(S.aceptado) || D.postulantes[0]; }

  var BANDA = {
    alto: { txt: "Score alto", cls: "ok", color: "var(--status-success)" },
    medio: { txt: "Score medio", cls: "warn", color: "var(--status-warning)" },
    bajo: { txt: "Score bajo", cls: "danger", color: "var(--status-danger)" }
  };
  // Todo postulante autorizó ver su RentScore al postular (decisión 015): siempre hay banda.
  function badgeScore(p) {
    var b = BANDA[evaluar(p).banda];
    return '<span class="badge ' + b.cls + '">' + b.txt + "</span>";
  }

  // ---------- Iconos (trazo 2px en currentColor, según el design system) ----------
  var TRAZOS = {
    casa: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    llave: '<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M21 12v2"/>',
    score: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 17 4-5"/>',
    escudo: '<path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    moneda: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/>',
    calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="m9 15 2 2 4-4"/>',
    rayo: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>'
  };
  function icono(n) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + TRAZOS[n] + '</svg>';
  }
  function ico(n, color) { return '<span class="ico ' + color + '">' + icono(n) + '</span>'; }
  function item(ok, texto) {
    return '<li><span class="' + (ok ? "ok" : "no") + '">' + icono(ok ? "check" : "x") + '</span><span' + (ok ? "" : ' class="muted"') + '>' + texto + '</span></li>';
  }

  // ---------- Ilustraciones: solo colores del design system ----------
  // Tesela con la forma firma: dos esquinas opuestas redondeadas.
  function tesela(x, y, w, h, r, color) {
    return '<path style="fill:var(--' + color + ')" d="M' + (x + r) + ' ' + y + 'H' + (x + w) + 'V' + (y + h - r) +
      'A' + r + ' ' + r + ' 0 0 1 ' + (x + w - r) + ' ' + (y + h) + 'H' + x + 'V' + (y + r) +
      'A' + r + ' ' + r + ' 0 0 1 ' + (x + r) + ' ' + y + 'Z"/>';
  }
  function trazo(n, x, y, escala, color, ancho) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + escala + ')" fill="none" style="stroke:var(--' + color + ')" stroke-width="' + ancho + '" stroke-linecap="round" stroke-linejoin="round">' + TRAZOS[n] + '</g>';
  }
  var ILU = {
    // Mosaico de los niveles: inmueble, llave, score, seguro.
    hero: function () {
      return '<svg class="hero-ilu" viewBox="0 0 232 192" aria-hidden="true">' +
        tesela(0, 0, 112, 92, 28, "azul-600") + trazo("casa", 32, 22, 2, "white", 1.6) +
        tesela(120, 0, 112, 92, 28, "green-500") + trazo("llave", 152, 22, 2, "ink", 1.6) +
        tesela(0, 100, 112, 92, 28, "yellow-400") + trazo("score", 32, 122, 2, "ink", 1.6) +
        tesela(120, 100, 112, 92, 28, "sky-300") + trazo("escudo", 152, 122, 2, "ink", 1.6) +
        '</svg>';
    },
    edificio: function () {
      var v = "";
      for (var f = 0; f < 4; f++) for (var c = 0; c < 3; c++) v += '<rect x="' + (84 + c * 30) + '" y="' + (84 + f * 24) + '" width="18" height="14" style="fill:var(--white)" opacity=".85"/>';
      for (var g = 0; g < 6; g++) v += '<rect x="166" y="' + (56 + g * 22) + '" width="58" height="10" style="fill:var(--sky-400)"/>';
      return '<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
        '<rect width="320" height="200" style="fill:var(--sky-300)"/>' +
        '<circle cx="268" cy="48" r="22" style="fill:var(--yellow-400)"/>' +
        '<rect x="150" y="40" width="90" height="160" style="fill:var(--azul-900)"/>' +
        '<rect x="70" y="68" width="110" height="132" style="fill:var(--azul-600)"/>' + v +
        '<rect x="113" y="176" width="24" height="24" style="fill:var(--yellow-400)"/>' +
        '<rect x="34" y="150" width="6" height="40" style="fill:var(--ink)"/><circle cx="37" cy="146" r="24" style="fill:var(--green-500)"/>' +
        '<rect x="276" y="160" width="6" height="30" style="fill:var(--ink)"/><circle cx="279" cy="156" r="18" style="fill:var(--green-700)"/>' +
        '<rect y="188" width="320" height="12" style="fill:var(--green-700)"/>' +
        '</svg>';
    },
    poliza: function () {
      return '<svg class="ilu" viewBox="0 0 200 160" aria-hidden="true">' +
        tesela(10, 30, 120, 120, 28, "sky-300") + tesela(140, 6, 56, 48, 16, "yellow-400") + tesela(146, 108, 50, 44, 16, "green-500") +
        '<path transform="translate(40 14) scale(5)" style="fill:var(--azul-600)" d="M12 2l9 3.5v6.5c0 5.5-3.8 9-9 10-5.2-1-9-4.5-9-10V5.5z"/>' +
        trazo("casa", 76, 52, 2, "white", 1.8) + '</svg>';
    },
    celular: function () {
      return '<svg class="ilu-sm" viewBox="0 0 120 120" aria-hidden="true">' +
        tesela(4, 24, 104, 90, 24, "sky-300") +
        '<rect x="38" y="6" width="44" height="86" rx="8" style="fill:var(--azul-900)"/>' +
        '<rect x="42" y="16" width="36" height="64" rx="3" style="fill:var(--white)"/>' +
        '<g transform="translate(48 30)" fill="none" style="stroke:var(--azul-600)" stroke-width="2" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></g>' +
        '<circle cx="88" cy="88" r="15" style="fill:var(--green-500)"/>' + trazo("check", 79, 79, 0.75, "ink", 3) + '</svg>';
    },
    listo: function () {
      return '<svg class="ilu" viewBox="0 0 200 160" aria-hidden="true">' +
        tesela(8, 12, 56, 46, 16, "sky-300") + tesela(150, 6, 44, 38, 14, "yellow-400") +
        tesela(160, 116, 34, 32, 12, "magenta-500") + tesela(6, 110, 42, 38, 14, "azul-600") +
        '<circle cx="100" cy="82" r="50" style="fill:var(--green-500)"/>' + trazo("check", 70, 52, 2.5, "ink", 2) + '</svg>';
    }
  };

  // ---------- Pantallas ----------
  // paso: posición en el journey (null = pantalla fuera del flujo)
  var P = {};

  P.inicio = {
    paso: 1, titulo: "Inicio",
    html: function () {
      var pasos = [
        ["casa", "sky", "Publica tu inmueble"],
        ["score", "yel", "Ve el RentScore de cada postulante"],
        ["escudo", "grn", "El inquilino asegura tu inmueble"],
        ["moneda", "mag", "Cobra garantizado o por adelantado"]
      ];
      return '' +
        '<section class="hero">' +
          '<div class="hero-t">' +
            '<span class="eye">Hola, ' + D.propietaria.nombre + '</span>' +
            '<h1 class="h1">Alquila sabiendo <b>a quién</b> y con la seguridad de <b>cobrar</b></h1>' +
            '<p>Evalúa a tus postulantes con datos de Interbank y recibe tu renta sin sorpresas.</p>' +
            (S.publicado
              ? '<a class="btn" href="#/inmueble">Ver mi inmueble</a>'
              : '<a class="btn" href="#/publicar">Publicar inmueble</a>') +
          '</div>' + ILU.hero() +
        '</section>' +
        '<section class="stack"><span class="eye">Cómo funciona</span><div class="g4">' +
          pasos.map(function (x, i) {
            return '<div class="paso">' + ico(x[0], x[1]) + '<span class="caption">Paso ' + (i + 1) + '</span><b>' + x[2] + '</b></div>';
          }).join("") +
        '</div></section>' +
        '<div class="card flat persona">' +
          '<span class="av av-0" aria-hidden="true">' + D.propietaria.nombre[0] + '</span>' +
          '<span class="body-sm"><b>' + D.propietaria.nombre + ', ' + D.propietaria.edad + '</b> · ' + esc(D.inmueble.distrito) + '. Su último inquilino dejó de pagar cuatro meses. ' + sup("Persona y escena ficticias, definidas para el prototipo") + '</span>' +
        '</div>';
    }
  };

  P.publicar = {
    paso: 2, titulo: "Publicar",
    html: function () {
      var i = S.inmueble;
      return '<div class="narrow stack-lg">' +
        '<div class="stack"><span class="eye">Tu inmueble</span><h1 class="h1">Publica tu inmueble</h1>' +
        '<p class="body-sm muted">Se publica en el portal que ya usas.</p></div>' +
        '<form class="card form-g" id="f-publicar">' +
          '<div class="field full"><label for="f-tipo">Tipo</label><select id="f-tipo" name="tipo">' +
            ["Departamento", "Casa", "Habitación"].map(function (t) { return "<option" + (t === i.tipo ? " selected" : "") + ">" + t + "</option>"; }).join("") +
          '</select></div>' +
          '<div class="field full"><label for="f-dir">Dirección</label><input id="f-dir" name="direccion" value="' + esc(i.direccion) + '" required></div>' +
          '<div class="field"><label for="f-dist">Distrito</label><input id="f-dist" name="distrito" value="' + esc(i.distrito) + '" required></div>' +
          '<div class="field"><label for="f-renta">Renta (S/)</label><input id="f-renta" name="renta" type="number" inputmode="numeric" min="300" step="50" value="' + i.renta + '" required></div>' +
          '<div class="field"><label for="f-dorm">Dormitorios</label><input id="f-dorm" name="dormitorios" type="number" inputmode="numeric" min="0" value="' + i.dormitorios + '"></div>' +
          '<div class="field"><label for="f-area">Área (m²)</label><input id="f-area" name="area" type="number" inputmode="numeric" min="1" value="' + i.area + '"></div>' +
          '<button class="btn full" type="submit">Publicar inmueble</button>' +
        '</form></div>';
    },
    montar: function () {
      document.getElementById("f-publicar").addEventListener("submit", function (e) {
        e.preventDefault();
        var f = e.target;
        S.inmueble = Object.assign({}, S.inmueble, {
          tipo: f.tipo.value,
          direccion: f.direccion.value.trim() || D.inmueble.direccion,
          distrito: f.distrito.value.trim() || D.inmueble.distrito,
          dormitorios: +f.dormitorios.value || 0,
          area: +f.area.value || D.inmueble.area,
          renta: Math.max(300, +f.renta.value || D.inmueble.renta)
        });
        S.publicado = true;
        guardar();
        ir("inmueble");
      });
    }
  };

  P.inmueble = {
    paso: 3, titulo: "Mi inmueble",
    html: function () {
      var i = S.inmueble;
      return '<div class="g2">' +
        '<div class="stack">' +
          '<span class="badge ok">Publicado</span>' +
          '<h1 class="h1">Ya tienes <b>3 postulantes</b></h1>' +
          '<p class="body-sm muted">Todos autorizaron que veas su RentScore al postular.</p>' +
          '<div class="acciones"><a class="btn" href="#/postulantes">Ver postulantes</a></div>' +
        '</div>' +
        '<article class="card pc">' +
          '<div class="pc-img">' + ILU.edificio() + '<span class="badge warn">Con postulantes</span></div>' +
          '<div class="pc-bd">' +
            '<span class="pc-cat">' + esc(i.tipo) + ' en alquiler</span>' +
            '<h2 class="title">' + esc(i.direccion) + '</h2>' +
            '<span class="caption">' + esc(i.distrito) + ', Lima</span>' +
            '<div class="chips"><span class="chip">' + i.dormitorios + ' dorm.</span><span class="chip">' + i.area + ' m²</span></div>' +
            '<span class="eye" style="margin-top:16px">Renta mensual</span>' +
            '<span class="price">' + soles(i.renta) + '</span>' +
          '</div>' +
        '</article>' +
      '</div>';
    }
  };

  P.postulantes = {
    paso: 4, titulo: "Postulantes",
    html: function () {
      return '' +
        '<div class="stack"><span class="eye">' + esc(S.inmueble.direccion) + '</span><h1 class="h1">Postulantes</h1></div>' +
        '<div class="g3">' +
          D.postulantes.map(function (p) {
            return '<a class="card pl" href="#/postulante/' + p.id + '">' +
              avatar(p) +
              '<span class="pl-t"><span class="title">' + esc(primerNombre(p)) + '</span>' +
              '<span class="caption">' + esc(p.ocupacion) + '</span>' + badgeScore(p) + '</span>' +
              '<span class="pl-n">' + evaluar(p).score + '<small>de 100</small></span>' +
            '</a>';
          }).join("") +
        '</div>';
    }
  };

  P.postulante = {
    paso: 5, titulo: "Postulante",
    html: function (id) {
      var p = postulante(id);
      var r = evaluar(p);
      return '' +
        '<div class="row">' + avatar(p, "av lg") +
          '<div class="stack" style="gap:4px"><h1 class="h1">' + esc(p.nombre) + '</h1>' +
          '<span class="body-sm muted">' + p.edad + ' años · ' + esc(p.ocupacion) + '</span></div></div>' +
        '<div class="g2">' +
          '<section class="card flat"><span class="eye" style="color:var(--text-muted)">Lo que declara · sin verificar</span>' +
            '<dl class="dl"><dt>Ingreso</dt><dd>' + soles(p.declarado.ingreso) + '</dd>' +
            '<dt>Garantía</dt><dd>' + esc(p.declarado.garantia) + '</dd>' +
            '<dt>Mascotas</dt><dd>' + esc(p.declarado.mascotas) + '</dd></dl>' +
          '</section>' +
          '<section class="card"><span class="eye">RentScore · verificado</span>' +
            '<div class="row"><span class="score-n">' + r.score + '</span>' + badgeScore(p) + '</div>' +
            '<p class="caption">Con datos de Interbank. No verás sus movimientos ni saldos. Gratis para ti ' + sup("Nivel 0 gratuito según el Big Idea (referencial)") + '</p>' +
            '<a class="btn" href="#/resultado/' + id + '">Ver RentScore</a>' +
            '<a class="lk" href="#/consentimiento/' + id + '">Ver su autorización <span class="chev"></span></a>' +
          '</section>' +
        '</div>';
    }
  };

  // Constancia de lo que el postulante autoriza al postular. Solo lectura.
  P.consentimiento = {
    paso: null, titulo: "Autorización", rol: "postulante",
    html: function (id) {
      var p = postulante(id);
      var i = S.inmueble;
      return '<div class="narrow stack-lg">' +
        '<p class="nota">Así postuló ' + primerNombre(p) + ' desde su celular.</p>' +
        '<div class="row">' + ILU.celular() +
          '<div class="stack" style="gap:6px"><span class="eye">Hola, ' + primerNombre(p) + '</span>' +
          '<h1 class="title">Postula a este ' + esc(i.tipo.toLowerCase()) + '</h1>' +
          '<span class="caption">' + esc(i.distrito) + ' · ' + soles(i.renta) + ' al mes</span></div></div>' +
        '<section class="card flat"><span class="eye">Si te aceptan</span><ul class="il">' +
          item(true, 'Pagas un seguro de hogar de 2% a 5% de la renta ' + sup("Decisión 010: 2-5%. Falta tarificar con Interseguro")) +
          item(true, 'Tus pagos puntuales suman para un crédito hipotecario') +
          item(true, 'La garantía se mantiene como siempre') +
        '</ul></section>' +
        '<section class="cb">' +
          '<h2 class="title">Autorizo que ' + D.propietaria.nombre + ' vea mi RentScore</h2>' +
          '<p class="body-sm">Solo verá tu score y tu capacidad de pago. <b>No verá tus movimientos, saldos ni deudas.</b></p>' +
          '<label class="ck"><input type="checkbox" checked disabled><span>Autorizo a Interbank a calcular mi RentScore y mostrárselo al propietario.</span></label>' +
          '<p class="caption">Sin autorización no se puede postular. Texto legal pendiente.</p>' +
        '</section>' +
        '<div class="acciones"><a class="btn sec" href="#/postulante/' + id + '">Volver</a></div>' +
      '</div>';
    }
  };

  function gauge(score, color) {
    var t = Math.max(0.001, score / 100);
    var a = Math.PI * (1 - t);
    var x = (110 + 100 * Math.cos(a)).toFixed(1);
    var y = (112 - 100 * Math.sin(a)).toFixed(1);
    return '<div class="g"><svg viewBox="0 0 220 122" aria-hidden="true">' +
      '<path d="M10 112 A100 100 0 0 1 210 112" fill="none" style="stroke:var(--border)" stroke-width="16"/>' +
      '<path d="M10 112 A100 100 0 0 1 ' + x + ' ' + y + '" fill="none" style="stroke:' + color + '" stroke-width="16"/>' +
      '</svg><div class="g-num">' + score + '<span> / 100</span></div></div>';
  }

  function barraMercado(renta) {
    var ref = D.referenciaMercado;
    var lo = ref.min - 400, hi = ref.max + 400;
    function pos(v) { return Math.min(100, Math.max(0, (v - lo) / (hi - lo) * 100)); }
    var dentro = renta >= ref.min && renta <= ref.max;
    return '<p class="body-sm">Tu renta está <b>' + (dentro ? 'dentro' : 'fuera') + ' del rango</b> para ' + S.inmueble.dormitorios + ' dorm. en ' + esc(S.inmueble.distrito) + '.</p>' +
      '<div class="mk" role="img" aria-label="Tu renta de ' + soles(renta) + ' frente al rango de ' + soles(ref.min) + ' a ' + soles(ref.max) + '">' +
      '<span class="mk-r" style="left:' + pos(ref.min) + '%;width:' + (pos(ref.max) - pos(ref.min)) + '%"></span>' +
      '<span class="mk-p" style="left:' + pos(renta) + '%"></span></div>' +
      '<div class="mk-l"><span>' + soles(ref.min) + '</span><span>Tú: ' + soles(renta) + '</span><span>' + soles(ref.max) + '</span></div>';
  }

  function colorFactor(q) {
    return q >= 0.7 ? "var(--status-success)" : q >= 0.4 ? "var(--status-warning)" : "var(--status-danger)";
  }

  P.resultado = {
    paso: 6, titulo: "RentScore",
    html: function (id) {
      var p = postulante(id);
      var r = evaluar(p);
      var b = BANDA[r.banda];
      var renta = S.inmueble.renta;
      var aviso = "";
      if (r.banda === "bajo") aviso = '<p class="nota danger">Riesgo alto de impago. Cobro Garantizado y Renta Adelantada no están disponibles.</p>';
      else if (r.cuotaSegura < renta) aviso = '<p class="nota warn">La renta supera su capacidad de pago en ' + soles(renta - r.cuotaSegura) + ' al mes.</p>';
      return '' +
        '<div class="row">' + avatar(p, "av lg") +
          '<div class="stack" style="gap:4px"><span class="eye">RentScore</span><h1 class="h1">' + esc(p.nombre) + '</h1></div></div>' +
        '<div class="g2">' +
          '<section class="card">' +
            gauge(r.score, b.color) +
            '<span class="badge ' + b.cls + '" style="align-self:center">' + b.txt + '</span>' +
            '<div class="kv"><span>Capacidad de pago ' + sup("30% del ingreso mensual verificado") + '</span><b>' + soles(r.cuotaSegura) + '</b></div>' +
            '<div class="kv"><span>Renta del inmueble</span><b>' + soles(renta) + '</b></div>' +
            '<p class="caption">Autorizó al postular · ' + D.hoy + ' · Bandas provisionales</p>' +
          '</section>' +
          '<div class="stack">' + aviso +
            '<section class="card flat"><span class="eye">Por qué este score</span><div class="fx">' +
              r.factores.map(function (f) {
                var q = f.puntos / f.max;
                return '<div class="fx-i"><span>' + f.texto + '</span><span class="fx-b"><i style="width:' + Math.max(4, Math.round(q * 100)) + '%;background:' + colorFactor(q) + '"></i></span></div>';
              }).join("") +
            '</div></section>' +
            '<section class="card flat"><span class="eye">Mercado ' + sup("Rango inventado: no hay fuente verificada de rentas por distrito") + '</span>' +
              barraMercado(renta) + '</section>' +
          '</div>' +
        '</div>' +
        '<div class="acciones fila">' +
          (r.banda === "bajo"
            ? '<a class="btn" href="#/postulantes">Ver otros postulantes</a><button class="btn sec" type="button" id="aceptar">Aceptar de todos modos</button>'
            : '<button class="btn" type="button" id="aceptar">Aceptar a ' + primerNombre(p) + '</button><a class="btn sec" href="#/postulantes">Ver otros postulantes</a>') +
        '</div>';
    },
    montar: function (id) {
      document.getElementById("aceptar").addEventListener("click", function () {
        S.aceptado = id;
        guardar();
        ir("poliza/" + id);
      });
    }
  };

  P.poliza = {
    paso: 7, titulo: "Seguro",
    html: function (id) {
      var p = postulante(id);
      var pr = R.prima(S.inmueble.renta, evaluar(p).banda);
      return '<div class="g2">' +
        '<div class="stack">' + ILU.poliza() +
          '<span class="badge info">Emisión simulada</span>' +
          '<h1 class="h1">Tu inmueble queda protegido con <b>RentScore Seguro</b></h1>' +
          '<p class="body-sm muted">Seguro de hogar de Interseguro. Lo contrata y paga ' + primerNombre(p) + '.</p>' +
        '</div>' +
        '<section class="card">' +
          '<span class="eye">Tu póliza</span>' +
          '<div class="kv"><span>Beneficiaria</span><b>' + D.propietaria.nombre + ' (tú)</b></div>' +
          '<div class="kv"><span>Paga</span><b>' + esc(p.nombre) + '</b></div>' +
          '<div class="kv"><span>Prima (' + pct(pr.tasa) + ' de la renta) ' + sup("Decisión 010: 2-5% de la renta. Escalonado por banda: supuesto del prototipo") + '</span><b>' + soles(pr.monto) + ' al mes</b></div>' +
          '<div class="kv"><span>Costo para ti</span><b>S/0</b></div>' +
          '<ul class="il sep">' +
            item(true, 'Daños al inmueble') +
            item(true, 'Responsabilidad civil del inquilino') +
            item(true, 'Siniestro pagado en 15 días hábiles ' + sup("Diseño del Big Idea, no validado con Interseguro")) +
            item(false, 'No cubre impago ni reemplaza la garantía') +
          '</ul>' +
          '<a class="btn" href="#/cobro">Elegir cómo cobrar</a>' +
        '</section>' +
      '</div>';
    }
  };

  P.cobro = {
    paso: 8, titulo: "Cómo cobrar",
    html: function () {
      var p = aceptado();
      var renta = S.inmueble.renta;
      var banda = evaluar(p).banda;
      var cg = R.cobroGarantizado(renta, banda);
      var ra = R.rentaAdelantada(renta, banda);
      // Sin preselección: elegir la opción de pago es lo que mide el piloto.
      var m = (S.modalidad !== "estandar" && !cg.disponible) ? null : S.modalidad;
      function opcion(valor, icon, color, titulo, texto, precio, detalle) {
        return '<label class="so"><input type="radio" name="m" value="' + valor + '"' + (m === valor ? " checked" : "") + '>' +
          '<span class="so-h">' + ico(icon, color) + '<i class="rd"></i></span>' +
          '<span class="title">' + titulo + '</span>' +
          '<span class="body-sm">' + texto + '</span>' +
          '<span class="so-p"><span class="price">' + precio + '</span><span class="caption">' + detalle + '</span></span></label>';
      }
      function noDisponible(icon, color, titulo) {
        return '<div class="so off">' +
          '<span class="so-h">' + ico(icon, color) + '<span class="badge neutral">No disponible</span></span>' +
          '<span class="title">' + titulo + '</span>' +
          '<span class="body-sm muted">Solo con score medio o alto.</span>' +
          '<span class="so-p"><a class="lk" href="#/postulantes">Ver otros postulantes <span class="chev"></span></a></span></div>';
      }
      return '' +
        '<div class="stack"><span class="eye">Solución financiera</span><h1 class="h1">¿Cómo quieres recibir tu renta?</h1>' +
        '<p class="body-sm muted">Opciones para el ' + BANDA[banda].txt.toLowerCase() + ' de ' + primerNombre(p) + '.</p></div>' +
        '<form class="stack-lg" id="f-cobro">' +
          '<div class="g3" role="radiogroup" aria-label="Modalidad de cobro">' +
            opcion("estandar", "moneda", "sky", "Cobro estándar",
              primerNombre(p) + ' te paga cada mes. Si no paga, el riesgo es tuyo.', "S/0", "Sin comisión") +
            (cg.disponible
              ? opcion("cobro", "calendario", "grn", "Cobro Garantizado",
                  'Recibes <b>' + soles(cg.deposito) + '</b> el día 5 de cada mes, pague o no.',
                  soles(cg.comision) + ' al mes',
                  pct(cg.tasa) + ' de la renta · ' + soles(cg.anual) + ' al año ' + sup("3% con score alto, 5% con medio. Cifras del equipo, sin sustento actuarial (decisión 012)"))
              : noDisponible("calendario", "grn", "Cobro Garantizado")) +
            (ra.disponible
              ? opcion("adelanto", "rayo", "yel", "Renta Adelantada",
                  'Recibes hoy <b>' + soles(ra.desembolso) + '</b>: el año de contrato completo.',
                  soles(ra.comision) + ' una vez',
                  pct(ra.tasa) + ' de ' + soles(ra.total) + ' ' + sup("15% con score alto, 25% con medio. Solo contratos de 1 año. Cifras del equipo, sin sustento actuarial (decisión 016)"))
              : noDisponible("rayo", "yel", "Renta Adelantada")) +
          '</div>' +
          '<div class="acciones narrow"><button class="btn" type="submit" id="confirmar"></button></div>' +
        '</form>';
    },
    montar: function () {
      var f = document.getElementById("f-cobro");
      var b = document.getElementById("confirmar");
      // Con un solo radio en el formulario, f.m.value devuelve su valor aunque no esté marcado.
      function elegida() { var c = f.querySelector('input[name="m"]:checked'); return c ? c.value : ""; }
      function etiqueta() {
        var v = elegida();
        b.disabled = !v;
        b.textContent = v === "cobro" ? "Activar Cobro Garantizado"
          : v === "adelanto" ? "Solicitar Renta Adelantada"
          : v === "estandar" ? "Continuar con cobro estándar" : "Elige una opción";
      }
      f.addEventListener("change", etiqueta);
      etiqueta();
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!elegida()) return;
        S.modalidad = elegida();
        S.registrado = new Date().toISOString();
        guardar();
        ir("confirmacion");
      });
    }
  };

  P.confirmacion = {
    paso: 9, titulo: "Listo",
    html: function () {
      var p = aceptado();
      var renta = S.inmueble.renta;
      var banda = evaluar(p).banda;
      var pr = R.prima(renta, banda);
      var cg = R.cobroGarantizado(renta, banda);
      var ra = R.rentaAdelantada(renta, banda);
      var mod = S.modalidad === "cobro" && cg.disponible ? "cobro"
        : S.modalidad === "adelanto" && ra.disponible ? "adelanto" : "estandar";
      var titulo = {
        cobro: 'Recibirás <b>' + soles(cg.deposito) + '</b> cada mes, pase lo que pase',
        adelanto: 'Recibirás <b>' + soles(ra.desembolso) + '</b> por todo el año',
        estandar: 'Tu inmueble está protegido contra <b>daños</b>'
      }[mod];
      var nombreMod = { cobro: "Cobro Garantizado", adelanto: "Renta Adelantada", estandar: "Cobro estándar" }[mod];
      var pagas = { cobro: soles(cg.comision) + " al mes", adelanto: soles(ra.comision) + " una vez", estandar: "S/0" }[mod];
      return '<div class="narrow stack-lg center">' +
        ILU.listo() +
        '<div class="stack"><span class="eye">Solicitud registrada · simulada</span>' +
        '<h1 class="h1">' + titulo + '</h1>' +
        '<p class="body-sm muted">Un asesor de Interbank te contactará para firmar.</p></div>' +
        '<section class="card resumen">' +
          '<div class="kv"><span>Inquilino</span><b>' + esc(p.nombre) + '</b></div>' +
          '<div class="kv"><span>Seguro (paga ' + primerNombre(p) + ')</span><b>' + soles(pr.monto) + ' al mes</b></div>' +
          '<div class="kv"><span>Cobro</span><b>' + nombreMod + '</b></div>' +
          '<div class="kv"><span>Pagas tú</span><b>' + pagas + '</b></div>' +
        '</section>' +
        '<p class="caption">El piloto mide cuántos propietarios activan Cobro Garantizado o Renta Adelantada con comisión real (decisiones 004, 012 y 016).</p>' +
        '<div class="acciones"><a class="btn sec" href="#/inicio">Volver al inicio</a></div>' +
      '</div>';
    }
  };

  // ---------- Router ----------
  var TOTAL = 9;

  function render() {
    var partes = (location.hash.replace(/^#\/?/, "") || "inicio").split("/");
    var nombre = partes[0], id = partes[1];
    var pant = P[nombre];
    // Rutas inválidas o que requieren un postulante inexistente vuelven al inicio.
    if (!pant || (pant.html.length && !postulante(id))) { nombre = "inicio"; pant = P.inicio; id = undefined; }

    var esPost = pant.rol === "postulante";
    var p = id && postulante(id);
    document.getElementById("hd").className = "hd" + (esPost ? " postulante" : "");
    document.getElementById("rol").innerHTML = esPost
      ? '<span>Postulante<b>' + esc(p.nombre) + '</b></span>' + avatar(p, "hd-av")
      : '<span>Propietaria<b>' + D.propietaria.nombre + '</b></span><span class="hd-av" aria-hidden="true">' + D.propietaria.nombre[0] + '</span>';

    document.getElementById("prog").innerHTML = pant.paso
      ? '<div class="prog-bar"><i style="width:' + (pant.paso / TOTAL * 100) + '%"></i></div>' +
        '<div class="prog-t"><b>' + pant.titulo + '</b><span>Paso ' + pant.paso + ' de ' + TOTAL + '</span></div>'
      : '<div class="prog-t"><b>' + pant.titulo + '</b></div>';

    app.innerHTML = '<div class="stack-lg">' + pant.html(id) + '</div>';
    if (pant.montar) pant.montar(id);
    document.title = "LLAVE · " + pant.titulo;
    window.scrollTo(0, 0);
    var h = app.querySelector("h1");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }

  document.getElementById("reiniciar").addEventListener("click", function () {
    S = estadoInicial();
    guardar();
    if (location.hash === "#/inicio") render(); else ir("inicio");
  });

  window.addEventListener("hashchange", render);
  render();
})();
