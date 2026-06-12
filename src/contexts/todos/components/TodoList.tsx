"use client";

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ListFilter, CheckCircle, Clock, Check, Edit3, X, Save } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type FilterType = "all" | "active" | "completed";

const PRIORITY_LABELS = {
  low: { label: "Baixa", color: "bg-blue-50 text-blue-700 border-blue-100" },
  medium: { label: "Média", color: "bg-amber-50 text-amber-700 border-amber-100" },
  high: { label: "Alta", color: "bg-rose-50 text-rose-700 border-rose-100" },
};

/**
 * Exibe a lista de tarefas filtrada por status com design altamente otimizado e profissional.
 * Suporta filtros, exibição de categorias, etiquetas de prioridades, e alteração inline dos títulos.
 */
export const TodoList = () => {
  const { todos, isLoading, toggleTodo, updateTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

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

  const handleStartEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const handleSaveEdit = (id: string) => {
    if (!editTitle.trim()) return;
    updateTodo.mutate({ id, title: editTitle });
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <div className="space-y-4 w-full">
      {/* Abas de Filtros de Status (Centralizado e Compacto) */}
      <div className="flex gap-1 p-1 bg-slate-50 rounded-xl border border-slate-100 max-w-[380px] mx-auto w-full shadow-sm">
        <Button
          variant={filter === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
          className="flex-1 rounded-lg text-[11px] font-bold py-1.5 h-auto transition-all"
        >
          <ListFilter className="h-3 w-3 mr-1 text-indigo-500" />
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
            const isEditing = editingId === todo.id;
            const priorityConfig = todo.priority ? PRIORITY_LABELS[todo.priority] : PRIORITY_LABELS.medium;

            return (
              <div
                key={todo.id}
                className={cn(
                  "flex flex-col p-4 border rounded-2xl bg-white transition-all duration-200 group hover:shadow-md",
                  isCompleted
                    ? "border-green-100 bg-green-50/10"
                    : "border-slate-100 hover:border-indigo-100"
                )}
              >
                <div className="flex items-start justify-between gap-3.5">
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
                    
                    {/* Título ou campo de Edição */}
                    {isEditing ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="h-9 px-3 border-slate-200 focus-visible:ring-indigo-500 rounded-lg text-sm"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit(todo.id);
                            if (e.key === "Escape") handleCancelEdit();
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 rounded-lg shrink-0"
                          onClick={() => handleSaveEdit(todo.id)}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:bg-slate-50 rounded-lg shrink-0"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex-1 min-w-0">
                        <span
                          onClick={() =>
                            toggleTodo.mutate({ id: todo.id, is_completed: isCompleted })
                          }
                          className={cn(
                            "text-sm font-semibold truncate cursor-pointer select-none text-slate-800 hover:text-slate-900 transition-colors block",
                            isCompleted && "line-through text-slate-400"
                          )}
                        >
                          {todo.title}
                        </span>
                        
                        {/* Tags Inferiores de Categorias e Prioridade */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          {todo.category && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">
                              {todo.category}
                            </span>
                          )}
                          
                          <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold border shadow-sm",
                            priorityConfig.color
                          )}>
                            Prioridade {priorityConfig.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Grupo de Ações da Direita */}
                  {!isEditing && (
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      {isCompleted ? (
                        <div className="inline-flex items-center gap-1 rounded-lg border border-green-200 bg-white px-2 py-1 text-[11px] font-bold text-green-700 select-none shadow-sm">
                          <Check className="h-3 w-3 text-green-600 stroke-[3px]" />
                          <span>Feito</span>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl h-8 w-8 transition-colors"
                          onClick={() => handleStartEdit(todo.id, todo.title)}
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl h-8 w-8 transition-colors"
                        onClick={() => deleteTodo.mutate(todo.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};