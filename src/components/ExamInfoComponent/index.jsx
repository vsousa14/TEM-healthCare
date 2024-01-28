import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '../../context/AuthContext';
import cfg from '../../cfg.json'

function ExamInfoComponent({exam}) {
  console.log(exam);
  return (
    <View style={styles().container}>
        
      <View style={styles().contentWrapper}>
       
      <Text style={styles().title}>Detalhes do Exame</Text>
           <Text style={styles().categoryTitle}>{exam["ExamCategoria.exam_cat_name"]}</Text>
           <Text style={styles().descText}>{exam.exam_desct}</Text>
          
      </View>
      <View style={styles().statusBar}>
        <FontAwesome name={'paperclip'} size={24} style={{ marginRight: 10 }} />
        <Text>Descarregar Documento</Text>
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
      alignItems: 'flex-start',
      paddingHorizontal:20,
    },
    contentWrapper: {
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
    },
    pulseContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    valuesContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    valueText: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    messageContainer: {
      position:'absolute',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#2ecc71',
      padding: 10,
      borderRadius: 5,
      marginTop: -50,
      zIndex:2,
    },
    messageText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    title:{
        fontWeight:'bold',
        fontSize:20
    },
    categoryTitle:{
        marginVertical:10,
        fontWeight:'bold',
        fontSize:15
    },
    statusBar: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        marginBottom: 35,
        borderRadius:10,
        backgroundColor: '#025688',
      },
  });

export default ExamInfoComponent;
