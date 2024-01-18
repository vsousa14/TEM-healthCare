
import React from 'react';
import { View, Image, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome'

function ExamsScreen({ navigation }) {
    return (
        <SafeAreaView>
        <HeaderComponent navigation={navigation}/>
        
        <View style={styles().contentWrapper}>
        <FontAwessome onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
        <Text>Exames</Text>
        </View>
  
      </SafeAreaView>
    );
  }

  const styles = () => StyleSheet.create({
    contentWrapper:{
      width: '100%',
      marginTop:20,
      backgroundColor: 'red'
    }
  })

  export default ExamsScreen