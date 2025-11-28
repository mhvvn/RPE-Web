
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FACILITIES_DATA } from '../constants';
import { Facility } from '../types';

interface FacilityContextType {
  facilities: Facility[];
  addFacility: (facility: Facility) => void;
  updateFacility: (facility: Facility) => void;
  deleteFacility: (id: string) => void;
}

const FacilityContext = createContext<FacilityContextType | undefined>(undefined);

export const FacilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [facilities, setFacilities] = useState<Facility[]>(FACILITIES_DATA);

  const addFacility = (facility: Facility) => {
    setFacilities(prev => [...prev, facility]);
  };

  const updateFacility = (updatedFacility: Facility) => {
    setFacilities(prev => prev.map(f => f.id === updatedFacility.id ? updatedFacility : f));
  };

  const deleteFacility = (id: string) => {
    setFacilities(prev => prev.filter(f => f.id !== id));
  };

  return (
    <FacilityContext.Provider value={{ facilities, addFacility, updateFacility, deleteFacility }}>
      {children}
    </FacilityContext.Provider>
  );
};

export const useFacilities = () => {
  const context = useContext(FacilityContext);
  if (context === undefined) {
    throw new Error('useFacilities must be used within a FacilityProvider');
  }
  return context;
};
