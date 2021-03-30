import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../screens/CalendarScreen';
import SelectedScreen from '../screens/SelectedScreen';

const CalendarStack = createStackNavigator();

export default function MemberCalendarStackNavigator() {
  return (
    <CalendarStack.Navigator
      initialRouteName='HOME'
      screenOptions={{ headerShown: false }}
    >
      <CalendarStack.Screen name={'HOME'} component={CalendarScreen} />
      <CalendarStack.Screen name={'SELECT'} component={SelectedScreen} />
    </CalendarStack.Navigator>
  );
}
