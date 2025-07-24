import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://twetpifsodpciskvtwbt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3ZXRwaWZzb2RwY2lza3Z0d2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTQwNjIsImV4cCI6MjA2ODY3MDA2Mn0.GKZx8AauW3aLasuEyQzOxukhM5P-WasmCkgeTdWp0Kc'

export const supabase = createClient(supabaseUrl, supabaseKey);