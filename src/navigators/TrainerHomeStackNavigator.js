import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrainerHomeScreen from '../screens/TrainerHomeScreen';
import TrainerCalendarScreen from '../screens/TrainerCalendarScreen';

const CalendarStack = createStackNavigator();

export default function TrainerHomeStackNavigator() {
  return (
    <CalendarStack.Navigator
      initialRouteName='HOME'
      screenOptions={{ headerShown: false }}
    >
      <CalendarStack.Screen name={'HOME'} component={TrainerHomeScreen} />
      <CalendarStack.Screen name={'TCAL'} component={TrainerCalendarScreen} />
    </CalendarStack.Navigator>
  );
}
