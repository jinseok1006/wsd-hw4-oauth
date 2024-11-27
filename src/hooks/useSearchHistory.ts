// hooks/useSearchHistory.ts
import { useState, useEffect } from 'react';

const MAX_HISTORY = 5;
const STORAGE_KEY = 'search_history';

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (keyword: string) => {
    const newHistory = [
      keyword,
      ...history.filter(item => item !== keyword)
    ].slice(0, MAX_HISTORY);
    
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { history, addToHistory, clearHistory };
};