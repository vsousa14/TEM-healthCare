import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { styles } from '../../styles';

export default function LoginScreen({ navigation }) {
    return (
      <SafeAreaView style={styles.container}>
     
        <Image
          source={require('../../assets/logo.png')}
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
            
            navigation.navigate('DoctorHomeScreen');
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
  
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
