import { LoginForm } from "@/contexts/auth/components/LoginForm";
import { CheckCircle2 } from "lucide-react";

/**
 * Página de login com design limpo, minimalista e focado em conversão.
 */
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100">
        
        {/* Logo superior */}
        <div className="flex flex-col items-center text-center space-y-4 mb-2">
          <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600 shadow-sm">
            <CheckCircle2 className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Acesse sua conta
            </h1>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              Seja bem-vindo de volta! Entre para acessar e organizar sua lista de tarefas.
            </p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}