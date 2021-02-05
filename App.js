import React, { useState, useEffect } from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { lightTheme } from './src/theme/light';
import MainScreen from './src/screens/MainScreen';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';

const client = new ApolloClient({
  uri: 'http://192.168.0.17:4000',
  cache: new InMemoryCache(),
});

const Rootstack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      if (token) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={lightTheme}>
        {isLoggedIn ? (
          <MainScreen />
        ) : (
          <Rootstack.Navigator screenOptions={{ headerShown: false }}>
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
