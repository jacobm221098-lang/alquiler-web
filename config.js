// ============================================================
//  CONFIGURACIÓN DE SUPABASE
//  Pegá aquí los datos de TU proyecto (Supabase → Settings → API).
//
//  El "anon key" es PÚBLICO por diseño: puede ir en el frontend
//  sin problema. La seguridad real la dan las reglas RLS en la
//  base de datos, no esconder esta llave.
// ============================================================
const SUPABASE_URL      = "https://aqcpkfodvzwvsxyhihrn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY3BrZm9kdnp3dnN4eWhpaHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2NTYzMTMsImV4cCI6MjEwOTIzMjMxM30.K_k7yxlrDSnrxrv_bJe35uDNJn6LUiI4Ocx0DJM2AJg";

// ¿Ya está configurado? (lo usa el resto del código para avisar si falta)
const SUPABASE_LISTO =
  !SUPABASE_URL.includes("TU-PROYECTO") && !SUPABASE_ANON_KEY.includes("TU_ANON_KEY");

// Cliente COMPARTIDO: un solo "teléfono" a Supabase que usan auth.js y app.js.
const supaClient = SUPABASE_LISTO
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
