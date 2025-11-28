
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { INITIAL_STATS } from '../constants';
import { Statistics } from '../types';

interface ContentContextType {
  stats: Statistics;
  updateStats: (newStats: Statistics) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Statistics>(INITIAL_STATS);

  const updateStats = (newStats: Statistics) => {
    setStats(newStats);
  };

  return (
    <ContentContext.Provider value={{ stats, updateStats }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
