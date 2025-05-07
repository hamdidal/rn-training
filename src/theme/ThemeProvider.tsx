import React from 'react';
import { StyleSheet } from 'react-native';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return children;
};

export const globalStyles = StyleSheet.create({
  text: {
    fontFamily: 'Manrope_400Regular',
  },
  textMedium: {
    fontFamily: 'Manrope_500Medium',
  },
  textSemiBold: {
    fontFamily: 'Manrope_600SemiBold',
  },
}); 