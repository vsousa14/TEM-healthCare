// app.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './src/screens/Homepage'
import LoginScreen from './src/screens/LoginScreen'
import ExamsScreen from './src/screens/ExamsScreen';
import MedicsScreen from './src/screens/MedicsScreen';
import ObjectivesScreen from './src/screens/ObjectivesScreen';
import NutritionScreen from './src/screens/NutritionScreen';
import MedicationScreen from './src/screens/MedicationScreen';
import DoctorHomeScreen from './src/screens/Doctor/DoctorHomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}  initialRouteName="Login">
        <Stack.Screen options={{gestureEnabled:false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{gestureEnabled:false}} name="Homepage" component={Homepage} />
        <Stack.Screen options={{gestureEnabled:false}} name="ExamsScreen" component={ExamsScreen} />
        <Stack.Screen options={{gestureEnabled:false}} name="MedicsScreen" component={MedicsScreen} />
        <Stack.Screen options={{gestureEnabled:false}} name="ObjectivesScreen" component={ObjectivesScreen} />
        <Stack.Screen options={{gestureEnabled:false}} name="NutritionScreen" component={NutritionScreen} />
        <Stack.Screen options={{gestureEnabled:false}} name="MedicationScreen" component={MedicationScreen} />
        <Stack.Screen options={{gestureEnabled:false}} name="DoctorHomeScreen" component={DoctorHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


