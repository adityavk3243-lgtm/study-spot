const SUPABASE_URL = "अपना वही Supabase project URL यहाँ रखें";

const SUPABASE_PUBLISHABLE_KEY = "अपनी वही publishable key यहाँ रखें";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
