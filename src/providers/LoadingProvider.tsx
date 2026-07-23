'use client';

import React, { createContext, useContext } from 'react';
import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  progress: number;
  isComplete: boolean;
  setProgress: (progress: number) => void;
  finishLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: true,
  progress: 0,
  isComplete: false,
  setProgress: (progress) => set({ progress }),
  finishLoading: () => set({ isLoading: false, isComplete: true, progress: 100 }),
}));

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
