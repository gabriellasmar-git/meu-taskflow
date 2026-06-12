"use client";

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Tag, Flame, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Geral", "Trabalho", "Pessoal", "Estudos", "Saúde", "Finanças"];
const PRIORITIES = [
  { value: "low", label: "Baixa", color: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200" },
  { value: "medium", label: "Média", color: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200" },
  { value: "high", label: "Alta", color: "bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200" },
];

/**
 * Formulário otimizado e premium para criação de tarefas com transições, estados de foco,
 * além de novos seletores rápidos de categoria e prioridade.
 */
export const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Geral");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [showOptions, setShowOptions] = useState(false);
  const { createTodo } = useTodos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await createTodo.mutateAsync({ 
      title, 
      category, 
      priority 
    });
    
    setTitle("");
    // Reseta as opções mantendo o showOptions se o usuário quiser continuar adicionando com o mesmo padrão
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="flex gap-2.5 w-full">
        <Input
          placeholder="O que precisa ser feito hoje?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setShowOptions(true)}
          disabled={createTodo.isPending}
          className="h-11 px-4 border-slate-200 focus-visible:ring-indigo-500 rounded-xl transition-all shadow-sm flex-1 placeholder:text-slate-400 font-medium"
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={createTodo.isPending || !title.trim()}
          className="h-11 w-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-100 transition-all shrink-0 flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-5 w-5 stroke-[2.5px]" />
        </Button>
      </div>

      {/* Painel de opções expandido ao interagir com o formulário */}
      {showOptions && (
        <div className="pt-2 pb-1 space-y-3 border-t border-slate-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Linha de Categorias */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <Tag className="h-3 w-3 text-indigo-500" />
              Selecione uma Categoria
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all duration-150 active:scale-95",
                    category === cat
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Linha de Prioridade */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <Flame className="h-3 w-3 text-rose-500" />
              Nível de Prioridade
            </span>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value as "low" | "medium" | "high")}
                  className={cn(
                    "text-xs px-3.5 py-1.5 rounded-lg border font-bold transition-all duration-150 flex items-center gap-1.5 active:scale-95",
                    p.color,
                    priority === p.value 
                      ? "ring-2 ring-indigo-500 ring-offset-1 border-transparent shadow-sm" 
                      : "opacity-75 border-slate-200"
                  )}
                >
                  <span className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    p.value === "low" && "bg-blue-500",
                    p.value === "medium" && "bg-amber-500",
                    p.value === "high" && "bg-rose-500"
                  )} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </form>
  );
};