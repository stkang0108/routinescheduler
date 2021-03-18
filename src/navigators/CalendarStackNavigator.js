import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MembersScreen from '../screens/MembersScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AddScheduleScreen from '../screens/AddScheduleScreen';
import SelectedScreen from '../screens/SelectedScreen';
import MemberCalScreen from '../screens/MemberCalScreen';

const CalendarStack = createStackNavigator();

export default function CalendarStackNavigator() {
  return (
    <CalendarStack.Navigator
      initialRouteName='MEMBERS'
      screenOptions={{ headerShown: false }}
    >
      <CalendarStack.Screen name={'MEMBERS'} component={MembersScreen} />
      <CalendarStack.Screen name={'MCAL'} component={MemberCalScreen} />
      <CalendarStack.Screen name={'MAIN'} component={CalendarScreen} />
      <CalendarStack.Screen name={'SELECT'} component={SelectedScreen} />
      <CalendarStack.Screen name={'ADD'} component={AddScheduleScreen} />
    </CalendarStack.Navigator>
  );
}
