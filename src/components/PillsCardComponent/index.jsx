import {StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import React from 'react'
import FontAwessome from '@expo/vector-icons/FontAwesome'

function PillsCardComponent({isDoctor, btnType}) {
  return (
    <View style={styles().pillCardWrapper}>
        <View style={styles().textWrapper}>
            <Text>Ben U Ron</Text>
            {isDoctor ? <FontAwessome name={"trash"} size={16}/> : ""}
        </View>
        <TouchableHighlight style={{width:'100%'}} onPress={() => {}}>
            <View style={styles().actionButton}>
                <Text>{btnType === 0 ? "Pedir Receita":"Enviar Receita"}</Text>
            </View>
            
        </TouchableHighlight>
    </View>
  )
}

PillsCardComponent.defaultProps = {
    isDoctor: false,
    btnType: 0
}

const styles = () => StyleSheet.create({
    pillCardWrapper:{
        backgroundColor: '#ffffff',
        flexDirection:'column',
        justifyContent:'space-between',  // Centraliza verticalmente
        alignItems: 'center',      // Centraliza horizontalmente
        borderRadius: 5,
        marginHorizontal: 7,
        marginVertical: 7,
        paddingHorizontal: 8,
        paddingVertical:15,
        paddingHorizontal:15,
    },
    textWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical:10,
        width: '100%'
    },
    actionButton:{
        width:'100%',
        borderRadius: 5,
        backgroundColor: '#025688',
        justifyContent: 'center',
        alignItems:'center',
        paddingVertical:5
    }
});

export default PillsCardComponent