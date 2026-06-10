"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Todo, CreateTodoInput } from "../todos.types";
import { toast } from "sonner";

/**
 * Hook para gerenciar as tarefas do usuário com estado local do React.
 * Substitui o TanStack Query para evitar dependências externas não instaladas.
 * 
 * @returns Queries e mutações simuladas via estado para manipular tarefas.
 */
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Busca inicial das tarefas do usuário logado
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTodos((data as Todo[]) || []);
    } catch (error: any) {
      toast.error(`Erro ao carregar tarefas: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Criação de nova tarefa
  const handleCreateTodo = async ({ title }: CreateTodoInput) => {
    try {
      setIsCreating(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("todos")
        .insert([{ title, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      setTodos((prev) => [data as Todo, ...prev]);
      toast.success("Tarefa adicionada!");
      return data;
    } catch (error: any) {
      toast.error(`Erro ao adicionar tarefa: ${error.message}`);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  // Alternar estado de conclusão (com atualização otimista na UI)
  const handleToggleTodo = async ({ id, is_completed }: { id: string; is_completed: boolean }) => {
    const nextStatus = !is_completed;
    
    // Atualização otimista
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_completed: nextStatus } : t))
    );

    try {
      const { error } = await supabase
        .from("todos")
        .update({ is_completed: nextStatus })
        .eq("id", id);

      if (error) throw error;
    } catch (error: any) {
      toast.error(`Erro ao atualizar tarefa: ${error.message}`);
      // Reverte o estado local buscando do servidor
      fetchTodos();
    }
  };

  // Deletar tarefa (com atualização otimista na UI)
  const handleDeleteTodo = async (id: string) => {
    // Atualização otimista
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) throw error;

      toast.success("Tarefa removida.");
    } catch (error: any) {
      toast.error(`Erro ao remover tarefa: ${error.message}`);
      // Reverte o estado local buscando do servidor
      fetchTodos();
    }
  };

  return {
    todos,
    isLoading,
    createTodo: {
      mutateAsync: handleCreateTodo,
      isPending: isCreating,
    },
    toggleTodo: {
      mutate: handleToggleTodo,
    },
    deleteTodo: {
      mutate: handleDeleteTodo,
    },
  };
}