"use client";

import { Toaster } from "@/components/ui/sonner";
import { TodoProvider } from "@/contexts/todos/context/TodoContext";
import { useEffect, useState } from "react";

/**
 * Agrupa todos os provedores de contexto necessários.
 * Adicionado o TodoProvider para compartilhamento seguro do estado de tarefas.
 * Protegido contra problemas de hidratação controlando a renderização do Toaster no cliente.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <TodoProvider>
      {children}
      {mounted && <Toaster position="top-right" />}
    </TodoProvider>
  );
}