"use client";

import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { AddTodoForm } from "@/contexts/todos/components/AddTodoForm";
import { TodoList } from "@/contexts/todos/components/TodoList";
import { useTodos } from "@/contexts/todos/hooks/useTodos";
import { Button } from "@/components/ui/button";
import { LogOut, Activity, Flame, LayoutDashboard, Compass } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Página principal do TaskFlow. Exibe o fluxo de tarefas do usuário com banner modernizado,
 * paleta de cores (azul escuro slate, esmeralda e branco) e cartões estilizados.
 */
export default function HomePage() {
  const { user, isLoading, logout, isAuthenticated } = useAuth();
  const { todos } = useTodos();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 font-medium animate-pulse">Sincronizando seu fluxo de trabalho seguro...</p>
        </div>
      </div>
    );
  }

  // Estatísticas de progresso
  const totalTodos = todos?.length || 0;
  const completedTodos = todos?.filter((t) => t.is_completed).length || 0;
  const progressPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const userFullName = user?.user_metadata?.full_name || "";
  const userInitials = userFullName
    ? userFullName.split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase()
    : user?.email?.[0].toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Background sutil decorativo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <header className="border-b bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 border-slate-800">
        <div className="container max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo simples TaskFlow */}
          <div className="flex items-center gap-2.5 font-black text-xl text-emerald-400 tracking-tight">
            <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
              <Activity className="h-5 w-5 text-emerald-400 animate-pulse" />
            </div>
            <span className="text-white">Task<span className="text-emerald-400 font-light">Flow</span></span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-slate-950 pl-2.5 pr-1.5 py-1 rounded-full border border-slate-800 transition-all hover:bg-slate-900">
              <span className="text-xs font-semibold text-slate-300 hidden sm:inline max-w-[120px] truncate">
                {userFullName || user?.email}
              </span>
              <div className="h-7 w-7 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center text-xs font-black shadow-md shadow-emerald-500/15">
                {userInitials}
              </div>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout} 
              title="Sair do aplicativo"
              className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full h-9 w-9 transition-all"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Banner de boas-vindas do TaskFlow redesenhado com tons esmeralda e ardósia */}
        <div className="bg-gradient-to-tr from-slate-900 via-slate-900 to-emerald-950 text-white p-6 rounded-3xl shadow-2xl border border-emerald-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="relative z-10 space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-100 flex items-center gap-2">
                <Compass className="h-6 w-6 text-emerald-400" />
                Painel do {userFullName.split(" ")[0] || "Usuário"}
              </h1>
              <p className="text-slate-400 text-sm">
                Foque nas prioridades hoje para alcançar seu fluxo ideal de produtividade.
              </p>
            </div>

            {totalTodos > 0 && (
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <Activity className="h-3.5 w-3.5" />
                    Eficiência de Execução
                  </span>
                  <span className="font-extrabold text-white bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {completedTodos} de {totalTodos} metas resolvidas
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Card de Nova Tarefa do TaskFlow */}
        <section className="space-y-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <h2 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-emerald-400" />
            Adicionar Fluxo de Trabalho
          </h2>
          <AddTodoForm />
        </section>

        {/* Card de Minha Lista do TaskFlow */}
        <section className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl mt-4">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <h2 className="text-lg font-extrabold tracking-tight text-white">Fluxo de Tarefas</h2>
          </div>
          <TodoList />
        </section>
      </main>
    </div>
  );
}
</dyad-file>

<dyad-write path="src/contexts/todos/components/AddTodoForm.tsx" description="Atualizando o formulário para adição de tarefas com a paleta moderna escura do TaskFlow (bg-slate-950, inputs escuros e seletores rápidos verde esmeralda)">
"use client";

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Tag, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Geral", "Trabalho", "Pessoal", "Estudos", "Saúde", "Finanças"];
const PRIORITIES = [
  { value: "low", label: "Baixa", color: "bg-blue-950 text-blue-300 hover:bg-blue-900 border-blue-900" },
  { value: "medium", label: "Média", color: "bg-amber-950 text-amber-300 hover:bg-amber-900 border-amber-900" },
  { value: "high", label: "Alta", color: "bg-rose-950 text-rose-300 hover:bg-rose-900 border-rose-900" },
];

/**
 * Formulário moderno e premium para criação de tarefas no TaskFlow.
 * Incorpora os seletores rápidos de categoria e prioridade sob a identidade visual escura e esmeralda.
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="flex gap-2.5 w-full">
        <Input
          placeholder="O que está pendente no seu fluxo de trabalho?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setShowOptions(true)}
          disabled={createTodo.isPending}
          className="h-11 px-4 bg-slate-950 border-slate-800 text-slate-100 focus-visible:ring-emerald-500 rounded-xl transition-all shadow-inner flex-1 placeholder:text-slate-500 font-semibold"
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={createTodo.isPending || !title.trim()}
          className="h-11 w-11 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl shadow-lg shadow-emerald-500/10 transition-all shrink-0 flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-5 w-5 stroke-[2.5px]" />
        </Button>
      </div>

      {/* Painel de opções expandido sob visual de alta fidelidade do TaskFlow */}
      {showOptions && (
        <div className="pt-3 pb-1 space-y-4 border-t border-slate-800/80 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Linha de Categorias */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Tag className="h-3.5 w-3.5 text-emerald-400" />
              Filtrar por Categoria
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-lg border font-bold transition-all duration-150 active:scale-95",
                    category === cat
                      ? "bg-emerald-500 border-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Linha de Prioridade */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5 text-emerald-400" />
              Prioridade da Atividade
            </span>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value as "low" | "medium" | "high")}
                  className={cn(
                    "text-xs px-3.5 py-1.5 rounded-lg border font-extrabold transition-all duration-150 flex items-center gap-1.5 active:scale-95",
                    p.color,
                    priority === p.value 
                      ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-900 border-transparent shadow-sm" 
                      : "opacity-60 border-slate-800"
                  )}
                >
                  <span className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    p.value === "low" && "bg-blue-400",
                    p.value === "medium" && "bg-amber-400",
                    p.value === "high" && "bg-rose-400"
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