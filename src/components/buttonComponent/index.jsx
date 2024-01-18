import {StyleSheet, View, Text, Button, TouchableHighlight } from 'react-native';
import React from 'react'
import FontAwessome from '@expo/vector-icons/FontAwesome'



function ButtonComponent({text, color, icon, navigation, pageToNavigate}) {

  const onPressButton = () => {
    navigation.navigate(pageToNavigate);
  };

  return (
    <TouchableHighlight onPress={onPressButton}>
     <View style={styles(color).btnContainer}>
         <FontAwessome name={icon} size={24} />
         <Text>{text}</Text>
     </View>
 </TouchableHighlight>

  )
}

ButtonComponent.defaultProps = {
    text: "Resultados",
    color: "#025688",
    icon: "star"
  }

  const styles = (color) => StyleSheet.create({
    btnContainer: {
        width: 84,
        height: 84,
        backgroundColor: color,
        flexDirection:'column',
        justifyContent:'space-evenly',  // Centraliza verticalmente
        alignItems: 'center',      // Centraliza horizontalmente
        borderRadius: 5,
        marginHorizontal: 7,
      }
})

export default ButtonComponent