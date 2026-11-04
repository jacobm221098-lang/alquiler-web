// ============================================================
//  CATEGORÍAS
// ============================================================
const CATEGORIAS = [
  { id: "todas",       nombre: "Todo",          icono: "🏷️" },
  { id: "propiedades", nombre: "Propiedades",   icono: "🏠" },
  { id: "vehiculos",   nombre: "Vehículos",     icono: "🚗" },
  { id: "maquinaria",  nombre: "Maquinaria",    icono: "🏗️" },
  { id: "eventos",     nombre: "Eventos",       icono: "🎉" },
  { id: "herramientas",nombre: "Herramientas",  icono: "🔧" },
];
const PROVINCIAS = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];
const NOMBRE_CAT = Object.fromEntries(CATEGORIAS.map((c) => [c.id, c.nombre]));
const FOTO_DEFAULT = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80";

// ============================================================
//  ANUNCIOS DE EJEMPLO (semilla, para que la página no esté vacía)
//  Cuando la gente publique, sus anuncios se suman a estos.
// ============================================================
const semilla = [
  { categoria: "propiedades", titulo: "Apartamento moderno con balcón", provincia: "San José", canton: "Escazú", precio: 850, unidad: "mes", specs: ["🛏 2 hab", "🛁 2 baños", "📐 85 m²"], foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "propiedades", titulo: "Casa familiar con jardín", provincia: "San José", canton: "Santa Ana", precio: 1300, unidad: "mes", specs: ["🛏 3 hab", "🛁 3 baños", "📐 160 m²"], foto: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "propiedades", titulo: "Cuarto para estudiante en San Pedro", provincia: "San José", canton: "Montes de Oca", precio: 300, unidad: "mes", specs: ["🛏 1 hab", "📶 Internet", "🚌 Cerca UCR"], foto: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "vehiculos", titulo: "Toyota Rush 4x4", provincia: "Guanacaste", canton: "Liberia", precio: 55, unidad: "día", specs: ["👥 5 pasajeros", "⚙️ Automático", "🏔 4x4"], foto: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "maquinaria", titulo: "Generador eléctrico 5kW", provincia: "Cartago", canton: "Cartago", precio: 40, unidad: "día", specs: ["⚡ 5000W", "⛽ Diésel", "🔌 110/220V"], foto: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "eventos", titulo: "Toldo 6x6 para eventos", provincia: "San José", canton: "Desamparados", precio: 80, unidad: "día", specs: ["⛺ 6x6 m", "🌧 Impermeable", "🔨 Montaje"], foto: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", contacto: "https://wa.me/50600000000" },
];

// items = lo que se muestra. Arranca con la semilla y se le suman los de la BD.
let items = [...semilla];

// ============================================================
//  DOM
// ============================================================
const navCategorias = document.getElementById("categorias");
const lista         = document.getElementById("lista");
const contador      = document.getElementById("contador");
const buscador      = document.getElementById("buscador");
const selProvincia  = document.getElementById("f-provincia");
const selOrden      = document.getElementById("f-orden");

let categoriaActiva = "todas";
const money = (n) => "$" + Number(n).toLocaleString("en-US");

// ============================================================
//  Menús: categorías y provincias
// ============================================================
CATEGORIAS.forEach((cat) => {
  const btn = document.createElement("button");
  btn.className = "cat-btn" + (cat.id === "todas" ? " activa" : "");
  btn.textContent = `${cat.icono} ${cat.nombre}`;
  btn.addEventListener("click", () => {
    categoriaActiva = cat.id;
    document.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("activa"));
    btn.classList.add("activa");
    render();
  });
  navCategorias.appendChild(btn);
});
PROVINCIAS.forEach((p) => {
  const o = document.createElement("option");
  o.value = p; o.textContent = p;
  selProvincia.appendChild(o);
});

// ============================================================
//  RENDER
// ============================================================
function render() {
  const texto = buscador.value.toLowerCase().trim();
  const prov  = selProvincia.value;

  let res = items.filter((it) => {
    if (soloMias && it.user_id !== currentUserId) return false;
    if (categoriaActiva !== "todas" && it.categoria !== categoriaActiva) return false;
    if (prov && it.provincia !== prov) return false;
    if (texto && !(`${it.titulo} ${it.canton} ${it.provincia}`.toLowerCase().includes(texto))) return false;
    return true;
  });

  if (selOrden.value === "precio-asc") res.sort((a, b) => a.precio - b.precio);
  if (selOrden.value === "precio-desc") res.sort((a, b) => b.precio - a.precio);

  contador.innerHTML = `<strong>${res.length}</strong> resultado${res.length === 1 ? "" : "s"}`;

  if (res.length === 0) {
    lista.innerHTML = `<p class="vacio">NADA POR AQUÍ.<br>Probá otra categoría o quitá filtros.</p>`;
    return;
  }

  lista.innerHTML = res.map((it) => {
    const link = String(it.contacto || "").startsWith("http")
      ? it.contacto
      : "https://wa.me/" + (it.contacto || "50600000000");
    const specs = (it.specs || []).map((s) => `<span>${s}</span>`).join("");
    const esMia = it.user_id && it.user_id === currentUserId;
    const borrar = esMia ? `<button class="btn-borrar" data-id="${it.id}" type="button">🗑 Borrar</button>` : "";
    return `
      <article class="tarjeta">
        <div class="tarjeta-foto">
          <img src="${it.foto || FOTO_DEFAULT}" alt="${it.titulo}" loading="lazy" />
          <span class="badge">${NOMBRE_CAT[it.categoria] || it.categoria}</span>
        </div>
        <div class="tarjeta-cuerpo">
          <h2>${it.titulo}</h2>
          <p class="ubicacion">📍 ${it.canton || ""}${it.canton ? ", " : ""}${it.provincia || ""}</p>
          <p class="precio">${money(it.precio)}<span> / ${it.unidad}</span></p>
          <div class="especificaciones">${specs}</div>
          <div class="contacto"><a href="${link}" target="_blank" rel="noopener">Contactar</a></div>
          ${borrar}
        </div>
      </article>`;
  }).join("");
}

buscador.addEventListener("input", render);
selProvincia.addEventListener("change", render);
selOrden.addEventListener("change", render);

// ============================================================
//  ESTADO de usuario + "Mis publicaciones" + borrar propias
// ============================================================
let currentUserId = null;
let soloMias = false;
const bannerMias = document.getElementById("banner-mias");

if (supaClient) {
  supaClient.auth.getSession().then(({ data }) => {
    currentUserId = data.session?.user?.id || null;
    render();
  });
  supaClient.auth.onAuthStateChange((_e, s) => {
    currentUserId = s?.user?.id || null;
    if (!currentUserId) { soloMias = false; bannerMias?.classList.remove("visible"); }
    render();
  });
}

// El menú de la cuenta (auth.js) dispara este evento
document.addEventListener("ver-mis-publicaciones", () => {
  if (!currentUserId) return;
  soloMias = true;
  bannerMias?.classList.add("visible");
  render();
});
document.getElementById("ver-todo")?.addEventListener("click", () => {
  soloMias = false;
  bannerMias?.classList.remove("visible");
  render();
});

// Borrar un anuncio propio (RLS solo deja borrar al dueño)
lista.addEventListener("click", async (e) => {
  const b = e.target.closest(".btn-borrar");
  if (!b) return;
  if (!confirm("¿Seguro que querés borrar este anuncio?")) return;
  const { error } = await supaClient.from("anuncios").delete().eq("id", b.dataset.id);
  if (error) { alert("No se pudo borrar: " + error.message); return; }
  await cargarAnuncios();
});

// ============================================================
//  LEER anuncios de la base de datos (Supabase)
//  Se suman a la semilla. Si la tabla no existe todavía o hay
//  error, no rompemos nada: dejamos solo la semilla.
// ============================================================
async function cargarAnuncios() {
  if (!supaClient) { render(); return; }
  const { data, error } = await supaClient
    .from("anuncios")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("No se pudieron cargar anuncios de la BD:", error.message);
    render();
    return;
  }
  const deLaBD = (data || []).map((r) => ({
    id: r.id,
    user_id: r.user_id,
    categoria: r.categoria,
    titulo: r.titulo,
    provincia: r.provincia,
    canton: r.canton,
    precio: r.precio,
    unidad: r.unidad,
    specs: r.descripcion ? [r.descripcion] : [],
    foto: r.foto,
    contacto: r.contacto,
  }));
  items = [...deLaBD, ...semilla]; // los nuevos primero
  render();
}

// ============================================================
//  PUBLICAR anuncio (formulario)
// ============================================================
const btnPublicar = document.getElementById("btn-publicar");
const pubModal    = document.getElementById("pub-modal");
const pubCerrar   = document.getElementById("pub-cerrar");
const pubForm     = document.getElementById("pub-form");
const pubMsg      = document.getElementById("pub-msg");
const pubCategoria= document.getElementById("pub-categoria");
const pubProvincia= document.getElementById("pub-provincia");

// Llenar selects del formulario
CATEGORIAS.filter((c) => c.id !== "todas").forEach((c) => {
  const o = document.createElement("option");
  o.value = c.id; o.textContent = `${c.icono} ${c.nombre}`;
  pubCategoria.appendChild(o);
});
PROVINCIAS.forEach((p) => {
  const o = document.createElement("option");
  o.value = p; o.textContent = p;
  pubProvincia.appendChild(o);
});

function abrirPub() { pubModal.classList.add("abierto"); pubMsg.textContent = ""; }
function cerrarPub() { pubModal.classList.remove("abierto"); }

// Al tocar "Publicar": si no hay sesión, abrimos el login; si hay, el formulario.
btnPublicar.addEventListener("click", async () => {
  if (!supaClient) { alert("⚙️ Falta conectar Supabase (config.js)."); return; }
  const { data } = await supaClient.auth.getSession();
  if (!data.session) {
    alert("Primero iniciá sesión o creá tu cuenta para publicar. 🙂");
    if (typeof setModo === "function") setModo("registro");
    if (typeof abrirModal === "function") abrirModal();
    return;
  }
  abrirPub();
});

pubCerrar.addEventListener("click", cerrarPub);
pubModal.addEventListener("click", (e) => { if (e.target === pubModal) cerrarPub(); });

pubForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  pubMsg.style.color = "var(--tinta)";
  pubMsg.textContent = "Publicando…";

  const { data: ses } = await supaClient.auth.getSession();
  if (!ses.session) { pubMsg.textContent = "Tu sesión expiró, volvé a entrar."; return; }

  const f = e.target;
  const nuevo = {
    user_id: ses.session.user.id,     // RLS exige que sea el usuario actual
    categoria: f.categoria.value,
    titulo: f.titulo.value.trim(),
    provincia: f.provincia.value,
    canton: f.canton.value.trim(),
    precio: Number(f.precio.value),
    unidad: f.unidad.value,
    descripcion: f.descripcion.value.trim(),
    foto: f.foto.value.trim() || null,
    contacto: f.contacto.value.trim(),
  };

  const { error } = await supaClient.from("anuncios").insert(nuevo);
  if (error) {
    pubMsg.style.color = "#c0392b";
    pubMsg.textContent = "⚠️ " + error.message;
    return;
  }
  pubMsg.style.color = "green";
  pubMsg.textContent = "✅ ¡Publicado! Ya aparece en la lista.";
  f.reset();
  await cargarAnuncios();          // recargamos para que se vea el nuevo
  setTimeout(cerrarPub, 1200);
});

// ============================================================
//  ARRANQUE
// ============================================================
cargarAnuncios();
