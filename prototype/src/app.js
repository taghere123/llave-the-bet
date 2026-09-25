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
      solicitudes: {}, // id -> solicitado | autorizado | rechazado | listo
      aceptado: null,
      modalidad: null, // estandar | cobro
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
  function evaluar(p) { return R.calcular(p.financiero, S.inmueble.renta); }

  var BANDA = {
    alto: { txt: "Score alto", cls: "ok", color: "var(--status-success)" },
    medio: { txt: "Score medio", cls: "warn", color: "var(--yellow-400)" },
    bajo: { txt: "Score bajo", cls: "danger", color: "var(--status-danger)" }
  };

  function badgePostulante(p) {
    var st = S.solicitudes[p.id];
    if (st === "listo") { var b = BANDA[evaluar(p).banda]; return '<span class="badge ' + b.cls + '">' + b.txt + "</span>"; }
    if (st === "solicitado") return '<span class="badge info">Esperando autorización</span>';
    if (st === "autorizado") return '<span class="badge info">Evaluando</span>';
    if (st === "rechazado") return '<span class="badge danger">No autorizó</span>';
    return '<span class="badge neutral">Sin evaluar</span>';
  }

  var ICON_CASA = '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>';

  // ---------- Pantallas ----------
  // paso: posición en el journey (null = pantalla informativa fuera del flujo)
  var P = {};

  P.inicio = {
    paso: 1, titulo: "Entrada",
    html: function () {
      var i = S.inmueble;
      return '' +
        '<section class="hero">' +
          '<span class="eye">Hola, ' + D.propietaria.nombre + '</span>' +
          '<h1 class="h1">Alquila sabiendo <b>a quién</b> y con la seguridad de <b>cobrar</b></h1>' +
          '<p>LLAVE funciona dentro del portal inmobiliario que ya usas. No es otro portal de avisos: evalúa a tu postulante con datos reales y protege tu renta.</p>' +
        '</section>' +
        '<div class="card flat">' +
          '<span class="eye">La escena ' + sup("Persona y escena ficticias, definidas para el prototipo") + '</span>' +
          '<p class="body-sm">' + D.propietaria.nombre + ', ' + D.propietaria.edad + ' años. ' + esc(D.propietaria.escena) + '</p>' +
        '</div>' +
        '<div class="card">' +
          '<span class="eye">Cómo funciona</span>' +
          '<ol class="lista">' +
            '<li>Publicas tu inmueble y recibes postulantes.</li>' +
            '<li>Pides el RentScore: el postulante autoriza y tú ves su score, no sus datos.</li>' +
            '<li>Si aceptas, el inquilino paga un seguro que reemplaza la garantía de dos meses.</li>' +
            '<li>Eliges cómo cobrar: directo, o con Cobro Garantizado de Interbank.</li>' +
          '</ol>' +
        '</div>' +
        '<div class="acciones">' +
          (S.publicado
            ? '<a class="btn" href="#/inmueble">Ver mi inmueble publicado</a>'
            : '<a class="btn" href="#/publicar">Publicar inmueble</a>') +
        '</div>' +
        '<p class="caption">Tu inmueble: ' + esc(i.tipo) + ' en ' + esc(i.distrito) + ', ' + soles(i.renta) + ' al mes.</p>';
    }
  };

  P.publicar = {
    paso: 2, titulo: "Publicar inmueble",
    html: function () {
      var i = S.inmueble;
      return '' +
        '<div class="stack"><span class="eye">Paso 1 · Tu inmueble</span><h1 class="h1">Publica tu inmueble</h1>' +
        '<p class="body-sm muted">Solo lo básico. El aviso se publica en el portal existente; LLAVE agrega la evaluación y la protección.</p></div>' +
        '<form class="card" id="f-publicar">' +
          '<div class="field"><label for="f-tipo">Tipo</label><select id="f-tipo" name="tipo">' +
            ["Departamento", "Casa", "Habitación"].map(function (t) { return "<option" + (t === i.tipo ? " selected" : "") + ">" + t + "</option>"; }).join("") +
          '</select></div>' +
          '<div class="field"><label for="f-dir">Dirección</label><input id="f-dir" name="direccion" value="' + esc(i.direccion) + '" required></div>' +
          '<div class="field"><label for="f-dist">Distrito</label><input id="f-dist" name="distrito" value="' + esc(i.distrito) + '" required></div>' +
          '<div class="row2">' +
            '<div class="field"><label for="f-dorm">Dormitorios</label><input id="f-dorm" name="dormitorios" type="number" min="0" value="' + i.dormitorios + '"></div>' +
            '<div class="field"><label for="f-area">Área (m²)</label><input id="f-area" name="area" type="number" min="1" value="' + i.area + '"></div>' +
          '</div>' +
          '<div class="field"><label for="f-renta">Renta mensual (S/)</label><input id="f-renta" name="renta" type="number" min="300" step="50" value="' + i.renta + '" required></div>' +
          '<button class="btn" type="submit">Publicar inmueble</button>' +
        '</form>';
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
    paso: 3, titulo: "Mis inmuebles",
    html: function () {
      var i = S.inmueble;
      return '' +
        '<div class="stack"><span class="eye">Mis inmuebles</span><h1 class="h1">Tu aviso está publicado</h1></div>' +
        '<p class="nota">Simulado: en la demo llegan 3 postulantes de inmediato desde el portal.</p>' +
        '<article class="card pc">' +
          '<div class="pc-img">' + ICON_CASA + '<span class="badge warn">Con postulantes</span></div>' +
          '<div class="pc-bd">' +
            '<span class="pc-cat">' + esc(i.tipo) + ' en alquiler</span>' +
            '<h2 class="title">' + esc(i.direccion) + '</h2>' +
            '<span class="caption">' + esc(i.distrito) + ', Lima · ' + i.dormitorios + ' dorm. · ' + i.area + ' m²</span>' +
            '<span class="eye" style="margin-top:16px">Renta mensual</span>' +
            '<span class="price">' + soles(i.renta) + '</span>' +
            '<a class="lk" href="#/postulantes" style="margin-top:8px">Ver 3 postulantes <span class="chev"></span></a>' +
          '</div>' +
        '</article>';
    }
  };

  P.postulantes = {
    paso: 4, titulo: "Postulantes",
    html: function () {
      return '' +
        '<div class="stack"><span class="eye">' + esc(S.inmueble.direccion) + '</span><h1 class="h1">Postulantes</h1>' +
        '<p class="body-sm muted">Hoy solo tienes lo que cada postulante dice de sí mismo.</p></div>' +
        D.postulantes.map(function (p) {
          return '<a class="card pl" href="#/postulante/' + p.id + '">' +
            '<span class="av" aria-hidden="true">' + iniciales(p) + '</span>' +
            '<span class="pl-t"><span class="title">' + esc(p.nombre) + '</span>' +
            '<span class="caption">' + esc(p.ocupacion) + '</span>' +
            '<span class="caption">Ingreso declarado: ' + soles(p.declarado.ingreso) + '</span>' +
            badgePostulante(p) + '</span>' +
            '<span class="chev" style="color:var(--action)" aria-hidden="true"></span>' +
          '</a>';
        }).join("");
    }
  };

  P.postulante = {
    paso: 5, titulo: "Detalle del postulante",
    html: function (id) {
      var p = postulante(id);
      var st = S.solicitudes[id];
      var cta;
      if (st === "listo") cta = '<a class="btn" href="#/resultado/' + id + '">Ver RentScore</a>';
      else if (st === "autorizado") cta = '<a class="btn" href="#/evaluando/' + id + '">Ver evaluación en curso</a>';
      else if (st === "solicitado") cta = '<a class="btn sec" href="#/consentimiento/' + id + '">Ver lo que recibió ' + primerNombre(p) + '</a>';
      else cta = '<button class="btn" type="button" id="solicitar">Solicitar RentScore</button>' +
        '<p class="caption" style="text-align:center">Gratis para ti ' + sup("Nivel 0 gratuito según el Big Idea (referencial)") + '</p>';
      return '' +
        '<div class="stack">' + badgePostulante(p) + '<h1 class="h1">' + esc(p.nombre) + '</h1>' +
        '<p class="body-sm muted">' + p.edad + ' años · ' + esc(p.ocupacion) + '</p></div>' +
        (st === "rechazado" ? '<p class="nota danger">' + primerNombre(p) + ' no autorizó la consulta. Sin autorización no hay RentScore.</p>' : '') +
        '<div class="vs">' +
          '<div class="panel"><span class="eye" style="color:var(--text-muted)">Lo que sabes hoy</span>' +
            '<span class="body-sm">Ingreso declarado</span><span class="price">' + soles(p.declarado.ingreso) + '</span>' +
            '<span class="caption">Garantía: ' + esc(p.declarado.garantia) + '</span>' +
            '<span class="caption">Mascotas: ' + esc(p.declarado.mascotas) + '</span>' +
            '<span class="caption" style="margin-top:8px"><b>Nada de esto está verificado.</b></span></div>' +
          '<div class="panel" style="border-color:var(--action)"><span class="eye">Con RentScore</span>' +
            '<span class="body-sm">Score de 0 a 100 con datos bancarios reales, capacidad de pago recomendada y comparación con el mercado.</span>' +
            '<span class="caption" style="margin-top:8px">No verás sus movimientos ni saldos.</span></div>' +
        '</div>' +
        '<div class="acciones">' + cta + '</div>';
    },
    montar: function (id) {
      var b = document.getElementById("solicitar");
      if (b) b.addEventListener("click", function () {
        S.solicitudes[id] = "solicitado";
        guardar();
        ir("consentimiento/" + id);
      });
    }
  };

  P.consentimiento = {
    paso: 6, titulo: "Autorización del postulante", rol: "postulante",
    html: function (id) {
      var p = postulante(id);
      var i = S.inmueble;
      return '' +
        '<p class="nota">Cambio de vista: esto es lo que recibe ' + primerNombre(p) + ' en su celular.</p>' +
        '<div class="stack"><span class="eye">Hola, ' + primerNombre(p) + '</span>' +
        '<h1 class="h1">' + D.propietaria.nombre + ' quiere evaluar tu postulación</h1>' +
        '<p class="body-sm muted">' + esc(i.tipo) + ' en ' + esc(i.distrito) + ' · ' + soles(i.renta) + ' al mes</p></div>' +
        '<div class="card flat"><span class="eye">Qué ganas</span><ul class="lista">' +
          '<li>No dejas dos meses de garantía (' + soles(i.renta * 2) + ').</li>' +
          '<li>Pagas un seguro mensual de 2% a 5% de la renta, según tu evaluación ' + sup("Modelo B de la decisión 010, abierta") + '</li>' +
          '<li>Cada pago puntual suma a tu historial para un futuro crédito hipotecario.</li>' +
        '</ul></div>' +
        '<form class="cb" id="f-consent">' +
          '<h2 class="title">Autoriza la evaluación de tus datos</h2>' +
          '<p class="body-sm">' + D.propietaria.nombre + ' recibirá solo tu score y tu capacidad de pago. <b>No verá tus movimientos, saldos ni deudas.</b></p>' +
          '<label class="ck"><input type="checkbox" id="acepto"><span>Autorizo a Interbank a consultar mis datos financieros para calcular mi RentScore.</span></label>' +
          '<button class="btn" type="submit" id="autorizar" disabled>Autorizar y continuar</button>' +
          '<a class="lk" href="#/consentimiento/' + id + '" onclick="return false">Política de tratamiento de datos <span class="chev"></span></a>' +
          '<p class="caption">Texto legal pendiente con Legal. Versión de prototipo.</p>' +
        '</form>' +
        '<button class="lk" type="button" id="rechazar" style="align-self:center">Ahora no</button>';
    },
    montar: function (id) {
      var ck = document.getElementById("acepto");
      var bt = document.getElementById("autorizar");
      ck.addEventListener("change", function () { bt.disabled = !ck.checked; });
      document.getElementById("f-consent").addEventListener("submit", function (e) {
        e.preventDefault();
        if (!ck.checked) return;
        S.solicitudes[id] = "autorizado";
        guardar();
        ir("evaluando/" + id);
      });
      document.getElementById("rechazar").addEventListener("click", function () {
        S.solicitudes[id] = "rechazado";
        guardar();
        ir("postulante/" + id);
      });
    }
  };

  P.evaluando = {
    paso: 7, titulo: "Evaluando",
    html: function (id) {
      var p = postulante(id);
      return '' +
        '<div class="stack"><span class="badge info">Evaluando</span><h1 class="h1">Estamos preparando el RentScore de ' + primerNombre(p) + '</h1>' +
        '<p class="body-sm muted">El reporte llega en hasta 48 horas ' + sup("Plazo del Big Idea, no probado") + '</p></div>' +
        '<div class="card"><ol class="tl">' +
          '<li class="done"><span class="dot"></span><span><b>Solicitud enviada</b><br><span class="caption">' + D.hoy + ', 10:02</span></span></li>' +
          '<li class="done"><span class="dot"></span><span><b>' + primerNombre(p) + ' autorizó la consulta</b><br><span class="caption">' + D.hoy + ', 10:14</span></span></li>' +
          '<li class="now"><span class="dot"></span><span><b>Consultando datos financieros</b><br><span class="caption">En curso</span></span></li>' +
          '<li><span class="dot"></span><span><b>Reporte listo</b><br><span class="caption">Te avisamos por correo y en la app</span></span></li>' +
        '</ol></div>' +
        '<div class="acciones"><button class="btn" type="button" id="adelantar">Ver el reporte (simular 48 horas)</button></div>' +
        '<p class="caption" style="text-align:center">En la demo el tiempo se adelanta.</p>';
    },
    montar: function (id) {
      document.getElementById("adelantar").addEventListener("click", function () {
        S.solicitudes[id] = "listo";
        guardar();
        ir("resultado/" + id);
      });
    }
  };

  function gauge(score, color) {
    var t = Math.max(0.001, score / 100);
    var a = Math.PI * (1 - t);
    var x = (110 + 100 * Math.cos(a)).toFixed(1);
    var y = (112 - 100 * Math.sin(a)).toFixed(1);
    return '<div class="g"><svg viewBox="0 0 220 122" aria-hidden="true">' +
      '<path d="M10 112 A100 100 0 0 1 210 112" fill="none" stroke="var(--border)" stroke-width="16"/>' +
      '<path d="M10 112 A100 100 0 0 1 ' + x + ' ' + y + '" fill="none" stroke="' + color + '" stroke-width="16"/>' +
      '</svg><div class="g-num">' + score + '<span> / 100</span></div></div>';
  }

  function barraMercado(renta) {
    var ref = D.referenciaMercado;
    var lo = ref.min - 400, hi = ref.max + 400;
    function pos(v) { return Math.min(100, Math.max(0, (v - lo) / (hi - lo) * 100)); }
    var dentro = renta >= ref.min && renta <= ref.max;
    return '<div class="mk" role="img" aria-label="Tu renta de ' + soles(renta) + ' frente al rango de ' + soles(ref.min) + ' a ' + soles(ref.max) + '">' +
      '<span class="mk-r" style="left:' + pos(ref.min) + '%;width:' + (pos(ref.max) - pos(ref.min)) + '%"></span>' +
      '<span class="mk-p" style="left:' + pos(renta) + '%"></span></div>' +
      '<div class="mk-l"><span>' + soles(lo) + '</span><span>Rango: ' + soles(ref.min) + '–' + soles(ref.max) + '</span><span>' + soles(hi) + '</span></div>' +
      '<p class="body-sm">Tu renta de ' + soles(renta) + (dentro ? ' está dentro del rango' : ' está fuera del rango') + ' para ' + S.inmueble.dormitorios + ' dorm. en ' + esc(S.inmueble.distrito) + '.</p>';
  }

  P.resultado = {
    paso: 8, titulo: "RentScore",
    html: function (id) {
      var p = postulante(id);
      var r = evaluar(p);
      var b = BANDA[r.banda];
      var renta = S.inmueble.renta;
      var alcanza = r.cuotaSegura >= renta;
      var aviso = "";
      if (r.banda === "bajo") aviso = '<p class="nota danger">Score bajo: el riesgo de impago es alto y el seguro sería el más caro. Te sugerimos revisar a otros postulantes.</p>';
      else if (!alcanza) aviso = '<p class="nota warn">La renta supera la capacidad de pago recomendada por ' + soles(renta - r.cuotaSegura) + ' al mes.</p>';
      return '' +
        '<div class="stack"><span class="eye">RentScore del postulante</span><h1 class="h1">' + esc(p.nombre) + '</h1></div>' +
        '<section class="card">' +
          gauge(r.score, b.color) +
          '<span class="badge ' + b.cls + '" style="align-self:center">' + b.txt + '</span>' +
          '<div class="kv"><span>Capacidad de pago recomendada ' + sup("30% del ingreso mensual verificado") + '</span><b>' + soles(r.cuotaSegura) + '</b></div>' +
          '<div class="kv"><span>Renta del inmueble</span><b>' + soles(renta) + '</b></div>' +
          '<p class="caption">' + primerNombre(p) + ' autorizó la consulta el ' + D.hoy + '. Bandas provisionales: 0-39, 40-69, 70-100.</p>' +
        '</section>' +
        aviso +
        '<section class="card flat"><span class="eye">Por qué este score</span><ul class="lista">' +
          r.factores.map(function (f) { return '<li>' + f.texto + '</li>'; }).join("") +
        '</ul><p class="caption">Resumen en palabras. No se muestran movimientos, saldos ni deudas.</p></section>' +
        '<section class="card flat"><span class="eye">Comparación con el mercado ' + sup("Rango inventado: no hay fuente verificada de rentas por distrito") + '</span>' +
          barraMercado(renta) + '</section>' +
        '<div class="acciones">' +
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
    paso: 9, titulo: "Póliza RentScore Seguro",
    html: function (id) {
      var p = postulante(id);
      var r = evaluar(p);
      var renta = S.inmueble.renta;
      var pr = R.prima(renta, r.banda);
      return '' +
        '<div class="stack"><span class="badge info">Propuesta · emisión simulada</span><h1 class="h1">Tu renta queda protegida con <b>RentScore Seguro</b></h1></div>' +
        '<section class="card">' +
          '<span class="eye">Póliza de alquiler · Interseguro</span>' +
          '<div class="kv"><span>Beneficiaria</span><b>' + D.propietaria.nombre + ' (tú)</b></div>' +
          '<div class="kv"><span>Contrata y paga</span><b>' + esc(p.nombre) + '</b></div>' +
          '<div class="kv"><span>Inmueble</span><b>' + esc(S.inmueble.direccion) + '</b></div>' +
          '<div class="kv"><span>Prima mensual (' + pct(pr.tasa) + ' de la renta) ' + sup("Modelo B de la decisión 010 (2-5%), escalonado por banda. Abierto con Interseguro") + '</span><b>' + soles(pr.monto) + '</b></div>' +
          '<div class="kv"><span>Costo para ti</span><b>S/0</b></div>' +
        '</section>' +
        '<section class="card flat"><span class="eye">Qué cubre</span><ul class="lista">' +
          '<li>Impago de renta hasta 6 meses (hasta ' + soles(renta * 6) + ').</li>' +
          '<li>Daños al inmueble.</li>' +
          '<li>Responsabilidad civil del inquilino.</li>' +
          '<li>Siniestro pagado en 15 días hábiles ' + sup("Diseño del Big Idea, no validado con Interseguro") + '</li>' +
        '</ul>' +
        '<p class="body-sm">Reemplaza la garantía de dos meses: ' + primerNombre(p) + ' no inmoviliza ' + soles(renta * 2) + '.</p></section>' +
        '<div class="acciones"><a class="btn" href="#/cobro">Elegir cómo cobrar</a></div>';
    }
  };

  P.cobro = {
    paso: 10, titulo: "Cómo cobrar",
    html: function () {
      var renta = S.inmueble.renta;
      var cg = R.cobroGarantizado(renta);
      var m = S.modalidad; // sin preselección: elegir la opción de pago es lo que mide el piloto
      return '' +
        '<div class="stack"><span class="eye">Solución financiera</span><h1 class="h1">¿Cómo quieres recibir tu renta?</h1></div>' +
        '<form class="stack" id="f-cobro" role="radiogroup" aria-label="Modalidad de cobro">' +
          '<label class="so"><input type="radio" name="m" value="estandar"' + (m === "estandar" ? " checked" : "") + '><i class="rd"></i><span class="so-b">' +
            '<span class="title">Cobro estándar</span>' +
            '<span class="body-sm">El inquilino te paga cada mes en tu Cuenta Arrendador. Si deja de pagar, la póliza te cubre hasta 6 meses.</span>' +
            '<span class="price">S/0 para ti</span></span></label>' +
          '<label class="so"><input type="radio" name="m" value="cobro"' + (m === "cobro" ? " checked" : "") + '><i class="rd"></i><span class="so-b">' +
            '<span class="title">Cobro Garantizado</span>' +
            '<span class="body-sm">Interbank te deposita <b>' + soles(cg.deposito) + '</b> el día 5 de cada mes, haya pagado o no el inquilino.</span>' +
            '<span class="price">' + soles(cg.comision) + ' al mes ' + sup("15% de cada renta mensual. Cifra del equipo, sin sustento actuarial ni aprobación de Riesgos (decisión 012)") + '</span>' +
            '<span class="caption">Comisión de ' + pct(cg.tasa) + ' de la renta · ' + soles(cg.anual) + ' al año</span></span></label>' +
          '<a class="so off" href="#/renta-adelantada"><i class="rd" style="border-style:dashed"></i><span class="so-b">' +
            '<span class="badge neutral">Fuera del MVP · informativo</span>' +
            '<span class="title">Renta Adelantada</span>' +
            '<span class="body-sm">Recibir meses de renta por adelantado. No disponible.</span>' +
            '<span class="lk">Conocer más <span class="chev"></span></span></span></a>' +
          '<div class="acciones"><button class="btn" type="submit" id="confirmar"></button></div>' +
        '</form>';
    },
    montar: function () {
      var f = document.getElementById("f-cobro");
      var b = document.getElementById("confirmar");
      function etiqueta() {
        b.disabled = !f.m.value;
        b.textContent = f.m.value === "cobro" ? "Activar Cobro Garantizado"
          : f.m.value === "estandar" ? "Continuar con cobro estándar" : "Elige una opción";
      }
      f.addEventListener("change", etiqueta);
      etiqueta();
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!f.m.value) return;
        S.modalidad = f.m.value;
        S.registrado = new Date().toISOString();
        guardar();
        ir("confirmacion");
      });
    }
  };

  P["renta-adelantada"] = {
    paso: null, titulo: "Renta Adelantada (informativo)",
    html: function () {
      return '' +
        '<div class="stack"><span class="badge neutral">Fuera del MVP · informativo</span><h1 class="h1">Renta Adelantada</h1></div>' +
        '<section class="card flat">' +
          '<p class="body-sm">Recibirías en un solo desembolso la renta de un trimestre, un semestre, un año o todo el contrato, con una comisión que crece según el plazo.</p>' +
          '<p class="body-sm">No es parte del piloto de 90 días. Antes hay que definir con Riesgos y Legal si se estructura como cesión de cobro o como crédito ante la SBS.</p>' +
          '<p class="caption">Sin montos ni comisiones a propósito: no hay sustento actuarial.</p>' +
        '</section>' +
        '<div class="acciones"><a class="btn sec" href="#/cobro">Volver</a></div>';
    }
  };

  P.confirmacion = {
    paso: 11, titulo: "Listo",
    html: function () {
      var p = postulante(S.aceptado) || D.postulantes[0];
      var renta = S.inmueble.renta;
      var pr = R.prima(renta, evaluar(p).banda);
      var cg = R.cobroGarantizado(renta);
      var esCobro = S.modalidad === "cobro";
      return '' +
        '<section class="hero">' +
          '<span class="eye">Solicitud registrada · simulada</span>' +
          '<h1 class="h1">' + (esCobro ? 'Recibirás <b>' + soles(cg.deposito) + '</b> cada mes, pase lo que pase' : 'Tu renta está protegida hasta <b>6 meses</b>') + '</h1>' +
          '<p>Un asesor de Interbank te contactará para firmar. En el prototipo no se envía nada.</p>' +
        '</section>' +
        '<section class="card">' +
          '<span class="eye">Resumen</span>' +
          '<div class="kv"><span>Inmueble</span><b>' + esc(S.inmueble.direccion) + '</b></div>' +
          '<div class="kv"><span>Inquilino</span><b>' + esc(p.nombre) + '</b></div>' +
          '<div class="kv"><span>RentScore Seguro (paga ' + primerNombre(p) + ')</span><b>' + soles(pr.monto) + ' al mes</b></div>' +
          '<div class="kv"><span>Modalidad de cobro</span><b>' + (esCobro ? "Cobro Garantizado" : "Cobro estándar") + '</b></div>' +
          '<div class="kv"><span>Pagas tú</span><b>' + (esCobro ? soles(cg.comision) + ' al mes' : "S/0") + '</b></div>' +
        '</section>' +
        '<p class="nota">Qué mide el piloto: cuántos propietarios activan Cobro Garantizado con comisión real. Es la hipótesis del MVP (decisiones 004 y 012).</p>' +
        '<div class="acciones"><a class="btn sec" href="#/inicio">Volver al inicio</a></div>';
    }
  };

  // ---------- Router ----------
  var TOTAL = 11;

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
      ? "Vista del postulante<b>" + esc(p.nombre) + "</b>"
      : "Vista de la propietaria<b>" + D.propietaria.nombre + "</b>";

    document.getElementById("prog").innerHTML = pant.paso
      ? '<div class="prog-bar"><i style="width:' + (pant.paso / TOTAL * 100) + '%"></i></div>' +
        '<div class="prog-t"><span>' + pant.titulo + '</span><span>' + pant.paso + ' de ' + TOTAL + '</span></div>'
      : '<div class="prog-t"><span>' + pant.titulo + '</span></div>';

    app.innerHTML = '<div class="stack">' + pant.html(id) + '</div>';
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
