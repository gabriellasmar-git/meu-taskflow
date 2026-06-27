"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

const registerSchema = z.object({
  fullName: z.string()
    .min(3, "O nome deve conter pelo menos 3 caracteres")
    .max(50, "O nome não pode exceder 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "O nome deve conter apenas letras"),
  email: z.string().email("Por favor, digite um e-mail válido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

/**
 * Componente do formulário de cadastro estilizado para o tema escuro moderno do TaskFlow.
 */
export const RegisterForm = () => {
  const { register } = useAuth();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await register({ 
        email: data.email, 
        password: data.password, 
        fullName: data.fullName 
      });
    } catch (error) {
      // Erro tratado no hook
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        {/* Campo Nome Completo */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 font-semibold text-xs uppercase tracking-wider">Nome Completo</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input 
                    placeholder="Ex: Carlos Silva" 
                    className="pr-10 h-11 bg-slate-900 border-slate-800 focus-visible:ring-emerald-500 rounded-xl transition-all w-full text-slate-100 placeholder:text-slate-500" 
                    {...field} 
                  />
                  <User className="absolute right-4 text-slate-500 h-5 w-5 pointer-events-none z-10" />
                </div>
              </FormControl>
              <FormMessage className="text-emerald-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Campo E-mail */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 font-semibold text-xs uppercase tracking-wider">E-mail Corporativo ou Pessoal</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input 
                    type="email"
                    placeholder="carlos@exemplo.com" 
                    className="pr-10 h-11 bg-slate-900 border-slate-800 focus-visible:ring-emerald-500 rounded-xl transition-all w-full text-slate-100 placeholder:text-slate-500" 
                    {...field} 
                  />
                  <Mail className="absolute right-4 text-slate-500 h-5 w-5 pointer-events-none z-10" />
                </div>
              </FormControl>
              <FormMessage className="text-emerald-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Campo Senha */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 font-semibold text-xs uppercase tracking-wider">Escolha uma Senha</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input 
                    type="password" 
                    placeholder="No mínimo 6 caracteres" 
                    className="pr-10 h-11 bg-slate-900 border-slate-800 focus-visible:ring-emerald-500 rounded-xl transition-all w-full text-slate-100 placeholder:text-slate-500" 
                    {...field} 
                  />
                  <Lock className="absolute right-4 text-slate-500 h-5 w-5 pointer-events-none z-10" />
                </div>
              </FormControl>
              <FormMessage className="text-emerald-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Campo Confirmar Senha */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 font-semibold text-xs uppercase tracking-wider">Confirme a Senha</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input 
                    type="password" 
                    placeholder="Repita sua senha" 
                    className="pr-10 h-11 bg-slate-900 border-slate-800 focus-visible:ring-emerald-500 rounded-xl transition-all w-full text-slate-100 placeholder:text-slate-500" 
                    {...field} 
                  />
                  <Lock className="absolute right-4 text-slate-500 h-5 w-5 pointer-events-none z-10" />
                </div>
              </FormControl>
              <FormMessage className="text-emerald-400 text-xs" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group mt-2" 
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            "Inicializando o seu fluxo..."
          ) : (
            <>
              Criar minha conta no TaskFlow
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-950 px-2 text-slate-500 font-bold tracking-wider">Já tem conta?</span>
          </div>
        </div>

        <p className="text-sm text-center text-slate-400">
          Já possui um perfil?{" "}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition-all">
            Fazer login
          </Link>
        </p>
      </form>
    </Form>
  );
};