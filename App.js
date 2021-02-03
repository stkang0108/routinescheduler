import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import { lightTheme } from './src/theme/light';

const Rootstack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={lightTheme}>
      <Rootstack.Navigator screenOptions={{ headerShown: false }}>
        <Rootstack.Screen name={'AuthStack'} component={AuthStackNavigator} />
      </Rootstack.Navigator>
    </NavigationContainer>
  );
}
