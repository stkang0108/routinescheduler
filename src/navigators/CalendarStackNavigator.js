import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../screens/CalendarScreen';
import AddScheduleScreen from '../screens/AddScheduleScreen';

const CalendarStack = createStackNavigator();

export default function CalendarStackNavigator() {
  return (
    <CalendarStack.Navigator
      initialRouteName='MAIN'
      screenOptions={{ headerShown: false }}
    >
      <CalendarStack.Screen name={'MAIN'} component={CalendarScreen} />
      <CalendarStack.Screen name={'ADD'} component={AddScheduleScreen} />
    </CalendarStack.Navigator>
  );
}
