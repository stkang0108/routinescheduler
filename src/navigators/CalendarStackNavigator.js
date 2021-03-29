import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MembersScreen from '../screens/MembersScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AddScheduleScreen from '../screens/AddScheduleScreen';
import SelectedScreen from '../screens/SelectedScreen';
import MemberCalScreen from '../screens/MemberCalScreen';
import EditScheduleScreen from '../screens/EditScheduleScreen';
import EditLectureScreen from '../screens/EditLectureScreen';

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
      <CalendarStack.Screen name={'EDITS'} component={EditScheduleScreen} />
      <CalendarStack.Screen name={'EDITL'} component={EditLectureScreen} />
    </CalendarStack.Navigator>
  );
}
