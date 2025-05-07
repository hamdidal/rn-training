import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
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

  useEffect(() => {
    if (fontsLoaded) {
      setCustomText({
        style: {
          fontFamily: 'Manrope_400Regular',
          fontSize: 16,
          color: '#000000',
        }
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Navigation />
    </>
  );
}