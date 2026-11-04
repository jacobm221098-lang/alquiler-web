// ============================================================
//  AUTENTICACIÓN + PERFILES (vendedor / comprador) con Supabase
// ============================================================
const supa = supaClient;

// DOM
const authZona   = document.getElementById("auth-zona");
const modal      = document.getElementById("auth-modal");
const modalCerrar= document.getElementById("auth-cerrar");
const form       = document.getElementById("auth-form");
const inEmail    = document.getElementById("auth-email");
const inPass     = document.getElementById("auth-pass");
const lblEmail   = document.querySelector('label[for="auth-email"]');
const lblPass    = document.querySelector('label[for="auth-pass"]');
const msg        = document.getElementById("auth-msg");
const titulo     = document.getElementById("auth-titulo");
const submitBtn  = document.getElementById("auth-submit");
const toggle     = document.getElementById("auth-toggle");
const reset      = document.getElementById("auth-reset");
const rolSelector= document.getElementById("rol-selector");

let modo = "registro";           // "registro" | "login" | "recuperar"
let sesionActual = null;
let rolActual = null;            // "vendedor" | "comprador" | null

const rolBonito = (r) => r === "vendedor" ? "Vendedor" : r === "comprador" ? "Comprador" : "Sin rol";

// ---------- Modal ----------
function abrirModal() {
  if (!SUPABASE_LISTO) { alert("⚙️ Falta conectar Supabase (config.js)."); return; }
  modal.classList.add("abierto");
  msg.textContent = "";
}
function cerrarModal() { modal.classList.remove("abierto"); }

function setModo(nuevo) {
  modo = nuevo;
  msg.textContent = "";
  const esRecuperar = modo === "recuperar";
  lblEmail.style.display = esRecuperar ? "none" : "";
  inEmail.style.display  = esRecuperar ? "none" : "";
  inEmail.required = !esRecuperar;
  reset.style.display = modo === "login" ? "" : "none";
  if (rolSelector) rolSelector.style.display = modo === "registro" ? "" : "none";

  if (modo === "registro") {
    titulo.textContent = "Crear cuenta";
    submitBtn.textContent = "Registrarme";
    toggle.style.display = ""; toggle.innerHTML = "¿Ya tenés cuenta? <b>Iniciá sesión</b>";
  } else if (modo === "login") {
    titulo.textContent = "Iniciar sesión";
    submitBtn.textContent = "Entrar";
    toggle.style.display = ""; toggle.innerHTML = "¿Sos nuevo? <b>Creá tu cuenta</b>";
  } else {
    titulo.textContent = "Nueva contraseña";
    submitBtn.textContent = "Guardar contraseña";
    lblPass.textContent = "Contraseña nueva";
    toggle.style.display = "none";
  }
}

function rolElegido() {
  const r = document.querySelector('input[name="rol"]:checked');
  return r ? r.value : "comprador";
}

// ---------- Enviar formulario ----------
async function enviar(e) {
  e.preventDefault();
  const email = inEmail.value.trim();
  const pass  = inPass.value;
  msg.style.color = "var(--tinta)";
  msg.textContent = "Procesando…";

  try {
    if (modo === "registro") {
      const rol = rolElegido();
      const { data, error } = await supa.auth.signUp({ email, password: pass });
      if (error) throw error;
      // Guardamos el rol en la tabla "perfiles"
      if (data.user) {
        await supa.from("perfiles").upsert({ user_id: data.user.id, rol });
      }
      if (data.session) {
        msg.style.color = "green";
        msg.textContent = "✅ ¡Cuenta creada!";
        setTimeout(cerrarModal, 900);
      } else {
        msg.style.color = "green";
        msg.textContent = "✅ Revisá tu correo para confirmar la cuenta.";
      }
    } else if (modo === "login") {
      const { error } = await supa.auth.signInWithPassword({ email, password: pass });
      if (error) throw error;
      cerrarModal();
    } else {
      const { error } = await supa.auth.updateUser({ password: pass });
      if (error) throw error;
      msg.style.color = "green";
      msg.textContent = "✅ ¡Contraseña actualizada!";
      setTimeout(cerrarModal, 1000);
    }
  } catch (err) {
    msg.style.color = "#c0392b";
    msg.textContent = "⚠️ " + err.message;
  }
}

async function enviarReset() {
  const email = inEmail.value.trim();
  if (!email) { msg.style.color = "#c0392b"; msg.textContent = "Escribí tu correo arriba y tocá de nuevo."; return; }
  msg.style.color = "var(--tinta)"; msg.textContent = "Enviando correo…";
  const { error } = await supa.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + window.location.pathname });
  if (error) { msg.style.color = "#c0392b"; msg.textContent = "⚠️ " + error.message; return; }
  msg.style.color = "green";
  msg.textContent = "📧 Te enviamos un correo para restablecer. Revisá spam.";
}

// ---------- Leer el rol del usuario ----------
async function cargarRol() {
  rolActual = null;
  if (sesionActual?.user && supa) {
    const { data } = await supa.from("perfiles").select("rol").eq("user_id", sesionActual.user.id).maybeSingle();
    rolActual = data?.rol || null;
  }
  pintarAuth(sesionActual);
  // Avisamos a app.js para que adapte la UI (ej. botón Publicar)
  document.dispatchEvent(new CustomEvent("rol-cambiado", {
    detail: { rol: rolActual, logueado: !!sesionActual?.user },
  }));
}

// ---------- Pintar zona de cuenta ----------
function pintarAuth(sesion) {
  if (sesion && sesion.user) {
    const email = sesion.user.email;
    const rolTxt = rolBonito(rolActual);
    const itemMisPubs = rolActual !== "comprador"
      ? `<button class="user-menu-item" id="mi-pubs" type="button">📋 Mis publicaciones</button>` : "";
    authZona.innerHTML = `
      <div class="user-wrap">
        <button id="avatar-btn" class="avatar-btn" type="button" title="${email} · ${rolTxt}" aria-label="Tu cuenta">👤</button>
        <div id="user-menu" class="user-menu">
          <div class="user-menu-email">${email}<br><small>${rolTxt}</small></div>
          ${itemMisPubs}
          <button class="user-menu-item" id="mi-cuenta" type="button">⚙️ Cambiar rol</button>
          <button class="user-menu-item" id="btn-salir" type="button">🚪 Cerrar sesión</button>
        </div>
      </div>`;

    const avatar = document.getElementById("avatar-btn");
    const menu   = document.getElementById("user-menu");
    avatar.addEventListener("click", (e) => { e.stopPropagation(); menu.classList.toggle("abierto"); });
    document.addEventListener("click", () => menu.classList.remove("abierto"));
    menu.addEventListener("click", (e) => e.stopPropagation());

    const miPubs = document.getElementById("mi-pubs");
    if (miPubs) miPubs.addEventListener("click", () => {
      menu.classList.remove("abierto");
      document.dispatchEvent(new CustomEvent("ver-mis-publicaciones"));
    });

    document.getElementById("mi-cuenta").addEventListener("click", async () => {
      menu.classList.remove("abierto");
      const nuevo = rolActual === "vendedor" ? "comprador" : "vendedor";
      if (confirm(`Tu rol es "${rolTxt}". ¿Cambiarlo a "${rolBonito(nuevo)}"?`)) {
        const { error } = await supa.from("perfiles").upsert({ user_id: sesion.user.id, rol: nuevo });
        if (error) { alert("No se pudo cambiar el rol: " + error.message); return; }
        cargarRol();
      }
    });

    document.getElementById("btn-salir").addEventListener("click", async () => {
      menu.classList.remove("abierto");
      await supa.auth.signOut();
    });
  } else {
    authZona.innerHTML = `<button id="btn-cuenta" class="btn-cuenta" type="button">Ingresar / Registrarme</button>`;
    document.getElementById("btn-cuenta").addEventListener("click", () => { setModo("registro"); abrirModal(); });
  }
}

// ---------- Arranque ----------
if (SUPABASE_LISTO) {
  setModo("registro");
  form.addEventListener("submit", enviar);
  modalCerrar.addEventListener("click", cerrarModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });
  toggle.addEventListener("click", () => setModo(modo === "registro" ? "login" : "registro"));
  reset.addEventListener("click", enviarReset);

  supa.auth.getSession().then(({ data }) => { sesionActual = data.session; cargarRol(); });
  supa.auth.onAuthStateChange((evento, sesion) => {
    if (evento === "PASSWORD_RECOVERY") { setModo("recuperar"); abrirModal(); }
    sesionActual = sesion;
    cargarRol();
  });
} else {
  pintarAuth(null);
}
