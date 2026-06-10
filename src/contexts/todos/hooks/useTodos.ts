"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Todo, CreateTodoInput } from "../todos.types";
import { toast } from "sonner";

/**
 * Hook para gerenciar as tarefas do usuário.
 * 
 * @returns Queries e mutações para manipular tarefas.
 */
export function useTodos() {
  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Todo[];
    },
  });

  const createTodo = useMutation({
    mutationFn: async ({ title }: CreateTodoInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("todos")
        .insert([{ title, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Tarefa adicionada!");
    },
  });

  const toggleTodo = useMutation({
    mutationFn: async ({ id, is_completed }: { id: string; is_completed: boolean }) => {
      const { error } = await supabase
        .from("todos")
        .update({ is_completed: !is_completed })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Tarefa removida.");
    },
  });

  return { todos, isLoading, createTodo, toggleTodo, deleteTodo };
}