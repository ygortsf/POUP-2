import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// --- TIPOS ---
export type Transaction = {
  id: number;
  title: string;
  value: number;
  type: 'income' | 'expense';
  date: string;
  category: string;
  recurring: boolean;
};

export type Goal = {
  id: number;
  title: string;
  target: number;
  current: number;
  deadline: string;
  icon: string;
};

interface PoupState {
  transactions: Transaction[];
  goals: Goal[];
  budget: number;
  
  // Ações
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: number) => void;
  updateTransaction: (id: number, updated: Partial<Transaction>) => void;
  setBudget: (val: number) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: number, val: number) => void;
}

// --- STORE ---
// VERIFIQUE SE TEM O "export" AQUI!
export const usePoupStore = create<PoupState>()(
  persist(
    (set) => ({
      transactions: [], // Começa vazio ou coloque seus dados iniciais aqui
      goals: [],
      budget: 3600,

      addTransaction: (tx) => set((state) => ({ 
        transactions: [{ ...tx, id: Date.now() }, ...state.transactions] 
      })),
      
      deleteTransaction: (id) => set((state) => ({ 
        transactions: state.transactions.filter(t => t.id !== id) 
      })),
      
      updateTransaction: (id, updated) => set((state) => ({
        transactions: state.transactions.map(t => t.id === id ? { ...t, ...updated } : t)
      })),

      setBudget: (val) => set({ budget: val }),

      addGoal: (g) => set((state) => ({ goals: [...state.goals, { ...g, id: Date.now() }] })),
      
      updateGoal: (id, val) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, current: g.current + val } : g)
      })),
    }),
    {
      name: 'poup-storage', // Nome da chave no LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);