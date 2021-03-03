import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator mode={'modal'} screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={'LOGINSTACK'}>
        {() => (
          <LoginStack.Navigator
            mode={'card'}
            screenOptions={{ headerShown: false }}
          >
            <LoginStack.Screen name={'LOGIN'} component={SigninScreen} />
            <LoginStack.Screen name={'MAIN'} component={MainTabNavigator} />
            <LoginStack.Screen name={'PROFILE'} component={ProfileScreen} />
          </LoginStack.Navigator>
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name={'SIGNUP'} component={SignupScreen} />
    </AuthStack.Navigator>
  );
}
