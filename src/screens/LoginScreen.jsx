import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import cfg from '../cfg.json'

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          u_email: email,
          u_password: password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      const data = await response.json();
      // Continue com o redirecionamento para a Homepage
      await AsyncStorage.setItem('token', JSON.stringify(data.token))
      login(data.user);
      data.user.u_role ? 
      navigation.navigate('DoctorHomeScreen'):
      navigation.navigate('Homepage');
    } catch (error) {
      console.error(error);
      // Trate erros, como exibindo uma mensagem para o usuário
    }
  };

    return (
      <SafeAreaView style={styles.container}>
     
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
  
        <View style={styles.formContainer}>
        <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#999"
            onChangeText={(text) => setEmail(text)}
          />

        <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
        
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  
                  navigation.navigate('Register');
                }}
              >
                <Text style={styles.buttonText}>Criar conta</Text>
              </TouchableOpacity>
            </View>
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#3498db',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer:{
      marginTop:50,
      height: '40%',
      width: '80%'
    },
    textInput: {
      marginVertical:5,
      backgroundColor: '#fff',
      borderRadius:10,
      padding: 10,
      textAlign: 'center',
      fontSize: 16,
      color: '#000',  
    },
    submitButton: {
      width:'100%',
      paddingVertical:10,
      marginVertical:5,
      borderRadius: 5,
      backgroundColor: '#025688',  
      justifyContent: 'center',  
      alignItems: 'center',     
    },
    registerButton:{
      width:'100%',
      paddingVertical:10,
      marginVertical:5,
      borderRadius: 5, 
      justifyContent: 'center',  
      alignItems: 'center', 
    }
  });