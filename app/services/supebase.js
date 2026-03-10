// app/services/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://bvfdbcuxaanrkkehqwgs.supabase.co";
const SUPABASE_KEY = "sb_publishable_yAzrw6aLWH_ykwCbzpmuhg_GhHkAyPw";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;

