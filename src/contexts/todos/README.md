# Contexto de Tarefas (To Do)

Gerencia a lista de tarefas do usuário autenticado.

## Estrutura
- `hooks/useTodos.ts`: Hook para CRUD de tarefas via Supabase.
- `components/TodoList.tsx`: Lista de tarefas.
- `components/AddTodoForm.tsx`: Formulário para nova tarefa.

## Decisões Técnicas
- Utiliza TanStack Query para cache e sincronização.
- Filtra tarefas pelo `user_id` do usuário logado.