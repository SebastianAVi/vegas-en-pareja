(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Almacenamiento local (eventos/contactos agregados desde la app)
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  const gmaps = (l) => `https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lng}`;
  const navegar = (l) => `https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}`;
  const lugarPorNombre = (n) => LUGARES.find((l) => l.n === n);

  // ---------- Navegación entre secciones ----------
  let vistaActual = "galeria";
  function mostrar(v) {
    vistaActual = v;
    $$(".vista").forEach((s) => s.classList.toggle("activa", s.id === v));
    $$(".tabs button").forEach((b) => b.classList.toggle("on", b.dataset.v === v));
    if (v === "mapa") iniciarMapa();
  }
  $$(".tabs button").forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.v)));

  // Botón "atrás" de Android: cierra visor/modal o vuelve a la galería
  window.appBack = function () {
    if (!$("#visor").classList.contains("oculto")) { cerrarVisor(); return true; }
    if (!$("#modal").classList.contains("oculto")) { $("#modal").classList.add("oculto"); return true; }
    if (vistaActual !== "galeria") { mostrar("galeria"); return true; }
    return false;
  };

  // ---------- GALERÍA ----------
  let filtroGal = "todo";
  let itemsVisibles = [];
  function pintarGaleria() {
    const grid = $("#gridGaleria");
    itemsVisibles = GALERIA.filter((m) => filtroGal === "todo" || m.tipo === filtroGal);
    if (!itemsVisibles.length) {
      grid.innerHTML = `<div class="vacio"><b>💞</b>Aquí aparecerán nuestras fotos y videos de Las Vegas.</div>`;
      return;
    }
    grid.innerHTML = itemsVisibles.map((m, i) => {
      const thumb = m.tipo === "video"
        ? (m.poster ? `<img src="${esc(m.poster)}" loading="lazy" alt="">` : `<video src="${esc(m.src)}#t=0.5" preload="metadata" muted></video>`)
        : `<img src="${esc(m.src)}" loading="lazy" alt="">`;
      return `<button class="item" data-i="${i}">${thumb}
        ${m.tipo === "video" ? '<span class="play">▶</span>' : ""}
        ${m.titulo ? `<span class="pie">${esc(m.titulo)}</span>` : ""}</button>`;
    }).join("");
    $$(".item", grid).forEach((b) => b.addEventListener("click", () => abrirVisor(+b.dataset.i)));
  }
  $$("#filtroGaleria .chip").forEach((c) => c.addEventListener("click", () => {
    $$("#filtroGaleria .chip").forEach((x) => x.classList.remove("on"));
    c.classList.add("on");
    filtroGal = c.dataset.f;
    pintarGaleria();
  }));

  let idxVisor = 0;
  function abrirVisor(i) {
    idxVisor = (i + itemsVisibles.length) % itemsVisibles.length;
    const m = itemsVisibles[idxVisor];
    $("#visorContenido").innerHTML = m.tipo === "video"
      ? `<video src="${esc(m.src)}" controls autoplay playsinline ${m.poster ? `poster="${esc(m.poster)}"` : ""}></video>`
      : `<img src="${esc(m.src)}" alt="">`;
    $("#visorTitulo").textContent = [m.titulo, m.fecha].filter(Boolean).join(" · ");
    $("#visor").classList.remove("oculto");
  }
  function cerrarVisor() {
    $("#visorContenido").innerHTML = "";
    $("#visor").classList.add("oculto");
  }
  $("#cerrarVisor").addEventListener("click", cerrarVisor);
  $("#prevVisor").addEventListener("click", () => abrirVisor(idxVisor - 1));
  $("#nextVisor").addEventListener("click", () => abrirVisor(idxVisor + 1));
  // Deslizar para cambiar de foto
  let x0 = null;
  $("#visor").addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  $("#visor").addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 60) abrirVisor(idxVisor + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  // ---------- TIENDAS ----------
  function tarjetaLugar(l) {
    const c = CATEGORIAS[l.cat];
    return `<div class="tarjeta">
      <div class="ico">${c.icono}</div>
      <div class="info">
        <h4>${esc(l.n)}</h4>
        <p>${esc(l.tipo)}</p>
        <p>${esc(l.dir)}</p>
        <div class="botones">
          <a class="pri" href="${navegar(l)}">Cómo llegar</a>
          <button data-ver="${esc(l.n)}">Ver en mapa</button>
        </div>
      </div></div>`;
  }
  function pintarTiendas() {
    const q = $("#buscarTienda").value.trim().toLowerCase();
    const tiendas = LUGARES.filter((l) => l.cat === "tienda" && (!q || (l.n + l.tipo + l.dir).toLowerCase().includes(q)));
    $("#listaTiendas").innerHTML = tiendas.length ? tiendas.map(tarjetaLugar).join("") : `<p class="vacio">No hay tiendas con ese nombre.</p>`;
  }
  $("#buscarTienda").addEventListener("input", pintarTiendas);
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ver]");
    if (!b) return;
    const l = lugarPorNombre(b.dataset.ver);
    if (l) { mostrar("mapa"); setTimeout(() => enfocar(l), 150); }
  });

  // ---------- MAPA ----------
  let mapa = null, capas = {}, marcadores = new Map(), miPos = null;
  function iniciarMapa() {
    if (mapa) { setTimeout(() => mapa.invalidateSize(), 50); return; }
    mapa = L.map("map", { zoomControl: false }).setView([36.1147, -115.1728], 13);
    L.control.zoom({ position: "bottomleft" }).addTo(mapa);
    const calles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19, attribution: "&copy; OpenStreetMap"
    }).addTo(mapa);
    const satelite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 19, attribution: "&copy; Esri"
    });
    L.control.layers({ "Calles": calles, "Satélite": satelite }, null, { position: "bottomleft" }).addTo(mapa);

    Object.keys(CATEGORIAS).forEach((k) => { capas[k] = L.layerGroup().addTo(mapa); });
    LUGARES.forEach((l) => {
      const c = CATEGORIAS[l.cat];
      const icon = L.divIcon({
        className: "", iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -30],
        html: `<div class="pin" style="background:${c.color}"><span>${c.icono}</span></div>`
      });
      const m = L.marker([l.lat, l.lng], { icon }).bindPopup(
        `<b>${esc(l.n)}</b><br>${esc(l.tipo)}<br><small>${esc(l.dir)}</small><br><br>
         <a href="${navegar(l)}">🧭 Cómo llegar</a> · <a href="${gmaps(l)}">Abrir en Google Maps</a>`
      );
      m.addTo(capas[l.cat]);
      marcadores.set(l.n, m);
    });

    // Chips de filtro
    const cont = $("#filtroMapa");
    cont.innerHTML = `<button class="chip" data-c="vegas">📍 Las Vegas</button>` +
      Object.entries(CATEGORIAS).map(([k, c]) => `<button class="chip on" data-c="${k}">${c.icono} ${c.nombre}</button>`).join("");
    $$(".chip", cont).forEach((ch) => ch.addEventListener("click", () => {
      const k = ch.dataset.c;
      if (k === "vegas") { mapa.setView([36.1147, -115.1728], 13); return; }
      const on = ch.classList.toggle("on");
      on ? capas[k].addTo(mapa) : mapa.removeLayer(capas[k]);
      if (on && k === "ruta") mapa.fitBounds(LUGARES.filter((l) => l.cat === "ruta").map((l) => [l.lat, l.lng]), { padding: [40, 40] });
    }));
    setTimeout(() => mapa.invalidateSize(), 50);
  }
  function enfocar(l) {
    iniciarMapa();
    if (!mapa.hasLayer(capas[l.cat])) {
      capas[l.cat].addTo(mapa);
      const ch = $(`#filtroMapa [data-c="${l.cat}"]`); if (ch) ch.classList.add("on");
    }
    mapa.setView([l.lat, l.lng], 16);
    marcadores.get(l.n)?.openPopup();
  }
  $("#btnUbicacion").addEventListener("click", () => {
    if (!navigator.geolocation) return alert("Ubicación no disponible");
    navigator.geolocation.getCurrentPosition((p) => {
      const ll = [p.coords.latitude, p.coords.longitude];
      if (miPos) miPos.setLatLng(ll);
      else miPos = L.circleMarker(ll, { radius: 9, color: "#fff", weight: 3, fillColor: "#4A8CFF", fillOpacity: 1 }).addTo(mapa).bindPopup("Estamos aquí 💕");
      mapa.setView(ll, 16);
    }, () => alert("No se pudo obtener la ubicación. Revisa que el GPS esté activado."), { enableHighAccuracy: true, timeout: 15000 });
  });

  // ---------- EVENTOS ----------
  const fmtFecha = (f) => {
    if (!f) return "Fecha por definir";
    const d = new Date(f + "T12:00:00");
    return isNaN(d) ? f : d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
  };
  function pintarEventos() {
    const propios = store.get("eventos").map((e, i) => ({ ...e, _i: i }));
    const todos = [...EVENTOS, ...propios].sort((a, b) => (a.fecha || "9999").localeCompare(b.fecha || "9999"));
    $("#listaEventos").innerHTML = todos.map((e) => {
      const l = lugarPorNombre(e.lugar);
      return `<div class="tarjeta">
        <div class="ico">🎟️</div>
        <div class="info">
          <h4>${esc(e.titulo)}</h4>
          <p class="fecha">${esc(fmtFecha(e.fecha))}${e.hora ? " · " + esc(e.hora) : ""}</p>
          ${e.lugar ? `<p>📍 ${esc(e.lugar)}</p>` : ""}
          ${e.nota ? `<p>${esc(e.nota)}</p>` : ""}
          <div class="botones">
            ${l ? `<button data-ver="${esc(l.n)}">Ver en mapa</button><a href="${navegar(l)}">Cómo llegar</a>` : ""}
            ${e._i !== undefined ? `<button data-borrar-evento="${e._i}">Eliminar</button>` : ""}
          </div>
        </div></div>`;
    }).join("");
    $$("[data-borrar-evento]").forEach((b) => b.addEventListener("click", () => {
      if (!confirm("¿Eliminar este evento?")) return;
      const arr = store.get("eventos"); arr.splice(+b.dataset.borrarEvento, 1); store.set("eventos", arr); pintarEventos();
    }));
  }
  $("#btnNuevoEvento").addEventListener("click", () => formulario("Nuevo evento", [
    { k: "titulo", l: "Nombre del evento", req: true },
    { k: "fecha", l: "Fecha", type: "date" },
    { k: "hora", l: "Hora", type: "time" },
    { k: "lugar", l: "Lugar" },
    { k: "nota", l: "Notas", area: true }
  ], (d) => { const a = store.get("eventos"); a.push(d); store.set("eventos", a); pintarEventos(); }));

  // ---------- CONTACTOS ----------
  function pintarContactos() {
    const propios = store.get("contactos").map((c, i) => ({ ...c, icono: "⭐", _i: i }));
    $("#listaContactos").innerHTML = [...propios, ...CONTACTOS].map((c) => `<div class="tarjeta">
        <div class="ico">${c.icono || "📞"}</div>
        <div class="info">
          <h4>${esc(c.nombre)}</h4>
          ${c.tel ? `<p>${esc(c.tel)}</p>` : ""}
          ${c.nota ? `<p>${esc(c.nota)}</p>` : ""}
          <div class="botones">
            ${c.tel ? `<a class="pri" href="tel:${esc(c.tel.replace(/[^\d+]/g, ""))}">Llamar</a>` : ""}
            ${c.tel && c.tel.length > 6 ? `<a href="https://wa.me/${esc(c.tel.replace(/\D/g, ""))}">WhatsApp</a>` : ""}
            ${c.lat ? `<a href="${navegar(c)}">Cómo llegar</a>` : ""}
            ${c._i !== undefined ? `<button data-borrar-contacto="${c._i}">Eliminar</button>` : ""}
          </div>
        </div></div>`).join("");
    $$("[data-borrar-contacto]").forEach((b) => b.addEventListener("click", () => {
      if (!confirm("¿Eliminar este contacto?")) return;
      const arr = store.get("contactos"); arr.splice(+b.dataset.borrarContacto, 1); store.set("contactos", arr); pintarContactos();
    }));
  }
  $("#btnNuevoContacto").addEventListener("click", () => formulario("Nuevo contacto", [
    { k: "nombre", l: "Nombre", req: true },
    { k: "tel", l: "Teléfono (con código de país, ej. +569…)", type: "tel", req: true },
    { k: "nota", l: "Nota (parentesco, seguro de viaje, etc.)" }
  ], (d) => { const a = store.get("contactos"); a.push(d); store.set("contactos", a); pintarContactos(); }));

  // ---------- Formulario genérico ----------
  let alGuardar = null;
  function formulario(titulo, campos, cb) {
    $("#formTitulo").textContent = titulo;
    $("#formCampos").innerHTML = campos.map((c) => `<label>${esc(c.l)}</label>` + (c.area
      ? `<textarea name="${c.k}" rows="3"></textarea>`
      : `<input name="${c.k}" type="${c.type || "text"}" ${c.req ? "required" : ""}>`)).join("");
    alGuardar = cb;
    $("#modal").classList.remove("oculto");
    $("#formCampos input")?.focus();
  }
  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target).entries());
    alGuardar && alGuardar(d);
    $("#modal").classList.add("oculto");
  });
  $("#formCancelar").addEventListener("click", () => $("#modal").classList.add("oculto"));

  // ---------- Inicio ----------
  pintarGaleria();
  pintarTiendas();
  pintarEventos();
  pintarContactos();
})();
