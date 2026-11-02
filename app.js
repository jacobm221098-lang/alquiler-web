// ============================================================
//  1) DATOS GEOGRÁFICOS DE COSTA RICA (provincia -> cantones)
//  Otra "fuente de verdad": con esto llenamos los menús de
//  provincia y cantón. El cantón depende de la provincia elegida.
// ============================================================
const CR = {
  "San José": ["San José", "Escazú", "Desamparados", "Puriscal", "Aserrí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Coronado", "Tibás", "Moravia", "Montes de Oca", "Curridabat", "Pérez Zeledón", "Dota"],
  "Alajuela": ["Alajuela", "San Ramón", "Grecia", "Atenas", "Naranjo", "Palmares", "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Guatuso", "Río Cuarto"],
  "Cartago": ["Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"],
  "Heredia": ["Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores", "San Pablo", "Sarapiquí"],
  "Guanacaste": ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"],
  "Puntarenas": ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito", "Monteverde", "Puerto Jiménez"],
  "Limón": ["Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"],
};

// ============================================================
//  2) PROPIEDADES EN ALQUILER
//  Cada una lleva provincia y canton para que los filtros funcionen.
// ============================================================
const propiedades = [
  { titulo: "Apartamento moderno con balcón", provincia: "San José", canton: "Escazú", precioMes: 850, habitaciones: 2, banos: 2, metros: 85, foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { titulo: "Casa familiar con jardín", provincia: "San José", canton: "Santa Ana", precioMes: 1300, habitaciones: 3, banos: 3, metros: 160, foto: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { titulo: "Estudio céntrico amueblado", provincia: "San José", canton: "Montes de Oca", precioMes: 600, habitaciones: 1, banos: 1, metros: 45, foto: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { titulo: "Penthouse vista a la ciudad", provincia: "San José", canton: "San José", precioMes: 1800, habitaciones: 3, banos: 2, metros: 140, foto: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { titulo: "Townhouse en condominio", provincia: "Heredia", canton: "Belén", precioMes: 950, habitaciones: 2, banos: 2, metros: 110, foto: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { titulo: "Apartamento playa a 5 min", provincia: "Puntarenas", canton: "Garabito", precioMes: 1100, habitaciones: 2, banos: 2, metros: 95, foto: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { titulo: "Casa de campo en las montañas", provincia: "Cartago", canton: "Oreamuno", precioMes: 750, habitaciones: 3, banos: 2, metros: 130, foto: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { titulo: "Villa frente al mar", provincia: "Guanacaste", canton: "Santa Cruz", precioMes: 2200, habitaciones: 4, banos: 3, metros: 210, foto: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { titulo: "Cabina tropical en Limón", provincia: "Limón", canton: "Talamanca", precioMes: 500, habitaciones: 1, banos: 1, metros: 55, foto: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { titulo: "Apartamento nuevo en Heredia centro", provincia: "Heredia", canton: "Heredia", precioMes: 700, habitaciones: 2, banos: 1, metros: 70, foto: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { titulo: "Casa amplia con cochera doble", provincia: "Alajuela", canton: "Alajuela", precioMes: 1050, habitaciones: 3, banos: 3, metros: 175, foto: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80", contacto: "https://wa.me/50600000000" },
  { titulo: "Loft de lujo en Liberia", provincia: "Guanacaste", canton: "Liberia", precioMes: 1400, habitaciones: 2, banos: 2, metros: 120, foto: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&q=80", contacto: "https://wa.me/50600000000" },
];

// ============================================================
//  3) REFERENCIAS AL DOM
// ============================================================
const contenedor   = document.getElementById("lista-propiedades");
const contador     = document.getElementById("contador");
const selProvincia = document.getElementById("f-provincia");
const selCanton    = document.getElementById("f-canton");
const selHab       = document.getElementById("f-habitaciones");
const rangoPrecio  = document.getElementById("f-precio");
const precioValor  = document.getElementById("f-precio-valor");
const btnLimpiar   = document.getElementById("limpiar");

const money = (n) => "$" + n.toLocaleString("en-US");

// ============================================================
//  4) LLENAR LOS MENÚS DESPLEGABLES desde los datos
//  En vez de escribir 7 provincias a mano en el HTML, las
//  generamos con JS. (Datos -> opciones del menú.)
// ============================================================
function opcion(valor, texto) {
  const o = document.createElement("option");
  o.value = valor;
  o.textContent = texto;
  return o;
}

Object.keys(CR).forEach((prov) => selProvincia.appendChild(opcion(prov, prov)));

// Cuando cambia la provincia, rellenamos los cantones de ESA provincia.
selProvincia.addEventListener("change", () => {
  const prov = selProvincia.value;
  selCanton.innerHTML = ""; // limpiamos lo anterior
  if (!prov) {
    selCanton.appendChild(opcion("", "Elegí una provincia primero"));
    selCanton.disabled = true;
  } else {
    selCanton.appendChild(opcion("", "Todos los cantones"));
    CR[prov].forEach((c) => selCanton.appendChild(opcion(c, c)));
    selCanton.disabled = false;
  }
  aplicarFiltros();
});

// ============================================================
//  5) RENDERIZAR las tarjetas
// ============================================================
function renderizar(lista) {
  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="vacio">No hay propiedades que coincidan con tu búsqueda.<br>Probá ampliar el precio o cambiar de cantón.</p>`;
    return;
  }
  contenedor.innerHTML = lista
    .map(
      (p) => `
      <article class="tarjeta">
        <div class="tarjeta-foto">
          <img src="${p.foto}" alt="Foto de ${p.titulo}" loading="lazy" />
          <span class="badge">${p.provincia}</span>
        </div>
        <div class="tarjeta-cuerpo">
          <h2>${p.titulo}</h2>
          <p class="ubicacion">📍 ${p.canton}, ${p.provincia}</p>
          <p class="precio">${money(p.precioMes)}<span> / mes</span></p>
          <div class="especificaciones">
            <span>🛏 ${p.habitaciones} hab</span>
            <span>🛁 ${p.banos} baños</span>
            <span>📐 ${p.metros} m²</span>
          </div>
          <div class="contacto">
            <a href="${p.contacto}" target="_blank" rel="noopener">Contactar</a>
          </div>
        </div>
      </article>`
    )
    .join("");
}

// ============================================================
//  6) APLICAR FILTROS — el corazón de la herramienta
//  Encadenamos condiciones: una propiedad pasa solo si cumple
//  TODAS (provincia Y cantón Y habitaciones Y precio).
// ============================================================
function aplicarFiltros() {
  const prov  = selProvincia.value;
  const cant  = selCanton.value;
  const hab   = Number(selHab.value);
  const tope  = Number(rangoPrecio.value);

  const resultado = propiedades.filter((p) => {
    if (prov && p.provincia !== prov) return false;
    if (cant && p.canton !== cant) return false;
    if (p.habitaciones < hab) return false;
    if (p.precioMes > tope) return false;
    return true;
  });

  contador.innerHTML = `<strong>${resultado.length}</strong> propiedad${resultado.length === 1 ? "" : "es"} disponible${resultado.length === 1 ? "" : "s"}`;
  renderizar(resultado);
}

// ============================================================
//  7) ESCUCHAR los demás filtros
// ============================================================
selCanton.addEventListener("change", aplicarFiltros);
selHab.addEventListener("change", aplicarFiltros);
rangoPrecio.addEventListener("input", () => {
  precioValor.textContent = money(Number(rangoPrecio.value)); // actualiza el texto en vivo
  aplicarFiltros();
});

btnLimpiar.addEventListener("click", () => {
  selProvincia.value = "";
  selCanton.innerHTML = "";
  selCanton.appendChild(opcion("", "Elegí una provincia primero"));
  selCanton.disabled = true;
  selHab.value = "0";
  rangoPrecio.value = rangoPrecio.max;
  precioValor.textContent = money(Number(rangoPrecio.max));
  aplicarFiltros();
});

// ============================================================
//  8) ARRANQUE
// ============================================================
aplicarFiltros();
