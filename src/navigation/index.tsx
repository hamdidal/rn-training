import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors } from '../constants/styles/colors';
import InputScreen from '../screens/InputScreen';
import OutputScreen from '../screens/OutputScreen';
import { theme } from '../constants/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Input"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
            
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: theme.typography.fontSize.md
          },
          headerTitle: 'AI Logo',
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="Input" component={InputScreen} />
        <Stack.Screen 
          name="Output" 
          component={OutputScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};