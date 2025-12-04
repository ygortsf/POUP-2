"use client";

// CORREÇÃO AQUI: Trocamos '@/' por '../' para encontrar as pastas na raiz
import { usePoupStore } from '../store/useStore';
import SummaryCard from '../components/SummaryCard'; 

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Dashboard() {
  const transactions = usePoupStore((state) => state.transactions);
  
  const income = transactions.filter((t) => t.type === 'income').reduce((acc, cur) => acc + cur.value, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((acc, cur) => acc + cur.value, 0);
  const balance = income - expense;

  const chartData = [
    { name: 'Receitas', valor: income },
    { name: 'Despesas', valor: expense },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Bem-vindo de volta ao seu controle financeiro.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
            title="Saldo Atual" 
            value={balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
            subtitle="Receitas - Despesas" 
        />
        <SummaryCard 
            title="Receitas do Mês" 
            value={income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
            type="positive" 
            subtitle="Total de entradas" 
        />
        <SummaryCard 
            title="Despesas do Mês" 
            value={expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
            type="negative" 
            subtitle="Total de saídas" 
        />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-96">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Balanço Comparativo</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} tickFormatter={(value) => `R$${value}`} />
            <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="valor" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={60}>
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}