/**
 * Representa uma tarefa no sistema.
 */
export interface Todo {
  id: string;
  created_at: string;
  title: string;
  is_completed: boolean;
  user_id: string;
}

/**
 * Dados necessários para criar uma nova tarefa.
 */
export interface CreateTodoInput {
  title: string;
}