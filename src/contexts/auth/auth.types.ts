import { User } from '@supabase/supabase-js';

/**
 * Estado da autenticação do usuário.
 */
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * Dados necessários para login.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}