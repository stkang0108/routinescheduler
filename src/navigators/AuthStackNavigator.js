import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator mode={'modal'} screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={'LOGIN'} component={SigninScreen} />
      <AuthStack.Screen name={'SIGNUP'} component={SignupScreen} />
    </AuthStack.Navigator>
  );
}
