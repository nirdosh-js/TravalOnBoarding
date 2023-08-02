import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import {OnBoarding } from './app/screens';

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='OnBoarding' component={OnBoarding} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App