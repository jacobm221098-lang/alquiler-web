# Estrategia AlquilaCR — De cero a un marketplace rentable

> Documento vivo. Fecha: 2026-11-03. Autor: Jacob (con Claude).
> Objetivo: convertir AlquilaCR en un marketplace de alquileres de Costa Rica
> que crezca de forma orgánica (SEO) y se vuelva rentable con el tiempo.

---

## 0) La realidad primero (para no engañarnos)

AlquilaCR es un **marketplace** (junta dos lados: quien ofrece y quien busca). Los
marketplaces tienen el famoso **"problema del huevo y la gallina"**:

- Sin **anuncios**, nadie viene a buscar.
- Sin **visitantes**, nadie quiere publicar.

La clave para arrancar: **nosotros "sembramos" el primer lado** (la oferta) a mano,
para que cuando llegue el primer visitante ya haya algo que ver. Esto se llama
*estrategia de arranque en frío* (cold start). Netflix, Airbnb y hasta Encuentra24
empezaron cargando contenido ellos mismos.

**Competencia actual en CR:** Encuentra24, grupos de Facebook de alquileres,
Marketplace de Facebook, OLX. ¿Por qué ganaríamos? No por tener "todo", sino por
ser **más enfocados, más rápidos y más limpios** en un nicho concreto al inicio.

**Nicho recomendado para empezar (no abrir todo de una):**
Alquiler de **vivienda en la GAM** (Gran Área Metropolitana: San José, Heredia,
Cartago, Alajuela centrales), apuntando a **estudiantes y jóvenes profesionales**.
Es un público que busca mucho en internet y por zonas específicas. Las otras
categorías (vehículos, maquinaria, eventos) quedan para después.

---

## 1) SEO orgánico — que Google nos encuentre gratis

SEO = *Search Engine Optimization*: lograr que Google muestre tu sitio cuando
alguien busca, **sin pagar anuncios**. Se divide en tres patas:

### a) SEO técnico (la base — ya tenemos ventaja)
- ✅ Sitio **rápido** (HTML estático en CDN de GitHub) — Google premia la velocidad.
- ✅ **Responsive** (se ve bien en celular) — Google indexa "mobile-first".
- ✅ **HTTPS** (candadito) — requisito.
- ⬜ **Sitemap.xml** — un mapa de tus páginas para que Google las encuentre.
- ⬜ **robots.txt** — permisos de rastreo.
- ⬜ **Meta tags** por página (title + description) y **Open Graph** (para que se vea
  lindo al compartir en WhatsApp/Facebook).
- ⬜ **Datos estructurados** (schema.org), por ejemplo tipo `Residence`/`Offer`, para
  que Google entienda que son alquileres y los muestre mejor.

### b) SEO de contenido (lo que hace la diferencia)
La gente no busca "AlquilaCR", busca **frases long-tail** (específicas):
> "alquiler apartamento Escazú barato", "casa en renta Santa Ana 2 cuartos",
> "cuartos para estudiantes San Pedro".

Estrategia: **una página por zona** (San José → Escazú, Santa Ana, San Pedro…),
cada una optimizada para esas frases. Más adelante, un **blog** con artículos útiles
("Guía para alquilar en San Pedro", "Cuánto cuesta alquilar en Heredia 2026") que
atraen tráfico y generan confianza.

### c) SEO local (Google Business Profile)
Crear un **perfil de Google Business** (gratis) para que AlquilaCR aparezca en Maps
y en búsquedas locales. Usa tu cuenta de Google actual.

### Herramientas de Google (gratis, con tu Gmail)
1. **Google Search Console** → verificás el sitio, mandás el sitemap, ves qué
   búsquedas te traen gente y corregís errores de indexación.
2. **Google Analytics (GA4)** → ves cuánta gente entra, de dónde y qué miran.
3. **Google Business Profile** → presencia en Maps.

---

## 2) Conseguir las primeras viviendas (la OFERTA)

Meta inicial realista: **30–50 anuncios reales** en la GAM antes de promocionar.

1. **Carga manual "sembrada":** publicá vos anuncios reales (con permiso de los
   dueños) sacados de grupos de Facebook, conocidos, inmobiliarias chicas.
2. **Gratis para los pioneros:** "Publicá gratis los primeros 3 meses". Sin fricción.
3. **Alianzas:** corredores independientes y cuarterías de estudiantes que hoy
   publican en Facebook con desorden — ofrecéles orden y más alcance.
4. **Formulario de publicación** (lo construimos): que el dueño cree cuenta y suba su
   anuncio solo. Esto escala la oferta sin que vos cargués todo.

---

## 3) Conseguir visitantes (la DEMANDA)

- **Grupos de Facebook** de alquileres CR y por zona (compartir anuncios con el link).
- **Universidades:** UCR (San Pedro), TEC (Cartago), UNA (Heredia) — los estudiantes
  buscan cuartos cada semestre. Volantes, grupos de carrera, ferias.
- **Reddit** r/costarica, foros locales.
- **Boca a boca / WhatsApp:** botón de "compartir" en cada anuncio.
- **SEO** (lo de arriba): el tráfico que llega solo y crece con el tiempo.

> Regla: enfocá el marketing en **1 zona y 1 público** primero. Es mejor ser #1 en
> "alquileres para estudiantes en San Pedro" que invisible en "alquileres en CR".

---

## 4) Cómo hacerla rentable (monetización por fases)

No se cobra desde el día 1. Primero valor y tráfico; la plata viene después.

| Fase | Cuándo | Cómo se gana |
|------|--------|--------------|
| **1. Gratis** | 0–6 meses | Nada. Crecer oferta y demanda. |
| **2. Destacados** | Hay tráfico | Cobrar por **destacar** un anuncio (aparece arriba / con sello). Pago único pequeño. |
| **3. Planes para agentes** | Hay inmobiliarias | **Suscripción** mensual a corredores (más anuncios, estadísticas, insignia verificada). |
| **4. Extras** | Escala | Publicidad (Google AdSense), **leads** a inmobiliarias, verificación premium de inquilinos/dueños. |

**Modelo recomendado:** *freemium* — publicar es gratis siempre (para tener volumen),
y se cobra por **visibilidad** (destacados) y **herramientas pro** (agentes). Es el
modelo de Encuentra24 y de casi todos los clasificados.

---

## 5) Métricas que importan (KPIs)

- **Anuncios activos** (oferta) y **anuncios nuevos/semana**.
- **Visitantes únicos** y **de dónde vienen** (Analytics).
- **Contactos generados** (clics en "Contactar"/WhatsApp) — el valor real.
- **Retención:** ¿vuelve la gente?
- Más adelante: conversión a destacados, ingresos.

---

## 6) Roadmap técnico (lo que falta construir)

Priorizado:

1. **Formulario para publicar** (requiere login → guarda en base de datos Supabase).  ← próximo
2. **Anuncios desde la base de datos** (no desde el array fijo del código).
3. **Subida de fotos** (Supabase Storage).
4. **Contador de vistas** por anuncio.
5. **Buscador/filtración server-side** cuando haya muchos anuncios.
6. **Panel del usuario** (mis anuncios, editar/borrar).
7. **SEO técnico:** sitemap, meta tags dinámicos, datos estructurados.
8. **Destacados** (monetización) + pasarela de pago.

---

## 7) Legal y confianza (no opcional)

- **Datos personales:** CR tiene la **Ley 8968** de protección de datos. Pedir solo lo
  necesario, tener aviso de privacidad y resguardar bien la info.
- **Términos de uso:** dejar claro que AlquilaCR es una **vitrina**; no es parte del
  contrato de alquiler ni responsable de los tratos entre partes.
- **Moderación:** evitar estafas (anuncios falsos). Verificación básica y reportes.
- **Nada de pedir cédulas crudas** sin un sistema serio de resguardo.

---

## 8) Próximos 3 pasos concretos

1. **Setup de Google:** verificar el sitio en **Search Console** (con tu Gmail) y
   conectar **Analytics**. → te guío.
2. **Construir el formulario de publicar** (login + guardar en Supabase). → siguiente build.
3. **Sembrar 10 anuncios reales** de una zona (ej. San Pedro) para arrancar.
