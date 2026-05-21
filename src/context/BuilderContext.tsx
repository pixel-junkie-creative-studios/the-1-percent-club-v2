'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig as initialConfig } from '@/siteConfig';

type BuilderContextType = {
  config: typeof initialConfig;
  isBuilderMode: boolean;
  selectedElement: string | null;
  updateConfig: (path: string, value: any) => void;
  toggleBuilderMode: () => void;
  setSelectedElement: (id: string | null) => void;
  addItem: (path: string, template: any) => void;
  removeItem: (path: string, index: number) => void;
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState(initialConfig);
  const [isBuilderMode, setIsBuilderMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('1percent_club_builder_config');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }
  }, []);

  const updateConfig = (path: string, value: any) => {
    const newConfig = JSON.parse(JSON.stringify(config));
    const keys = path.split('.');
    let current: any = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
    localStorage.setItem('1percent_club_builder_config', JSON.stringify(newConfig));
  };

  const addItem = (path: string, template: any) => {
    const newConfig = JSON.parse(JSON.stringify(config));
    const keys = path.split('.');
    let current: any = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = [...current[keys[keys.length - 1]], template];
    setConfig(newConfig);
    localStorage.setItem('1percent_club_builder_config', JSON.stringify(newConfig));
  };

  const removeItem = (path: string, index: number) => {
    const newConfig = JSON.parse(JSON.stringify(config));
    const keys = path.split('.');
    let current: any = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_: any, i: number) => i !== index);
    setConfig(newConfig);
    localStorage.setItem('1percent_club_builder_config', JSON.stringify(newConfig));
  };

  return (
    <BuilderContext.Provider value={{ 
      config, 
      isBuilderMode, 
      selectedElement, 
      updateConfig, 
      toggleBuilderMode: () => setIsBuilderMode(!isBuilderMode),
      setSelectedElement,
      addItem,
      removeItem
    }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}
