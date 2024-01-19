import {StyleSheet, View, Text, TouchableHighlight, TextInput } from 'react-native';
import React from 'react'
import FontAwessome from '@expo/vector-icons/FontAwesome'

function SearchComponent() {
  return (
    <View style={styles().SearchWrapper}>
       <View style={styles().sectionStyle}>
            <TextInput style={{flex:1}} placeholder='Procurar Utente' underlineColorAndroid={'transparent'}/>
            <FontAwessome style={styles().iconStyle} name={"search"} size={16} />
       </View>
    </View>
  )
}

SearchComponent.defaultProps = {
    
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
    }
});

export default SearchComponent