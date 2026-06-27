import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://kjoucmzrymfqcbjsfjrj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqb3VjbXpyeW1mcWNianNmanJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MjcyNDAsImV4cCI6MjA5ODEwMzI0MH0.XXiyMXZNGaWPh6Ezz4dVpjhZFUu-iZYlcnX5WurMAOw";

/**
 * Cliente oficial do Supabase inicializado com as credenciais do projeto em produção.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);