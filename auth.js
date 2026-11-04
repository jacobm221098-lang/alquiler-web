// ============================================================
//  AUTENTICACIÓN (cuentas de usuario) con Supabase
//  Registro, inicio de sesión, cerrar sesión, y RESETEO de
//  contraseña (enviar correo + poner contraseña nueva).
// ============================================================

// 1) Cliente COMPARTIDO definido en config.js.
const supa = supaClient;

// 2) Referencias al DOM
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

let modo = "registro"; // "registro" | "login" | "recuperar"

// 3) Abrir / cerrar el modal
function abrirModal() {
  if (!SUPABASE_LISTO) {
    alert("⚙️ Falta conectar Supabase.\nPegá tu URL y anon key en config.js para activar las cuentas.");
    return;
  }
  modal.classList.add("abierto");
  msg.textContent = "";
}
function cerrarModal() { modal.classList.remove("abierto"); }

// 4) Cambiar de modo (registro / login / recuperar)
function setModo(nuevo) {
  modo = nuevo;
  msg.textContent = "";

  // En "recuperar" solo pedimos la contraseña NUEVA (no el correo).
  const esRecuperar = modo === "recuperar";
  lblEmail.style.display = esRecuperar ? "none" : "";
  inEmail.style.display  = esRecuperar ? "none" : "";
  inEmail.required = !esRecuperar;
  reset.style.display = modo === "login" ? "" : "none";

  if (modo === "registro") {
    titulo.textContent = "Crear cuenta";
    submitBtn.textContent = "Registrarme";
    toggle.style.display = "";
    toggle.innerHTML = "¿Ya tenés cuenta? <b>Iniciá sesión</b>";
  } else if (modo === "login") {
    titulo.textContent = "Iniciar sesión";
    submitBtn.textContent = "Entrar";
    toggle.style.display = "";
    toggle.innerHTML = "¿Sos nuevo? <b>Creá tu cuenta</b>";
  } else { // recuperar
    titulo.textContent = "Nueva contraseña";
    submitBtn.textContent = "Guardar contraseña";
    lblPass.textContent = "Contraseña nueva";
    toggle.style.display = "none";
  }
}

// 5) Enviar el formulario según el modo
async function enviar(e) {
  e.preventDefault();
  const email = inEmail.value.trim();
  const pass  = inPass.value;
  msg.style.color = "var(--tinta)";
  msg.textContent = "Procesando…";

  try {
    if (modo === "registro") {
      const { error } = await supa.auth.signUp({ email, password: pass });
      if (error) throw error;
      msg.style.color = "green";
      msg.textContent = "✅ ¡Listo! Revisá tu correo para confirmar la cuenta.";
    } else if (modo === "login") {
      const { error } = await supa.auth.signInWithPassword({ email, password: pass });
      if (error) throw error;
      cerrarModal();
    } else { // recuperar: ya venimos con sesión de recuperación
      const { error } = await supa.auth.updateUser({ password: pass });
      if (error) throw error;
      msg.style.color = "green";
      msg.textContent = "✅ ¡Contraseña actualizada! Ya estás dentro.";
      setTimeout(cerrarModal, 1200);
    }
  } catch (err) {
    msg.style.color = "#c0392b";
    msg.textContent = "⚠️ " + err.message;
  }
}

// 6) Mandar correo para restablecer la contraseña
async function enviarReset() {
  const email = inEmail.value.trim();
  if (!email) {
    msg.style.color = "#c0392b";
    msg.textContent = "Escribí tu correo arriba y tocá de nuevo.";
    return;
  }
  msg.style.color = "var(--tinta)";
  msg.textContent = "Enviando correo…";
  const { error } = await supa.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname,
  });
  if (error) { msg.style.color = "#c0392b"; msg.textContent = "⚠️ " + error.message; return; }
  msg.style.color = "green";
  msg.textContent = "📧 Te enviamos un correo para restablecer. Revisá spam (puede tardar).";
}

// 7) Pintar la zona de cuenta
function pintarAuth(sesion) {
  if (sesion && sesion.user) {
    authZona.innerHTML = `
      <span class="auth-email">👤 ${sesion.user.email}</span>
      <button id="btn-salir" class="btn-cuenta" type="button">Salir</button>`;
    document.getElementById("btn-salir").addEventListener("click", async () => {
      await supa.auth.signOut();
    });
  } else {
    authZona.innerHTML = `<button id="btn-cuenta" class="btn-cuenta" type="button">Ingresar / Registrarme</button>`;
    document.getElementById("btn-cuenta").addEventListener("click", () => { setModo("registro"); abrirModal(); });
  }
}

// 8) Conectar y arrancar
if (SUPABASE_LISTO) {
  setModo("registro");
  form.addEventListener("submit", enviar);
  modalCerrar.addEventListener("click", cerrarModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });
  toggle.addEventListener("click", () => setModo(modo === "registro" ? "login" : "registro"));
  reset.addEventListener("click", enviarReset);

  supa.auth.getSession().then(({ data }) => pintarAuth(data.session));
  supa.auth.onAuthStateChange((evento, sesion) => {
    // Cuando el usuario llega desde el correo de reseteo:
    if (evento === "PASSWORD_RECOVERY") { setModo("recuperar"); abrirModal(); }
    pintarAuth(sesion);
  });
} else {
  pintarAuth(null);
}
