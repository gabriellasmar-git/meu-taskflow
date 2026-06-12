"use client";

import * as React from "react";

interface DialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Versão simplificada do Dialog para garantir compatibilidade de build e importação.
 * Atualizado para forçar o trigger de deploy na Vercel.
 */
export function Dialog({ children }: DialogProps) {
  return <>{children}</>;
}

export function DialogTrigger({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function DialogContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function DialogHeader({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function DialogTitle({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props}>{children}</h2>;
}

export function DialogDescription({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props}>{children}</p>;
}

export function DialogFooter({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function DialogClose({ children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return <button {...props}>{children}</button>;
}