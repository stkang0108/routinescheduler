import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import ProfileScreen from '../screens/ProfileScreen';
import MemberHomeScreen from '../screens/MemberHomeScreen';
import TrainerCalendarStackNavigator from '../navigators/TrainerCalendarStackNavigator';
import MemberCalendarStackNavigator from '../navigators/MemberCalendarStackNavigator';
import TrainerHomeStackNavigator from '../navigators/TrainerHomeStackNavigator';

const MainTab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const [user, setUser] = useState({});
  useEffect(() => {
    SecureStore.getItemAsync('Auth').then((Auth) => {
      setUser(JSON.parse(Auth).user);
    });
  }, []);

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
        activeTintColor: '#ff7420',
        inactiveTintColor: 'gray',
      }}
    >
      {user.trainer === 'trainer' ? (
        <>
          <MainTab.Screen name={'Home'} component={TrainerHomeStackNavigator} />
          <MainTab.Screen
            name={'Calendar'}
            component={TrainerCalendarStackNavigator}
          />
        </>
      ) : (
        <>
          <MainTab.Screen name={'Home'} component={MemberHomeScreen} />
          <MainTab.Screen
            name={'Calendar'}
            component={MemberCalendarStackNavigator}
          />
        </>
      )}

      <MainTab.Screen name={'Profile'} component={ProfileScreen} />
    </MainTab.Navigator>
  );
}
