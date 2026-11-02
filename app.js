// ============================================================
//  LOS 4 SHOTS (jengibre / limón, naturales, 60 ml)
//  Sin CBD ni THC. Precios en colones (₡).
//  Fuente de verdad: para cambiar precios/nombres/fotos, tocás
//  solo esta lista.
// ============================================================
const WHATSAPP = "50600000000"; // ← cambiar por tu número real (con 506)

const items = [
  {
    nombre: "Jengibre & Limón",
    desc: "El clásico. Jengibre fresco y limón para arrancar el día con energía.",
    precio: 2000,
    ingredientes: ["🫚 Jengibre", "🍋 Limón"],
    foto: "https://images.unsplash.com/photo-1606168094336-48f205227abd?w=600&q=80",
  },
  {
    nombre: "Jengibre & Cúrcuma",
    desc: "Jengibre, cúrcuma y una pizca de pimienta negra. Antiinflamatorio natural.",
    precio: 2300,
    ingredientes: ["🫚 Jengibre", "🟡 Cúrcuma", "🌶 Pimienta"],
    foto: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80",
  },
  {
    nombre: "Jengibre & Naranja",
    desc: "Jengibre con naranja: dosis de vitamina C para las defensas.",
    precio: 2200,
    ingredientes: ["🫚 Jengibre", "🍊 Naranja"],
    foto: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=80",
  },
  {
    nombre: "Jengibre Extra Fuerte",
    desc: "Para los valientes: doble jengibre, limón y pimienta. Despierta de golpe.",
    precio: 2500,
    ingredientes: ["🫚 Jengibre x2", "🍋 Limón", "🌶 Pimienta"],
    foto: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
  },
];

// ============================================================
//  RENDER — dibuja los 4 shots
// ============================================================
const lista = document.getElementById("lista");
const money = (n) => "₡" + n.toLocaleString("es-CR");

lista.innerHTML = items
  .map((it) => {
    const msg = encodeURIComponent(`¡Hola RunShot CR! 🏃 Quiero pedir el shot "${it.nombre}" (${money(it.precio)}).`);
    return `
    <article class="tarjeta">
      <div class="tarjeta-foto">
        <img src="${it.foto}" alt="${it.nombre}" loading="lazy" />
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
