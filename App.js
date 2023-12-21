/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import {StyleSheet,LogBox,} from 'react-native';

import {
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './App/Screen/Login';
import Register from './App/Screen/Register';
import Dashboard from './App/Screen/Dashboard';
import FavListScreen from './App/Screen/FavListScreen';
LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

console.disableYellowBox = true;

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
       <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
       <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
       <Stack.Screen
          name="FavListScreen"
          component={FavListScreen}
          options={{
            headerShown: false,
          }}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
