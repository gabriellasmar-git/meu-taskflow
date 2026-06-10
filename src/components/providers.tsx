"use client";

import { Toaster } from "@/components/ui/sonner";

/**
 * Agrupa todos os provedores de contexto necessários.
 * Removido o TanStack Query para usar apenas recursos nativos do React.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-right" />
    </>
  );
}