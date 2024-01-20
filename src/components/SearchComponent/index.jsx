import {StyleSheet, View, Text, TouchableHighlight, TextInput } from 'react-native';
import React from 'react'
import FontAwessome from '@expo/vector-icons/FontAwesome'

function SearchComponent({userId}) {
  return (
    <View style={styles().SearchWrapper}>
      {userId != "0" ?
        <View style={styles().sectionStyle}>
          <Text style={styles().userText}>John Doe</Text>
        </View>
       :
       <View style={styles().sectionStyle}>
            <TextInput style={{flex:1}} placeholder='Procurar Utente' underlineColorAndroid={'transparent'}/>
            <FontAwessome style={styles().iconStyle} name={"search"} size={16} />
       </View>
       
       }
    </View>
  )
}

SearchComponent.defaultProps = {
  userId: "0"
}

const styles = () => StyleSheet.create({
    SearchWrapper:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:-25,
        
    },
    sectionStyle:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding:8,
        marginHorizontal:20,
        backgroundColor:'#fff',
        borderRadius:6
    },
    iconStyle:{
        alignItems: 'center',
    },
    userText:{
      flex:1,
      paddingVertical:4,
      fontWeight:'bold',
      textAlign:'center',
      justifyContent:'center',

    }
});

export default SearchComponent