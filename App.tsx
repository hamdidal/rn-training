import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts, 
         Manrope_400Regular, 
         Manrope_500Medium, 
         Manrope_600SemiBold 
       } from '@expo-google-fonts/manrope';
import { setCustomText } from 'react-native-global-props';
import { Navigation } from './src/navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
  });

  setCustomText({
    style: { fontFamily: 'Manrope_400Regular' }
  });

  return (
    <>
      <StatusBar style="light" />
      <Navigation />
    </>
  );
}