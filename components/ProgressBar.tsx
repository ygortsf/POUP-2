import React from 'react';

export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
      <div 
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500"
        style={{ width: `${Math.min(percentage, 100)}%` }}
      >
        {percentage > 5 && `${Math.round(percentage)}%`}
      </div>
    </div>
  );
}