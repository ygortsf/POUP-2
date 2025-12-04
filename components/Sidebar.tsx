"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image'; // Importar o componente Image do Next.js
import { 
  LayoutDashboard, TrendingUp, TrendingDown, Wallet, Target, 
  PieChart, Settings, HelpCircle, Accessibility 
} from 'lucide-react';

const MENU_ITEMS = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/receitas', icon: TrendingUp, label: 'Receitas' },
  { href: '/despesas', icon: TrendingDown, label: 'Despesas' },
  { href: '/orcamento', icon: Wallet, label: 'Orçamento' },
  { href: '/metas', icon: Target, label: 'Metas' },
  { href: '/relatorios', icon: PieChart, label: 'Relatórios' },
  { href: '/configuracoes', icon: Settings, label: 'Configurações' },
  { href: '/ajuda', icon: HelpCircle, label: 'Ajuda' },
  { href: '/acessibilidade', icon: Accessibility, label: 'Acessibilidade' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white h-screen">
      {/* SEÇÃO DA LOGO E DO MASCOTE POUP */}
      <div className="p-2 border-b flex flex-col items-center text-center">
        {/* AUMENTAMOS A ÁREA DA IMAGEM PARA w-28 h-28 (112x112px) */}
        <div className="relative w-28 h-28 mb-4"> 
            <Image 
              src="/fotopoup.png" 
              alt="Mascote POUP" 
              layout="fill" 
              objectFit="contain" // Garante que a imagem caiba sem ser cortada
              className="shadow-lg"
            />
        </div>
        
        <h1 className="text-3xl font-black bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          POUP
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Organização Simplificada
        </p>
      </div>
      
      {/* MENU DE NAVEGAÇÃO */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}