// docs/supabase.js
// Biztonságos Supabase wrapper a webes prototípushoz.
// Feltételezi, hogy a HTML előbb betölti a CDN scriptet:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

(function () {
  if (window.__KONCERT_SUPABASE_CLIENT) {
    window.supabaseClient = window.__KONCERT_SUPABASE_CLIENT;
    return;
  }

  const SUPABASE_URL = "https://bvfdbcuxaanrkkehqwgs.supabase.co";
  const SUPABASE_KEY = "sb_publishable_yAzrw6aLWH_ykwCbzpmuhg_GhHkAyPw";

  try {
    if (!window.supabase || !window.supabase.createClient) {
      console.error("Supabase CDN nem töltődött be. Ellenőrizd a CDN script betöltését.");
      return;
    }
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    window.__KONCERT_SUPABASE_CLIENT = client;
    window.supabaseClient = client;
  } catch (err) {
    console.error("Supabase init hiba:", err);
  }
})();
