import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import cfg from '../../cfg.json'

function ObjectivesFormComponent({ uid, updateObjectivesList, closeForm }) {
  const [objective, setObjective] = useState('');

  const handleAddObjective = async () => {
    try {
      // Execute o fetch aqui usando o valor de 'objective'
      const response = await fetch(`http://${cfg.serverIP}:3000/api/objectives/create`, {
        method: 'POST',
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          u_id: uid, 
          obj_desc: objective,
          obj_date: Date.now()
        }),
      });

      if (response.ok) {
        
        console.log('Objetivo adicionado com sucesso!');
        setObjective("");
        updateObjectivesList();
        closeForm();
      } else {
        
        console.error('Erro ao adicionar objetivo');
      }
    } catch (error) {
      
      console.error('Erro no fetch:', error);
    }
  };

  return (
    <View style={styles().container}>
      <View style={styles().contentWrapper}>
        <View style={styles().formWrapper}>
          <View>
            <TextInput
              editable
              placeholder='Escreva aqui o objetivo'
              numberOfLines={1}
              maxLength={30}
              style={{ backgroundColor: '#fff', width: '90%', paddingVertical: 6, borderRadius: 10, marginVertical: 8 }}
              onChangeText={(text) => setObjective(text)}
            />
          </View>

          <View style={styles().submitButton}>
            <TouchableOpacity onPress={handleAddObjective}>
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
    formWrapper: {
      color: '#fff',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    submitButton: {
      marginVertical: 15,
      backgroundColor: '#025688',
      paddingVertical: 15,
      borderRadius: 5,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default ObjectivesFormComponent;
