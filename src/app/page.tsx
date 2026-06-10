"use client";

import { useAuth } from "@/contexts/auth/hooks/useAuth";
import { AddTodoForm } from "@/contexts/todos/components/AddTodoForm";
import { TodoList } from "@/contexts/todos/components/TodoList";
import { Button } from "@/components/ui/button";
import { LogOut, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Página principal protegida. Exibe a lista de tarefas do usuário.
 */
export default function HomePage() {
  const { user, isLoading, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground animate-pulse">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <CheckCircle2 className="text-primary h-6 w-6" />
            <span>Meu To Do</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Minhas Tarefas</h2>
          <AddTodoForm />
        </section>

        <section>
          <TodoList />
        </section>
      </main>
    </div>
  );
}