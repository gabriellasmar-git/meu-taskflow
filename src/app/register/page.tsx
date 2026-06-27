import { RegisterForm } from "@/contexts/auth/components/RegisterForm";
import { Compass, ShieldCheck, Sparkles, Zap, Activity } from "lucide-react";

/**
 * Página de criação de novas contas para o TaskFlow, com layout de duas colunas em desktop
 * utilizando tons de azul escuro (slate-950/indigo-950) e verde esmeralda.
 */
export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Coluna da Esquerda: Lado Motivacional / Características do TaskFlow (Apenas Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-12 text-white flex-col justify-between relative overflow-hidden">
        {/* Elemento de background brilhante */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        {/* Logo superior (TaskFlow) */}
        <div className="flex items-center gap-2.5 font-extrabold text-2xl relative z-10 tracking-tight text-emerald-400">
          <div className="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-500/30 backdrop-blur-md">
            <Activity className="h-6 w-6 text-emerald-400 animate-pulse" />
          </div>
          <span className="text-white">Task<span className="text-emerald-400 font-light">Flow</span></span>
        </div>

        {/* Copy de Atração */}
        <div className="space-y-8 relative z-10 my-auto max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full text-xs font-semibold backdrop-blur-md border border-emerald-500/20 text-emerald-300">
            <Sparkles className="h-3 w-3 text-emerald-300 fill-emerald-300" />
            <span>Fluxo de trabalho contínuo</span>
          </div>
          
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-100">
            Domine sua rotina e otimize suas entregas diárias.
          </h2>
          
          <p className="text-slate-300 text-lg leading-relaxed">
            Organize suas ideias, categorize suas prioridades e tenha clareza do seu progresso em tempo real com uma interface rápida e ultra moderna. Seus dados, seu fluxo.
          </p>

          {/* Vantagens */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-500/10 p-1.5 rounded-lg mt-0.5 border border-emerald-500/20">
                <Zap className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-100">Foco Dinâmico</h4>
                <p className="text-sm text-slate-400">Selecione prioridades e organize listas limpas e focadas no que importa.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-emerald-500/10 p-1.5 rounded-lg mt-0.5 border border-emerald-500/20">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-100">Segurança Total</h4>
                <p className="text-sm text-slate-400">Sua privacidade garantida por meio de armazenamento isolado e seguro.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer lateral */}
        <div className="text-sm text-slate-500 relative z-10 font-medium">
          © {new Date().getFullYear()} TaskFlow. Organização descomplicada.
        </div>
      </div>

      {/* Coluna da Direita: Formulário de Registro */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 md:p-16 bg-slate-900">
        <div className="w-full max-w-md space-y-8 bg-slate-950 p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-800/60">
          
          {/* Logo visível apenas no mobile */}
          <div className="flex lg:hidden items-center justify-center gap-2 font-bold text-3xl text-emerald-400 mb-6 tracking-tight">
            <Activity className="h-7 w-7 text-emerald-400" />
            <span className="text-white">Task<span className="text-emerald-400 font-light">Flow</span></span>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Crie seu cadastro
            </h1>
            <p className="text-slate-400 text-sm">
              Inicie sua jornada rumo a uma rotina de alta produtividade.
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}