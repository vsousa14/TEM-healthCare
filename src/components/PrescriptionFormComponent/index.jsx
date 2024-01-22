import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';

function PrescriptionFormComponent() {

//*handles file selection
const [pickedDocument, setPickedDocument] = useState(null);
const handlePickDocument  = async () => {
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

  return (
    <View style={styles().container}>
      <View style={styles().contentWrapper}>
      <View style={styles().formWrapper}>
             
             <View >
                <TextInput
                    editable
                    placeholder='Nome medicamento'
                    numberOfLines={1}
                    maxLength={30}
                    style={{backgroundColor:'#fff', width:'90%',paddingVertical: 6, borderRadius:10, marginVertical:8}}
                />
             </View>
              
            
            <View style={styles().submitFileWrapper}>
            <TouchableOpacity onPress={handlePickDocument } style={styles().submitFile}>
              <FontAwessome style={{marginRight:10}} name={"paperclip"} size={24} />
              <Text>{pickedDocument ? pickedDocument.assets[0].name : "Escolher Documento"}</Text>
            </TouchableOpacity>
            </View>

              {/* TODO: fazer o input de ficheiro */}
              <View style={styles().submitButton}>
              <TouchableOpacity>
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
