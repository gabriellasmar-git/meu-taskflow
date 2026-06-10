"use client";

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

/**
 * Formulário simples para criação de tarefas.
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
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <Input
        placeholder="O que precisa ser feito?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={createTodo.isPending}
      />
      <Button type="submit" size="icon" disabled={createTodo.isPending}>
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
};