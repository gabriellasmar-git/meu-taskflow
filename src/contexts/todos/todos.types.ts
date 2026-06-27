/**
 * Representa uma tarefa no sistema com suporte a categorização e prioridade.
 */
export interface Todo {
  id: string;
  created_at: string;
  title: string;
  is_completed: boolean;
  user_id: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  is_deleted?: boolean;
}

/**
 * Dados necessários para criar uma nova tarefa.
 */
export interface CreateTodoInput {
  title: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
}