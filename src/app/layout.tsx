import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "TaskFlow — Produtividade Inteligente",
  description: "Gerencie suas tarefas diárias com foco, rapidez e simplicidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-sans antialiased bg-slate-950" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}