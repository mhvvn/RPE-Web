import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NEWS_DATA } from '../constants';
import { NewsItem } from '../types';

interface NewsContextType {
  news: NewsItem[];
  addNews: (item: NewsItem) => void;
  updateNews: (item: NewsItem) => void;
  deleteNews: (id: string) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with the mock data from constants
  const [news, setNews] = useState<NewsItem[]>(NEWS_DATA);

  const addNews = (item: NewsItem) => {
    setNews(prev => [item, ...prev]);
  };

  const updateNews = (updatedItem: NewsItem) => {
    setNews(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(item => item.id !== id));
  };

  return (
    <NewsContext.Provider value={{ news, addNews, updateNews, deleteNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};