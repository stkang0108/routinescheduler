import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../screens/CalendarScreen';
import AddScheduleScreen from '../screens/AddScheduleScreen';
import SelectedScreen from '../screens/SelectedScreen';

const CalendarStack = createStackNavigator();

export default function CalendarStackNavigator() {
  return (
    <CalendarStack.Navigator
      initialRouteName='MAIN'
      screenOptions={{ headerShown: false }}
    >
      <CalendarStack.Screen name={'MAIN'} component={CalendarScreen} />
      <CalendarStack.Screen name={'SELECT'} component={SelectedScreen} />
      <CalendarStack.Screen name={'ADD'} component={AddScheduleScreen} />
    </CalendarStack.Navigator>
  );
}
