import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  name: string;
  content: string;
  date: number;
  type: string;
}

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('markdown_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar histórico", e);
      }
    }
  }, []);

  const addToHistory = (name: string, content: string, type: string) => {
    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      name,
      content,
      type,
      date: Date.now(),
    };
    const updated = [newItem, ...history].slice(0, 50); // Limite de 50 itens
    setHistory(updated);
    localStorage.setItem('markdown_history', JSON.stringify(updated));
  };

  const removeFromHistory = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('markdown_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('markdown_history');
  };

  return { history, addToHistory, removeFromHistory, clearHistory };
};