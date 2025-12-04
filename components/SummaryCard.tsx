import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  type?: 'positive' | 'negative' | 'neutral';
}

export default function SummaryCard({ title, value, subtitle, type = 'neutral' }: SummaryCardProps) {
  const getTextColor = () => {
    if (type === 'positive') return 'text-green-600';
    if (type === 'negative') return 'text-red-600';
    return 'text-gray-800';
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{title}</h3>
      <p className={`text-2xl font-bold ${getTextColor()}`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
    </div>
  );
}