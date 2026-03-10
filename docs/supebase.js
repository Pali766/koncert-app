// docs/supabase.js
// Biztonságos Supabase inicializálás a webes prototípushoz.
// Ha már létezik egy kliens (pl. más oldal betöltésekor), újrahasználjuk.

(function () {
  if (window.__KONCERT_SUPABASE_CLIENT) {
    // már van kliens, exportáljuk
    window.supabaseClient = window.__KONCERT_SUPABASE_CLIENT;
    return;
  }

  // CDN scriptnek kell betöltve lennie előtte: https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2
  const SUPABASE_URL = "https://bvfdbcuxaanrkkehqwgs.supabase.co";
  const SUPABASE_KEY = "sb_publishable_yAzrw6aLWH_ykwCbzpmuhg_GhHkAyPw";

  try {
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    // tároljuk globálisan, hogy más fájlok újrahasználhassák
    window.__KONCERT_SUPABASE_CLIENT = client;
    window.supabaseClient = client;
  } catch (err) {
    console.error("Supabase init hiba:", err);
  }
})();

