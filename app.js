// ============================================================
//  CATEGORÍAS (investigadas para Costa Rica)
//  "todas" es un filtro especial que muestra todo.
// ============================================================
const CATEGORIAS = [
  { id: "todas",       nombre: "Todo",          icono: "🏷️" },
  { id: "propiedades", nombre: "Propiedades",   icono: "🏠" },
  { id: "vehiculos",   nombre: "Vehículos",     icono: "🚗" },
  { id: "maquinaria",  nombre: "Maquinaria",    icono: "🏗️" },
  { id: "eventos",     nombre: "Eventos",       icono: "🎉" },
  { id: "herramientas",nombre: "Herramientas",  icono: "🔧" },
];

// ============================================================
//  ÍTEMS EN ALQUILER
//  Un solo array para TODAS las categorías. Cada ítem dice su
//  categoria, su precio con su unidad (/mes, /día) y una lista
//  de "specs" (datos importantes) que varían según el tipo.
// ============================================================
const items = [
  // --- Propiedades (precio por mes) ---
  { categoria: "propiedades", titulo: "Apartamento moderno con balcón", provincia: "San José", canton: "Escazú", precio: 850, unidad: "mes", specs: ["🛏 2 hab", "🛁 2 baños", "📐 85 m²"], foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "propiedades", titulo: "Casa familiar con jardín", provincia: "San José", canton: "Santa Ana", precio: 1300, unidad: "mes", specs: ["🛏 3 hab", "🛁 3 baños", "📐 160 m²"], foto: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "propiedades", titulo: "Local comercial en avenida central", provincia: "San José", canton: "San José", precio: 1600, unidad: "mes", specs: ["📐 120 m²", "🚻 2 baños", "🅿️ Parqueo"], foto: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "propiedades", titulo: "Bodega industrial en El Coyol", provincia: "Alajuela", canton: "Alajuela", precio: 2100, unidad: "mes", specs: ["📐 400 m²", "🚛 Carga pesada", "🏭 Uso industrial"], foto: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", contacto: "https://wa.me/50600000000" },

  // --- Vehículos (precio por día) ---
  { categoria: "vehiculos", titulo: "Toyota Rush 4x4", provincia: "Guanacaste", canton: "Liberia", precio: 55, unidad: "día", specs: ["👥 5 pasajeros", "⚙️ Automático", "🏔 4x4"], foto: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "vehiculos", titulo: "Microbús Hyundai H1", provincia: "San José", canton: "San José", precio: 90, unidad: "día", specs: ["👥 12 pasajeros", "⚙️ Manual", "🧳 Equipaje amplio"], foto: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "vehiculos", titulo: "Moto Honda XR 150", provincia: "Puntarenas", canton: "Garabito", precio: 25, unidad: "día", specs: ["🏍 150cc", "⛽ Bajo consumo", "🪖 Incluye casco"], foto: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80", contacto: "https://wa.me/50600000000" },

  // --- Maquinaria y construcción (precio por día) ---
  { categoria: "maquinaria", titulo: "Generador eléctrico 5kW", provincia: "Cartago", canton: "Cartago", precio: 40, unidad: "día", specs: ["⚡ 5000W", "⛽ Diésel", "🔌 110/220V"], foto: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "maquinaria", titulo: "Compactadora de suelo (brinca)", provincia: "Alajuela", canton: "San Carlos", precio: 35, unidad: "día", specs: ["🪨 Compactación", "⛽ Gasolina", "🏗 Obra"], foto: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "maquinaria", titulo: "Montacargas 2.5 ton", provincia: "Heredia", canton: "Heredia", precio: 120, unidad: "día", specs: ["🏋️ 2.5 toneladas", "🔧 Operador aparte", "📦 Bodega"], foto: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80", contacto: "https://wa.me/50600000000" },

  // --- Eventos (precio por día) ---
  { categoria: "eventos", titulo: "Toldo 6x6 para eventos", provincia: "San José", canton: "Desamparados", precio: 80, unidad: "día", specs: ["⛺ 6x6 m", "🌧 Impermeable", "🔨 Montaje incluido"], foto: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "eventos", titulo: "Equipo de sonido profesional", provincia: "San José", canton: "Curridabat", precio: 110, unidad: "día", specs: ["🔊 2 bafles", "🎤 2 micrófonos", "🎚 Consola"], foto: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "eventos", titulo: "Sillas y mesas (paquete 50)", provincia: "Heredia", canton: "Belén", precio: 60, unidad: "día", specs: ["🪑 50 sillas", "🍽 10 mesas", "🚚 Entrega"], foto: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80", contacto: "https://wa.me/50600000000" },

  // --- Herramientas (precio por día) ---
  { categoria: "herramientas", titulo: "Andamio tubular (módulo)", provincia: "Cartago", canton: "La Unión", precio: 15, unidad: "día", specs: ["🧱 2m altura", "🔩 Apilable", "🏗 Construcción"], foto: "https://images.unsplash.com/photo-1590241899751-5a0f8f7a2d8f?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { categoria: "herramientas", titulo: "Taladro rotomartillo industrial", provincia: "Alajuela", canton: "Alajuela", precio: 12, unidad: "día", specs: ["🔩 SDS-Plus", "⚡ 800W", "🧰 Maletín"], foto: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80", contacto: "https://wa.me/50600000000" },
];

// Provincias de CR (para el filtro)
const PROVINCIAS = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];

// ============================================================
//  REFERENCIAS AL DOM
// ============================================================
const navCategorias = document.getElementById("categorias");
const lista         = document.getElementById("lista");
const contador      = document.getElementById("contador");
const buscador      = document.getElementById("buscador");
const selProvincia  = document.getElementById("f-provincia");
const selOrden      = document.getElementById("f-orden");

let categoriaActiva = "todas"; // estado: qué categoría está seleccionada

const money = (n) => "$" + n.toLocaleString("en-US");

// ============================================================
//  CONSTRUIR botones de categoría y opciones de provincia
// ============================================================
CATEGORIAS.forEach((cat) => {
  const btn = document.createElement("button");
  btn.className = "cat-btn" + (cat.id === "todas" ? " activa" : "");
  btn.textContent = `${cat.icono} ${cat.nombre}`;
  btn.dataset.cat = cat.id;
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
//  RENDER — aplica categoría + filtros + orden, y dibuja
// ============================================================
function render() {
  const texto = buscador.value.toLowerCase().trim();
  const prov  = selProvincia.value;

  let resultado = items.filter((it) => {
    if (categoriaActiva !== "todas" && it.categoria !== categoriaActiva) return false;
    if (prov && it.provincia !== prov) return false;
    if (texto && !(`${it.titulo} ${it.canton} ${it.provincia}`.toLowerCase().includes(texto))) return false;
    return true;
  });

  // Ordenamiento
  if (selOrden.value === "precio-asc") resultado.sort((a, b) => a.precio - b.precio);
  if (selOrden.value === "precio-desc") resultado.sort((a, b) => b.precio - a.precio);

  contador.textContent = `${resultado.length} resultado${resultado.length === 1 ? "" : "s"}`;

  if (resultado.length === 0) {
    lista.innerHTML = `<p class="vacio">NADA POR AQUÍ.<br>Probá otra categoría o quitá filtros.</p>`;
    return;
  }

  lista.innerHTML = resultado
    .map(
      (it) => `
      <article class="tarjeta">
        <div class="tarjeta-foto">
          <img src="${it.foto}" alt="${it.titulo}" loading="lazy" />
          <span class="badge">${it.categoria}</span>
        </div>
        <div class="tarjeta-cuerpo">
          <h2>${it.titulo}</h2>
          <p class="ubicacion">📍 ${it.canton}, ${it.provincia}</p>
          <p class="precio">${money(it.precio)}<span> / ${it.unidad}</span></p>
          <div class="especificaciones">
            ${it.specs.map((s) => `<span>${s}</span>`).join("")}
          </div>
          <div class="contacto">
            <a href="${it.contacto}" target="_blank" rel="noopener">Contactar</a>
          </div>
        </div>
      </article>`
    )
    .join("");
}

// ============================================================
//  EVENTOS de filtros
// ============================================================
buscador.addEventListener("input", render);
selProvincia.addEventListener("change", render);
selOrden.addEventListener("change", render);

// ARRANQUE
render();
