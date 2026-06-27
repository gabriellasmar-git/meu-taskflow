import { LoginForm } from "@/contexts/auth/components/LoginForm";
import { Activity } from "lucide-react";

/**
 * Página de login redesenhada sob o tema TaskFlow (slate-900 e emerald).
 */
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-950">
      {/* Background radial brilhante sutil */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-md space-y-8 bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-800 relative z-10">
        
        {/* Logo superior */}
        <div className="flex flex-col items-center text-center space-y-4 mb-2">
          <div className="bg-emerald-500/10 p-3.5 rounded-2xl text-emerald-400<dyad-write path="src/app/login/page.tsx" description="Finalização completa da página de login sob o design moderno e paleta escura do TaskFlow">
import { LoginForm } from "@/contexts/auth/components/LoginForm";
import { Activity } from "lucide-react";

/**
 * Página de login redesenhada sob o tema TaskFlow (slate-950, slate-900 e esmeralda).
 */
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-950">
      {/* Background radial brilhante sutil */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-md space-y-8 bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-800 relative z-10">
        
        {/* Logo superior */}
        <div className="flex flex-col items-center text-center space-y-4 mb-2">
          <div className="bg-emerald-500/10 p-3.5 rounded-2xl text-emerald-400 border border-emerald-500/20 shadow-inner">
            <Activity className="h-8 w-8 text-emerald-400" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Acesse o seu <span className="text-emerald-400">TaskFlow</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Bem-vindo ao seu painel de alta performance. Entre para organizar o seu fluxo.
            </p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}