"use client";

import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { AddTodoForm } from "@/contexts/todos/components/AddTodoForm";
import { TodoList } from "@/contexts/todos/components/TodoList";
import { useTodos } from "@/contexts/todos/hooks/useTodos";
import { Button } from "@/components/ui/button";
import { LogOut, Activity, LayoutDashboard, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Página principal do TaskFlow. Exibe o fluxo de tarefas do usuário com banner modernizado,
 * paleta de cores (azul escuro slate, esmeralda e branco) e cartões estilizados.
 * Inclui verificação robusta de montagem (mounted) para prevenir erros de hidratação (hydration errors).
 */
export default function HomePage() {
  const { user, isLoading, logout, isAuthenticated } = useAuth();
  const { todos } = useTodos();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Garante que o componente está montado no cliente antes de renderizar elementos dinâmicos
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isLoading, isAuthenticated, router]);

  // Enquanto não estiver montado ou carregando dados da sessão, exibe o esqueleto idêntico no SSR e Client
  if (!mounted || isLoading || !isAuthenticated) {
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