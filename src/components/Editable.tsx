'use client';

import React from 'react';
import { useBuilder } from '@/context/BuilderContext';
import { motion } from 'framer-motion';

type EditableProps = {
  path: string;
  children: React.ReactNode;
  className?: string;
  type?: 'text' | 'image' | 'box';
};

export default function Editable({ path, children, className = "", type = 'text' }: EditableProps) {
  const { isBuilderMode, setSelectedElement, selectedElement } = useBuilder();
  const isSelected = selectedElement === path;

  if (!isBuilderMode) return <div className={className}>{children}</div>;

  return (
    <motion.div
      onClickCapture={(e) => {
        if (isBuilderMode) {
          e.preventDefault();
          e.stopPropagation();
          setSelectedElement(path);
        }
      }}
      onClick={(e) => {
        if (isBuilderMode) {
          e.preventDefault();
          e.stopPropagation();
          setSelectedElement(path);
        }
      }}
      whileHover={{ scale: 1.01 }}
      className={`relative cursor-pointer group/editable transition-all duration-300 editable-element ${className} ${
        isSelected ? 'ring-2 ring-accent ring-offset-4 ring-offset-black' : 'hover:ring-1 hover:ring-white/20 hover:ring-offset-2 hover:ring-offset-black'
      }`}
    >
      {/* Visual Overlay Label */}
      <div className={`absolute -top-6 left-0 bg-accent text-black text-[8px] font-black uppercase px-2 py-0.5 rounded-t-md opacity-0 group-hover/editable:opacity-100 transition-opacity z-50 pointer-events-none`}>
        EDIT_{type.toUpperCase()}: {path}
      </div>

      {children}

      {/* Editor Active Indicator */}
      {isSelected && (
        <div className="absolute inset-0 bg-accent/5 pointer-events-none animate-pulse border border-accent rounded-lg" />
      )}
    </motion.div>
  );
}
