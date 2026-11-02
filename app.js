// ============================================================
//  1) LOS DATOS
//  Esto es un ARRAY (lista) de OBJETOS. Cada objeto es una
//  propiedad con sus campos. Esta es la "fuente de verdad":
//  para agregar/quitar propiedades, SOLO tocás esta lista.
//  El diseño (HTML/CSS) no se toca. Eso es separar datos de
//  presentación: el día de mañana estos datos podrían venir de
//  una base de datos o una API y el resto del código no cambia.
// ============================================================
const propiedades = [
  {
    id: 1,
    titulo: "Apartamento moderno con balcón",
    ubicacion: "Escazú, San José",
    precioMes: 850,
    habitaciones: 2,
    banos: 2,
    metros: 85,
    foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
    contacto: "https://wa.me/50600000000",
  },
  {
    id: 2,
    titulo: "Casa familiar con jardín",
    ubicacion: "Santa Ana, San José",
    precioMes: 1300,
    habitaciones: 3,
    banos: 3,
    metros: 160,
    foto: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    contacto: "https://wa.me/50600000000",
  },
  {
    id: 3,
    titulo: "Estudio céntrico amueblado",
    ubicacion: "Barrio Escalante, San José",
    precioMes: 600,
    habitaciones: 1,
    banos: 1,
    metros: 45,
    foto: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    contacto: "https://wa.me/50600000000",
  },
  {
    id: 4,
    titulo: "Penthouse vista a la ciudad",
    ubicacion: "Rohrmoser, San José",
    precioMes: 1800,
    habitaciones: 3,
    banos: 2,
    metros: 140,
    foto: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    contacto: "https://wa.me/50600000000",
  },
  {
    id: 5,
    titulo: "Townhouse en condominio",
    ubicacion: "Heredia centro",
    precioMes: 950,
    habitaciones: 2,
    banos: 2,
    metros: 110,
    foto: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    contacto: "https://wa.me/50600000000",
  },
  {
    id: 6,
    titulo: "Apartamento playa a 5 min",
    ubicacion: "Jacó, Puntarenas",
    precioMes: 1100,
    habitaciones: 2,
    banos: 2,
    metros: 95,
    foto: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80",
    contacto: "https://wa.me/50600000000",
  },
];

// ============================================================
//  2) REFERENCIAS AL DOM
//  El DOM (Document Object Model) es cómo JavaScript "ve" el
//  HTML: como una estructura de objetos que puede leer y cambiar.
//  Aquí agarramos los elementos que vamos a usar.
// ============================================================
const contenedor = document.getElementById("lista-propiedades");
const buscador = document.getElementById("buscador");

// Formatea un número como precio en dólares: 850 -> "$850"
const formatearPrecio = (n) => "$" + n.toLocaleString("en-US");

// ============================================================
//  3) RENDERIZAR (dibujar) — datos -> HTML
//  Esta función toma una lista de propiedades y genera el HTML
//  de las tarjetas. "Renderizar" = convertir datos en algo que
//  se ve en pantalla.
// ============================================================
function renderizar(lista) {
  // Si no hay resultados, mostramos un mensaje y salimos.
  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="vacio">No encontramos propiedades con ese criterio.</p>`;
    return;
  }

  // .map() recorre cada propiedad y devuelve su HTML como texto.
  // Las plantillas con backticks (``) permiten meter variables con ${...}.
  contenedor.innerHTML = lista
    .map(
      (p) => `
      <article class="tarjeta">
        <img src="${p.foto}" alt="Foto de ${p.titulo}" loading="lazy" />
        <div class="tarjeta-cuerpo">
          <h2>${p.titulo}</h2>
          <p class="ubicacion">📍 ${p.ubicacion}</p>
          <p class="precio">${formatearPrecio(p.precioMes)}<span> / mes</span></p>
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
    .join(""); // unimos todos los pedazos de HTML en un solo texto
}

// ============================================================
//  4) INTERACTIVIDAD — el buscador
//  Escuchamos el evento "input" (cada vez que el usuario teclea)
//  y filtramos la lista. .filter() devuelve solo las propiedades
//  cuyo título o ubicación contienen lo que se escribió.
// ============================================================
buscador.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase().trim();
  const filtradas = propiedades.filter(
    (p) =>
      p.titulo.toLowerCase().includes(texto) ||
      p.ubicacion.toLowerCase().includes(texto)
  );
  renderizar(filtradas);
});

// ============================================================
//  5) ARRANQUE
//  Dibujamos todas las propiedades la primera vez que carga.
// ============================================================
renderizar(propiedades);
