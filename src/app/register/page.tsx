import { RegisterForm } from "@/contexts/auth/components/RegisterForm";

/**
 * Página para criação de novas contas.
 */
export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Criar Conta</h1>
          <p className="text-muted-foreground">Comece a organizar seu dia agora mesmo</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}