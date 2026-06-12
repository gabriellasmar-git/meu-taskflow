"use client";

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

/**
 * Formulário otimizado e premium para criação de tarefas com transições e estados de foco.
 */
export const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const { createTodo } = useTodos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await createTodo.mutateAsync({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2.5 w-full">
      <Input
        placeholder="O que precisa ser feito hoje?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={createTodo.isPending}
        className="h-11 px-4 border-slate-200 focus-visible:ring-indigo-500 rounded-xl transition-all shadow-sm flex-1 placeholder:text-slate-400"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={createTodo.isPending}
        className="h-11 w-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-100 transition-all shrink-0 flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
      >
        <Plus className="h-5 w-5 stroke-[2.5px]" />
      </Button>
    </form>
  );
};