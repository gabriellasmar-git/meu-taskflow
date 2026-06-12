"use client";

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, ListFilter, CheckCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type FilterType = "all" | "active" | "completed";

/**
 * Exibe a lista de tarefas filtrada por status com design otimizado.
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
      {/* Abas de Filtros de Status */}
      <div className="flex gap-1 p-1 bg-slate-50 rounded-xl border border-slate-100">
        <Button
          variant={filter === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
          className="flex-1 rounded-lg text-xs font-semibold py-1.5 h-auto transition-all"
        >
          <ListFilter className="h-3.5 w-3.5 mr-1.5" />
          Todas ({todos?.length || 0})
        </Button>
        <Button
          variant={filter === "active" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("active")}
          className="flex-1 rounded-lg text-xs font-semibold py-1.5 h-auto transition-all"
        >
          <Clock className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
          Ativas ({todos?.filter((t) => !t.is_completed).length || 0})
        </Button>
        <Button
          variant={filter === "completed" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("completed")}
          className="flex-1 rounded-lg text-xs font-semibold py-1.5 h-auto transition-all"
        >
          <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
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
        <div className="space-y-2.5">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 border rounded-xl bg-white hover:bg-slate-50/50 hover:shadow-sm transition-all border-slate-100 group"
            >
              {/* Área clicável que engloba o checkbox e o texto */}
              <div 
                className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer select-none"
                onClick={() =>
                  toggleTodo.mutate({ id: todo.id, is_completed: todo.is_completed })
                }
              >
                <Checkbox
                  checked={todo.is_completed}
                  onCheckedChange={() => {}} // Controlado pelo clique no container pai para evitar conflitos de eventos
                  className="rounded-md border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-colors pointer-events-none"
                />
                <span
                  className={`text-sm font-medium truncate flex-1 transition-all ${
                    todo.is_completed
                      ? "line-through text-slate-400 decoration-slate-300"
                      : "text-slate-700"
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg h-8 w-8 transition-colors shrink-0"
                onClick={() => deleteTodo.mutate(todo.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};