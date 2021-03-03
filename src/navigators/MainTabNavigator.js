import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CalendarStackNavigator from '../navigators/CalendarStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';

const MainTab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <MainTab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-clipboard' : 'ios-clipboard-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'ios-person-circle'
              : 'ios-person-circle-outline';
          }
          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <MainTab.Screen name={'Home'} component={HomeScreen} />
      <MainTab.Screen name={'Calendar'} component={CalendarStackNavigator} />
      <MainTab.Screen name={'Profile'} component={ProfileScreen} />
    </MainTab.Navigator>
  );
}
