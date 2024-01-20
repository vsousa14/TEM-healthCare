import {StyleSheet, View, Text, Button, TouchableHighlight } from 'react-native';
import React from 'react'
import FontAwessome from '@expo/vector-icons/FontAwesome'



function ButtonComponent({text, color, icon, size, navigation, pageToNavigate}) {
  const onPressButton = () => {
    navigation.navigate(pageToNavigate);
  };

  return (
    <TouchableHighlight onPress={onPressButton}>
     <View style={styles(color, size).btnContainer}>
         <FontAwessome name={icon} size={24} />
         {text !== "" ?
         <Text>{text}</Text>
        :""}
     </View>
 </TouchableHighlight>

  )
}

ButtonComponent.defaultProps = {
    text: "",
    color: "#025688",
    icon: "bolt",
    size:84
  }

  const styles = (color,size) => StyleSheet.create({
    btnContainer: {
        width: size,
        height: size,
        backgroundColor: color,
        flexDirection:'column',
        justifyContent:'space-evenly',  // Centraliza verticalmente
        alignItems: 'center',      // Centraliza horizontalmente
        borderRadius: 5,
        marginHorizontal: 7,
      }
})

export default ButtonComponent