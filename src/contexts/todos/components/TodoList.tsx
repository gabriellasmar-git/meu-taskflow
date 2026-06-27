"use client";

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ListFilter, CheckCircle, Clock, Check, Edit3, X, Save, RotateCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type FilterType = "all" | "active" | "completed" | "deleted";

const PRIORITY_LABELS = {
  low: { label: "Baixa", color: "bg-blue-950/60 text-blue-300 border-blue-900/60" },
  medium: { label: "Média", color: "bg-amber-950/60 text-amber-300 border-amber-900/60" },
  high: { label: "Alta", color: "bg-rose-950/60 text-rose-300 border-rose-900/60" },
};

/**
 * Exibe a lista de tarefas filtrada por status com a identidade refinada do TaskFlow.
 * Suporta edição inline, soft-delete, restauração, visual de prioridade e categorias integradas no tema escuro.
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
          <Skeleton key={i} className="h-14 w-full rounded-2xl bg-slate-800/50" />
        ))}
      </div>
    );
  }

  // Filtra as tarefas de acordo com o estado selecionado (garante que is_deleted = false na lista principal)
  const filteredTodos = (todos || []).filter((todo) => {
    if (filter === "deleted") {
      return todo.is_deleted === true;
    }
    // Para todas as outras abas, só mostra se não estiver excluído
    if (todo.is_deleted === true) return false;

    if (filter === "active") return !todo.is_completed;
    if (filter === "completed") return todo.is_completed;
    return true; // "all"
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

    const confirmed = window.confirm("Salvar alterações nesta atividade?");
    if (!confirmed) return;

    updateTodo.mutate({ id, title: editTitle });
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <div className="space-y-4 w-full">
      {/* Abas de Filtros de Status (Estilo Dark Modern expandido para incluir soft delete) */}
      <div className="flex flex-wrap gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 max-w-[500px] mx-auto w-full shadow-inner">
        <Button
          variant={filter === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
          className={cn(
            "flex-1 rounded-lg text-[11px] font-extrabold py-1.5 h-auto transition-all",
            filter === "all" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-100"
          )}
        >
          <ListFilter className="h-3 w-3 mr-1 text-emerald-400" />
          Todas ({todos?.filter((t) => !t.is_deleted).length || 0})
        </Button>
        <Button
          variant={filter === "active" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("active")}
          className={cn(
            "flex-1 rounded-lg text-[11px] font-extrabold py-1.5 h-auto transition-all",
            filter === "active" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-100"
          )}
        >
          <Clock className="h-3 w-3 mr-1 text-amber-400" />
          Ativas ({todos?.filter((t) => !t.is_completed && !t.is_deleted).length || 0})
        </Button>
        <Button
          variant={filter === "completed" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("completed")}
          className={cn(
            "flex-1 rounded-lg text-[11px] font-extrabold py-1.5 h-auto transition-all",
            filter === "completed" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-100"
          )}
        >
          <CheckCircle className="h-3 w-3 mr-1 text-emerald-400" />
          Concluídas ({todos?.filter((t) => t.is_completed && !t.is_deleted).length || 0})
        </Button>
        <Button
          variant={filter === "deleted" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("deleted")}
          className={cn(
            "flex-1 rounded-lg text-[11px] font-extrabold py-1.5 h-auto transition-all",
            filter === "deleted" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-100"
          )}
        >
          <Trash2 className="h-3 w-3 mr-1 text-red-400" />
          Excluídas ({todos?.filter((t) => t.is_deleted).length || 0})
        </Button>
      </div>

      {/* Conteúdo da Lista */}
      {!filteredTodos.length ? (
        <div className="text-center py-10 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800/80">
          <p className="text-slate-500 font-bold text-sm">
            {filter === "all" && "Nenhum fluxo de tarefas ativo. Adicione um acima!"}
            {filter === "active" && "Nenhuma pendência no seu fluxo! Parabéns! 🚀"}
            {filter === "completed" && "Sem tarefas entregues ainda neste filtro."}
            {filter === "deleted" && "Lixeira vazia. Nenhuma tarefa excluída!"}
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
                  "flex flex-col p-4 border rounded-2xl bg-slate-950 transition-all duration-200 group hover:border-slate-700 hover:shadow-lg",
                  todo.is_deleted
                    ? "border-red-950/30 bg-red-950/5"
                    : isCompleted
                    ? "border-emerald-950/50 bg-emerald-950/10"
                    : "border-slate-800/80"
                )}
              >
                <div className="flex items-start justify-between gap-3.5">
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {/* Círculo de Toggle da Esquerda */}
                    {todo.is_deleted ? (
                      <div className="h-5 w-5 rounded-full border border-dashed border-red-500/30 bg-slate-900 shrink-0 flex items-center justify-center">
                        <Trash2 className="h-3 w-3 text-red-500/50" />
                      </div>
                    ) : isCompleted ? (
                      <button
                        onClick={() => toggleTodo.mutate({ id: todo.id, is_completed: isCompleted })}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shrink-0 shadow-md hover:bg-emerald-600 transition-colors"
                        title="Marcar como ativa"
                      >
                        <Check className="h-3.5 w-3.5 stroke-[4px]" />
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleTodo.mutate({ id: todo.id, is_completed: isCompleted })}
                        className="h-5 w-5 rounded-full border border-slate-700 bg-slate-900 hover:border-emerald-500 transition-all shrink-0"
                        title="Marcar como concluída"
                      />
                    )}
                    
                    {/* Título ou campo de Edição */}
                    {isEditing ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="h-9 px-3 bg-slate-900 border-slate-800 focus-visible:ring-emerald-500 text-slate-100 rounded-lg text-sm"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit(todo.id);
                            if (e.key === "Escape") handleCancelEdit();
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-emerald-400 hover:bg-emerald-500/10 rounded-lg shrink-0"
                          onClick={() => handleSaveEdit(todo.id)}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:bg-slate-800 rounded-lg shrink-0"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex-1 min-w-0">
                        <span
                          onClick={() => {
                            if (!todo.is_deleted) {
                              toggleTodo.mutate({ id: todo.id, is_completed: isCompleted });
                            }
                          }}
                          className={cn(
                            "text-sm font-bold truncate transition-colors block text-slate-200",
                            !todo.is_deleted && "cursor-pointer select-none hover:text-white",
                            isCompleted && "line-through text-slate-500",
                            todo.is_deleted && "text-slate-400 italic"
                          )}
                        >
                          {todo.title}
                        </span>
                        
                        {/* Tags Inferiores do TaskFlow */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {todo.category && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-900 text-slate-300 border border-slate-800 shadow-sm">
                              {todo.category}
                            </span>
                          )}
                          
                          <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black border shadow-sm",
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
                      {todo.is_deleted ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl px-2.5 py-1 text-xs font-bold transition-all flex items-center gap-1.5 h-8"
                          onClick={() => {
                            const confirmed = window.confirm("Deseja restaurar esta tarefa para a sua lista ativa?");
                            if (!confirmed) return;
                            updateTodo.mutate({ id: todo.id, is_deleted: false });
                          }}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Restaurar</span>
                        </Button>
                      ) : (
                        <>
                          {isCompleted ? (
                            <div className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-extrabold text-emerald-400 select-none shadow-sm">
                              <Check className="h-3 w-3 text-emerald-400 stroke-[3px]" />
                              <span>Concluído</span>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl h-8 w-8 transition-colors"
                              onClick={() => handleStartEdit(todo.id, todo.title)}
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </Button>
                          )}

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl h-8 w-8 transition-colors"
                            onClick={() => {
                              const confirmed = window.confirm("Excluir esta atividade do seu fluxo de tarefas?");
                              if (!confirmed) return;
                              deleteTodo.mutate(todo.id);
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
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