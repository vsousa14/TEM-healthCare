import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';
import cfg from '../../cfg.json';
import {useAuth} from '../../context/AuthContext'

function PrescriptionFormComponent({uid,updatePillsList,closeForm}) {
  const {user} = useAuth();
  const [pickedDocument, setPickedDocument] = useState(null);
  const [medicationName, setMedicationName] = useState('');

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
      if (!result.cancelled) {
        setPickedDocument(result);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handleCreatePrescription = async () => {
    try {
      // const formData = new FormData();
      // formData.append('medicationName', medicationName);
      // formData.append('prescriptionFile', {
      //   uri: pickedDocument.uri,
      //   type: 'application/pdf',
      //   name: pickedDocument.name,
      // });
      console.log("MEDICAÇÃO: ",medicationName);
      const response = await fetch(`http://${cfg.serverIP}:3000/api/prescriptions/create`, {
        method: 'POST',
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          u_id: uid,
          u_doc_id: user.u_id,
          pills_name: medicationName,
          pills_userrequest: 0
        }),
      });

      if (response.ok) {
        console.log('Prescrição criada com sucesso!');
        // Limpar os campos do formulário após o envio bem-sucedido, se necessário
        updatePillsList();
        closeForm();
      } else {
        console.error('Erro ao criar prescrição');
      }
    } catch (error) {
      console.error('Erro no fetch ao criar prescrição:', error);
    }
  };

  return (
    <View style={styles().container}>
      <View style={styles().contentWrapper}>
        <View style={styles().formWrapper}>
          <View>
            <TextInput
              editable
              placeholder='Nome medicamento'
              onChangeText={(text) => setMedicationName(text)}
              numberOfLines={1}
              maxLength={30}
              style={{ backgroundColor: '#fff', width: '90%', paddingVertical: 6, borderRadius: 10, marginVertical: 8 }}
            />
          </View>

          <View style={styles().submitFileWrapper}>
            <TouchableOpacity onPress={handlePickDocument} style={styles().submitFile}>
              <FontAwessome style={{ marginRight: 10 }} name={"paperclip"} size={24} />
              <Text>{pickedDocument ? pickedDocument.name : "Escolher Documento"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles().submitButton}>
            <TouchableOpacity onPress={handleCreatePrescription}>
              <Text>Criar Prescrição</Text>
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
      submitFile:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        width:'100%',
        paddingLeft:10,
      },
  });

export default PrescriptionFormComponent;
