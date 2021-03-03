import React, { useState, useEffect } from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { lightTheme } from './src/theme/light';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import MainTabNavigator from './src/navigators/MainTabNavigator';

const client = new ApolloClient({
  uri: 'http://192.168.0.17:4000',
  cache: new InMemoryCache(),
});

const Rootstack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('Auth').then((Auth) => {
      if (Auth) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={lightTheme}>
        {isLoggedIn ? (
          <MainTabNavigator />
        ) : (
          <Rootstack.Navigator
            screenOptions={{ headerShown: false, animationEnabled: false }}
          >
            <Rootstack.Screen
              name={'AuthStack'}
              component={AuthStackNavigator}
            />
          </Rootstack.Navigator>
        )}
      </NavigationContainer>
    </ApolloProvider>
  );
}
