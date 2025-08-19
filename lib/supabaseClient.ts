// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Variables de entorno definidas en Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan las variables de entorno de Supabase.");
}

// Exportación default
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
