// app.js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './Homepage';  
import { styles } from './styles';

const Stack = createStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}  initialRouteName="Login">
        <Stack.Screen options={{gestureEnabled:false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{gestureEnabled:false}} name="Homepage" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
   
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
      />

     
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#999"
        />
      </View>

      
      <View style={styles.secondInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
      </View>

     
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          
          navigation.navigate('Homepage');
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
