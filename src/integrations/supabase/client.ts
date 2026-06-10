import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Cliente único do Supabase para toda a aplicação.
 * Utiliza variáveis de ambiente para segurança.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);