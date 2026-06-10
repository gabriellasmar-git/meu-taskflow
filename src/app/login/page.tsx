import { LoginForm } from "@/contexts/auth/components/LoginForm";

/**
 * Página de entrada para usuários.
 */
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Bem-vindo</h1>
          <p className="text-muted-foreground">Entre na sua conta para gerenciar suas tarefas</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}