import {StyleSheet, View, Text, Button, TouchableHighlight } from 'react-native';
import React from 'react'
import FontAwessome from '@expo/vector-icons/FontAwesome'



function PressionTestComponent() {


  return (
    <View style={styles().container}>
        <Text>Componente do teste de pressão</Text>
    </View>

  )
}

  const styles = () => StyleSheet.create({
   container:{
    width:'100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    margin:10
   }
})

export default PressionTestComponent