import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react'
import FontAwessome from '@expo/vector-icons/FontAwesome'


function ActionCardComponent({icon, iconPos, bgColor, actionIcon, text, subText, cHeight, cWidth, navigation, pageToGo, clickEvent}) {
  const handleRedirect = () => {
    if(pageToGo !== ""){
      navigation.navigate(pageToGo);
    }else{
      if(typeof(clickEvent) == 'function'){
        clickEvent()
      }
    }
   
  }
  
  let renderSubText;
  let renderIcon;
  if(subText != ""){
    renderSubText = <Text style={styles().subText}>{subText}</Text>
  }else{
    renderSubText = "";
  }

  if(icon != ""){
    renderIcon = <FontAwessome name={icon} onPress={clickEvent} size={24} />
  }else{
    renderIcon
  }

  if(bgColor == "#025688"){
    return(
      <TouchableOpacity onPress={clickEvent}>
       <View style={styles(bgColor).btnContainerBig}>
          <Text style={styles().mainTextBig}>{text}</Text>
           {renderIcon}
           
       </View>
   </TouchableOpacity>
    )
  }
  else if(iconPos === "left" && actionIcon == false && bgColor== "#ffffff"){
    return (
      <TouchableOpacity onPress={handleRedirect}>
       <View style={styles(bgColor).btnContainer}>
          {renderIcon}
           <View style={styles().textWrapper}>
           <Text style={styles().mainText}>{text}</Text>
           {renderSubText}
           </View>
           
           <FontAwessome name={"chevron-right"} size={16} />
       </View>
   </TouchableOpacity>
  
    )
  }else if(iconPos === "right" && bgColor== "#ffffff"){
    return (
      <TouchableOpacity onPress={handleRedirect}>
       <View style={styles(bgColor).btnContainer}>
       <View style={styles().textWrapper}>
           <Text style={styles().mainText}>{text}</Text>
           {renderSubText}
           </View>
           {renderIcon}
           
       </View>
   </TouchableOpacity>
  
    )
  }
  
}

ActionCardComponent.defaultProps = {
    icon: "",
    iconPos: "left",
    bgColor: "#ffffff",
    actionIcon: false,
    text: "n/a",
    subText: "",
    cHeight: 'auto',
    cWidth: '80%',
    btnText: "",
    pageToGo: "",
  }

  const styles = (color,cWidth,cHeight) => StyleSheet.create({
    btnContainer: {
        width: cWidth,
        height: cHeight,
        backgroundColor: color,
        flexDirection:'row',
        justifyContent:'space-between',  // Centraliza verticalmente
        alignItems: 'center',      // Centraliza horizontalmente
        borderRadius: 5,
        marginHorizontal: 7,
        marginVertical: 7,
        paddingHorizontal: 8,
        paddingVertical:15,
        paddingHorizontal:15,
      },
      btnContainerBig:{
        width: cWidth,
        height: cHeight,
        backgroundColor: color,
        flexDirection:'row',
        justifyContent:'space-around',  // Centraliza verticalmente
        alignItems: 'center',      // Centraliza horizontalmente
        borderRadius: 5,
        marginHorizontal: 7,
        marginVertical: 7,
        paddingHorizontal: 8,
        paddingVertical:30,
      },
      mainText:{
        fontSize:14,
        fontWeight: 'bold',
      },
      mainTextBig:{
        fontSize:18,
        fontWeight: 'bold',
      },
      textWrapper:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        //backgroundColor: 'red',
        width:'70%'
      },
      subText:{
        fontSize: 10
      },
})

export default ActionCardComponent