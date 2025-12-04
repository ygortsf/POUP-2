import './globals.css';
import Sidebar from '../components/Sidebar'; // Caminho corrigido para a Sidebar
import React from 'react';

export const metadata = {
  title: 'POUP App - Dashboard',
  description: 'Gerenciador Financeiro Pessoal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      {/* O body usa as classes globais do Tailwind, garantindo altura total e fonte. */}
      <body className="flex h-screen w-full bg-gray-100 text-gray-800 antialiased">
        
        {/* O Layout Principal do App (Sidebar fixa e Conteúdo rolável) */}
        <div className="flex w-full h-full">
            
            {/* 1. Sidebar (Menu Fixo) */}
            <Sidebar />
            
            {/* 2. Conteúdo Principal (Scrollável) */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto p-4 md:p-8">
                {/* O children é a página que o Next.js está a renderizar (Dashboard, Receitas, Metas, etc.) */}
                <div className="max-w-7xl w-full mx-auto">
                    {children}
                </div>
            </main>
        </div>
      </body>
    </html>
  );
}