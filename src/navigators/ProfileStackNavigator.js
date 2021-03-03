import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator from '../navigators/AuthStackNavigator';
import SigninScreen from '../screens/SigninScreen';
import ProfileScreen from '../screens/ProfileScreen';

const ProfileStack = createStackNavigator();

export default function CalendarStackNavigator() {
  return (
    <ProfileStack.Navigator
      initialRouteName='MAIN'
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen name={'LOGIN'} component={SigninScreen} />
      <ProfileStack.Screen name={'MAIN'} component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}
