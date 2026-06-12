"use client";

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Trash2, ListFilter, CheckCircle, Clock, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type FilterType = "all" | "active" | "completed";

/**
 * Exibe a lista de tarefas filtrada por status com design otimizado.
 * Contém o badge de status altamente profissional de tarefas concluídas.
 */
export const TodoList = () => {
  const { todos, isLoading, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  if (isLoading) {
    return (
      <div className="space-y-3 w-full">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  // Filtra as tarefas de acordo com o estado selecionado
  const filteredTodos = (todos || []).filter((todo) => {
    if (filter === "active") return !todo.is_completed;
    if (filter === "completed") return todo.is_completed;
    return true;
  });

  return (
    <div className="space-y-4 w-full">
      {/* Abas de Filtros de Status (Centralizado e Compacto) */}
      <div className="flex gap-1 p-1 bg-slate-50 rounded-xl border border-slate-100 max-w-[340px] mx-auto w-full shadow-sm">
        <Button
          variant={filter === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
          className="flex-1 rounded-lg text-[11px] font-bold py-1.5 h-auto transition-all"
        >
          <ListFilter className="h-3 w-3 mr-1" />
          Todas ({todos?.length || 0})
        </Button>
        <Button
          variant={filter === "active" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("active")}
          className="flex-1 rounded-lg text-[11px] font-bold py-1.5 h-auto transition-all"
        >
          <Clock className="h-3 w-3 mr-1 text-amber-500" />
          Ativas ({todos?.filter((t) => !t.is_completed).length || 0})
        </Button>
        <Button
          variant={filter === "completed" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("completed")}
          className="flex-1 rounded-lg text-[11px] font-bold py-1.5 h-auto transition-all"
        >
          <CheckCircle className="h-3 w-3 mr-1 text-emerald-500" />
          Concluídas ({todos?.filter((t) => t.is_completed).length || 0})
        </Button>
      </div>

      {/* Conteúdo da Lista */}
      {!filteredTodos.length ? (
        <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-100">
          <p className="text-slate-400 font-medium text-sm">
            {filter === "all" && "Nenhuma tarefa criada. Adicione uma acima!"}
            {filter === "active" && "Nenhuma tarefa pendente por aqui! 🎉"}
            {filter === "completed" && "Nenhuma tarefa concluída ainda."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTodos.map((todo) => {
            const isCompleted = todo.is_completed;
            return (
              <div
                key={todo.id}
                className={cn(
                  "flex items-center justify-between p-4 border rounded-2xl bg-white transition-all duration-200 group hover:shadow-md",
                  isCompleted
                    ? "border-green-100 bg-green-50/10"
                    : "border-slate-100 hover:border-indigo-100"
                )}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* Círculo de Toggle da Esquerda */}
                  {isCompleted ? (
                    <button
                      onClick={() => toggleTodo.mutate({ id: todo.id, is_completed: isCompleted })}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white shrink-0 shadow-sm hover:bg-green-600 transition-colors"
                      title="Marcar como pendente"
                    >
                      <Check className="h-3.5 w-3.5 stroke-[4px]" />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleTodo.mutate({ id: todo.id, is_completed: isCompleted })}
                      className="h-5 w-5 rounded-full border border-slate-300 bg-white hover:border-indigo-500 transition-all shrink-0"
                      title="Marcar como concluída"
                    />
                  )}
                  
                  {/* Título da tarefa */}
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span
                      onClick={() =>
                        toggleTodo.mutate({ id: todo.id, is_completed: isCompleted })
                      }
                      className="text-sm font-semibold truncate cursor-pointer select-none text-slate-800 hover:text-slate-900 transition-colors"
                    >
                      {todo.title}
                    </span>
                  </div>

                  {/* Botão de Status Concluída à direita (Retângulo rounded-lg, borda verde, check verde) */}
                  {isCompleted && (
                    <div className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-white px-3 py-1 text-xs font-semibold text-green-700 shrink-0 select-none shadow-sm">
                      <Check className="h-3.5 w-3.5 text-green-600 stroke-[3.5px]" />
                      <span>Concluída</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl h-9 w-9 transition-colors shrink-0 ml-2"
                  onClick={() => deleteTodo.mutate(todo.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};