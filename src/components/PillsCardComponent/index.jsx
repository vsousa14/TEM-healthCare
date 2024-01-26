import {StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import React from 'react'
import FontAwessome from '@expo/vector-icons/FontAwesome'
import cfg from '../../cfg.json';


function PillsCardComponent({pillId, prescription,isDoctor, btnType, fetchPrescriptions}) {

    const handleRemoveMedication = async (pillId) => {
        try {
          const response = await fetch(`http://${cfg.serverIP}:3000/api/prescriptions/delete/${pillId}`, {
            method: 'DELETE',
            headers: {
              'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            console.log('Medicação removida com sucesso!');
            fetchPrescriptions();
          } else {
            console.error('Erro ao remover medicação');
          }
        } catch (error) {
          console.error('Erro no fetch:', error);
        }
      };

  return (
    <View style={styles().pillCardWrapper}>
        <View style={styles().textWrapper}>
            <Text>{prescription}</Text>
            {isDoctor ? <FontAwessome name={"trash"} onPress={() => {handleRemoveMedication(pillId)}} size={16}/> : ""}
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