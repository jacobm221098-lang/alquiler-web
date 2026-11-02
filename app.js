// ============================================================
//  CATEGORÍAS por momento del corredor
// ============================================================
const CATEGORIAS = [
  { id: "todos",        nombre: "Todos",         icono: "🥤" },
  { id: "pre-run",      nombre: "Pre-Run",       icono: "⚡" },
  { id: "recuperacion", nombre: "Recuperación",  icono: "🔥" },
  { id: "defensas",     nombre: "Defensas",      icono: "🛡️" },
  { id: "electrolitos", nombre: "Anti-calambres",icono: "🧂" },
];

// Etiquetas lindas para mostrar la categoría en la tarjeta
const NOMBRE_CAT = {
  "pre-run": "Pre-Run", "recuperacion": "Recuperación",
  "defensas": "Defensas", "electrolitos": "Anti-calambres",
};

// Tu número de WhatsApp (cámbialo por el real, con código país 506)
const WHATSAPP = "50600000000";

// ============================================================
//  PRODUCTOS (shots de 60 ml). Precios en colones (₡).
//  Fuente de verdad: para agregar/quitar shots, tocás solo esto.
// ============================================================
const items = [
  { categoria: "pre-run", nombre: "Boost Salida", desc: "Cafeína natural + guaraná para arrancar con todo.", precio: 2500, ingredientes: ["☕ Cafeína", "🌿 Guaraná", "🍋 Limón"], foto: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80" },
  { categoria: "pre-run", nombre: "Remolacha Power", desc: "Remolacha para resistencia y oxígeno en las piernas.", precio: 2800, ingredientes: ["🫐 Remolacha", "🍎 Manzana", "🫚 Jengibre"], foto: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80" },
  { categoria: "pre-run", nombre: "Matcha Run", desc: "Energía estable sin bajón, con matcha verde.", precio: 3000, ingredientes: ["🍵 Matcha", "🍏 Manzana verde", "🍯 Miel"], foto: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80" },

  { categoria: "recuperacion", nombre: "Recovery Cúrcuma", desc: "Cúrcuma + pimienta negra, antiinflamatorio post-carrera.", precio: 2700, ingredientes: ["🟡 Cúrcuma", "🌶 Pimienta negra", "🍊 Naranja"], foto: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80" },
  { categoria: "recuperacion", nombre: "Cherry Repair", desc: "Cereza ácida, clásica para recuperación muscular.", precio: 3200, ingredientes: ["🍒 Cereza ácida", "🫐 Arándano"], foto: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=600&q=80" },
  { categoria: "recuperacion", nombre: "Proti-Shot", desc: "Proteína ligera para después del entreno.", precio: 3500, ingredientes: ["🥛 Proteína", "🍌 Banano", "🍯 Miel"], foto: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&q=80" },

  { categoria: "defensas", nombre: "Jengibre Escudo", desc: "Jengibre + limón para las defensas del día a día.", precio: 2200, ingredientes: ["🫚 Jengibre", "🍋 Limón", "🌶 Pimienta"], foto: "https://images.unsplash.com/photo-1606168094336-48f205227abd?w=600&q=80" },
  { categoria: "defensas", nombre: "Citrus C", desc: "Golpe de vitamina C con naranja y acerola.", precio: 2400, ingredientes: ["🍊 Naranja", "🍒 Acerola", "🥕 Zanahoria"], foto: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=80" },
  { categoria: "defensas", nombre: "Verde Vital", desc: "Clorofila y apio para limpiar y sostener energía.", precio: 2600, ingredientes: ["🥬 Apio", "🥒 Pepino", "🍏 Manzana"], foto: "https://images.unsplash.com/photo-1610970881699-44a5587cab4a?w=600&q=80" },

  { categoria: "electrolitos", nombre: "Sal & Agua", desc: "Electrolitos clave para evitar calambres en el calor tico.", precio: 2300, ingredientes: ["🧂 Sodio", "🍌 Potasio", "⚡ Magnesio"], foto: "https://images.unsplash.com/photo-1559839914-17aae19cec71?w=600&q=80" },
  { categoria: "electrolitos", nombre: "Coco Hidrata", desc: "Agua de coco natural, hidratación y potasio.", precio: 2500, ingredientes: ["🥥 Agua de coco", "🍋 Limón", "🧂 Sal marina"], foto: "https://images.unsplash.com/photo-1536759808958-2cb1a02def0e?w=600&q=80" },
  { categoria: "electrolitos", nombre: "Trópico Salino", desc: "Piña y maracuyá con electrolitos para distancias largas.", precio: 2700, ingredientes: ["🍍 Piña", "🌺 Maracuyá", "⚡ Electrolitos"], foto: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80" },
];

// ============================================================
//  DOM
// ============================================================
const navCategorias = document.getElementById("categorias");
const lista         = document.getElementById("lista");
const contador      = document.getElementById("contador");
const buscador      = document.getElementById("buscador");
const selOrden      = document.getElementById("f-orden");

let categoriaActiva = "todos";

// Precio en colones: 2500 -> "₡2.500"
const money = (n) => "₡" + n.toLocaleString("es-CR");

// Botones de categoría
CATEGORIAS.forEach((cat) => {
  const btn = document.createElement("button");
  btn.className = "cat-btn" + (cat.id === "todos" ? " activa" : "");
  btn.textContent = `${cat.icono} ${cat.nombre}`;
  btn.addEventListener("click", () => {
    categoriaActiva = cat.id;
    document.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("activa"));
    btn.classList.add("activa");
    render();
  });
  navCategorias.appendChild(btn);
});

// ============================================================
//  RENDER
// ============================================================
function render() {
  const texto = buscador.value.toLowerCase().trim();

  let res = items.filter((it) => {
    if (categoriaActiva !== "todos" && it.categoria !== categoriaActiva) return false;
    if (texto && !(`${it.nombre} ${it.desc}`.toLowerCase().includes(texto))) return false;
    return true;
  });

  if (selOrden.value === "precio-asc") res.sort((a, b) => a.precio - b.precio);
  if (selOrden.value === "precio-desc") res.sort((a, b) => b.precio - a.precio);

  contador.textContent = `${res.length} shot${res.length === 1 ? "" : "s"} disponible${res.length === 1 ? "" : "s"}`;

  if (res.length === 0) {
    lista.innerHTML = `<p class="vacio">No encontramos shots con ese criterio. Probá otra categoría.</p>`;
    return;
  }

  lista.innerHTML = res
    .map((it) => {
      // Mensaje de WhatsApp pre-escrito para el pedido
      const msg = encodeURIComponent(`¡Hola RunShot CR! 🏃 Quiero pedir el shot "${it.nombre}" (${money(it.precio)}).`);
      return `
      <article class="tarjeta">
        <div class="tarjeta-foto">
          <img src="${it.foto}" alt="${it.nombre}" loading="lazy" />
          <span class="badge">${NOMBRE_CAT[it.categoria]}</span>
          <span class="tamano">60 ml</span>
        </div>
        <div class="tarjeta-cuerpo">
          <h2>${it.nombre}</h2>
          <p class="desc">${it.desc}</p>
          <div class="ingredientes">${it.ingredientes.map((i) => `<span>${i}</span>`).join("")}</div>
          <p class="precio">${money(it.precio)}</p>
          <div class="contacto">
            <a href="https://wa.me/${WHATSAPP}?text=${msg}" target="_blank" rel="noopener">🟢 Pedir por WhatsApp</a>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

buscador.addEventListener("input", render);
selOrden.addEventListener("change", render);

render();
