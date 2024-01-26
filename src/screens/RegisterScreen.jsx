import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import cfg from '../cfg.json'

export default function RegisterScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const handleRegister = async () => {
    
    try {
      // Verificar se as senhas são iguais
      if (password !== repeatPassword) {
        console.error('As senhas não coincidem');
        return;
      }
      
      const response = await fetch(`http://${cfg.serverIP}:3000/api/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          u_nome: firstName,
          u_password: password,
          u_email: email,  
        }),
      });
  
      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        //fazer login aqui para enviar os dados do user para a homepage
        login(data.newUser);
        navigation.navigate('Homepage');
      } else {
        // Exibir mensagem de erro ou tomar outras medidas
        console.error('Erro no registro:', data.error);
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
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
            placeholder="Primeiro Nome"
            placeholderTextColor="#999"
            onChangeText={(text) => setFirstName(text)}
          />

        <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Repetir Password"
            placeholderTextColor="#999"
            secureTextEntry
            onChangeText={(text) => setRepeatPassword(text)}
          />

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => handleRegister()}
              >
                <Text style={styles.buttonText}>Criar Conta</Text>
              </TouchableOpacity>
        
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  
                  navigation.navigate('Login');
                }}
              >
                <Text style={styles.buttonText}>Voltar</Text>
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