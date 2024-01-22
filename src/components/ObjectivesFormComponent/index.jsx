import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';

function ObjectivesFormComponent() {

  return (
    <View style={styles().container}>
      <View style={styles().contentWrapper}>
      <View style={styles().formWrapper}>
             
             <View >
                <TextInput
                    editable
                    placeholder='Escreva aqui o objetivo'
                    numberOfLines={1}
                    maxLength={30}
                    style={{backgroundColor:'#fff', width:'90%',paddingVertical: 6, borderRadius:10, marginVertical:8}}
                />
             </View>

              {/* TODO: fazer o input de ficheiro */}
              <View style={styles().submitButton}>
              <TouchableOpacity>
                <Text>Adicionar Objetivo</Text>
              </TouchableOpacity>
            </View>
            </View>
      </View>
    </View>
  );
}

const styles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contentWrapper: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 20,
    },
    formWrapper:{
        color:'#fff',
        width:'100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:15,
      },
      submitButton:{
        marginVertical:15,
        backgroundColor:'#025688',
        paddingVertical:15,
        borderRadius:5,
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
      },
  });

export default ObjectivesFormComponent;
