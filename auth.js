// ============================================================
//  AUTENTICACIÓN (cuentas de usuario) con Supabase
//  Maneja: abrir/cerrar el modal, registro, inicio de sesión,
//  cerrar sesión, y mostrar quién está conectado.
// ============================================================

// 1) Creamos el "cliente" de Supabase: el objeto por el que le
//    hablamos al backend. Solo si ya configuraste las claves.
let supa = null;
if (SUPABASE_LISTO) {
  supa = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// 2) Referencias al DOM
const authZona   = document.getElementById("auth-zona");
const modal      = document.getElementById("auth-modal");
const modalCerrar= document.getElementById("auth-cerrar");
const form       = document.getElementById("auth-form");
const inEmail    = document.getElementById("auth-email");
const inPass     = document.getElementById("auth-pass");
const msg        = document.getElementById("auth-msg");
const titulo     = document.getElementById("auth-titulo");
const submitBtn  = document.getElementById("auth-submit");
const toggle     = document.getElementById("auth-toggle");

let modo = "registro"; // "registro" o "login"

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

// 4) Alternar entre Registro e Inicio de sesión
function setModo(nuevo) {
  modo = nuevo;
  if (modo === "registro") {
    titulo.textContent = "Crear cuenta";
    submitBtn.textContent = "Registrarme";
    toggle.innerHTML = "¿Ya tenés cuenta? <b>Iniciá sesión</b>";
  } else {
    titulo.textContent = "Iniciar sesión";
    submitBtn.textContent = "Entrar";
    toggle.innerHTML = "¿Sos nuevo? <b>Creá tu cuenta</b>";
  }
  msg.textContent = "";
}

// 5) Enviar el formulario (registro o login)
async function enviar(e) {
  e.preventDefault();
  const email = inEmail.value.trim();
  const pass  = inPass.value;
  msg.style.color = "var(--tinta)";
  msg.textContent = "Procesando…";

  try {
    if (modo === "registro") {
      // signUp crea el usuario Y manda un CORREO de confirmación
      // a la dirección de registro (tu "notificación al correo").
      const { error } = await supa.auth.signUp({ email, password: pass });
      if (error) throw error;
      msg.style.color = "green";
      msg.textContent = "✅ ¡Listo! Revisá tu correo para confirmar la cuenta.";
    } else {
      const { error } = await supa.auth.signInWithPassword({ email, password: pass });
      if (error) throw error;
      cerrarModal();
    }
  } catch (err) {
    msg.style.color = "#c0392b";
    msg.textContent = "⚠️ " + err.message;
  }
}

// 6) Pintar la zona de cuenta según haya sesión o no
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

// 7) Conectar eventos y arrancar
if (SUPABASE_LISTO) {
  form.addEventListener("submit", enviar);
  modalCerrar.addEventListener("click", cerrarModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });
  toggle.addEventListener("click", () => setModo(modo === "registro" ? "login" : "registro"));

  // Revisar si YA hay sesión al cargar, y escuchar cambios (login/logout)
  supa.auth.getSession().then(({ data }) => pintarAuth(data.session));
  supa.auth.onAuthStateChange((_evento, sesion) => pintarAuth(sesion));
} else {
  // Sin configurar: el botón solo avisa que falta conectar Supabase.
  pintarAuth(null);
}
