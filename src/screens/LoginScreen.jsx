import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native';


export default function LoginScreen({ navigation }) {
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
          />

        <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  
                  navigation.navigate('Homepage');
                }}
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