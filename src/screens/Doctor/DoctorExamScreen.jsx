// Homepage.js
import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'expo-document-picker';

 function DoctorExamScreen({navigation}) {
  //*states for the description field
  const [desc, setDesc] = React.useState('Test text'); 

  //*states for the dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Análises ao Sangue', value: '1'},
    {label: 'Análises á Urina', value: '2'},
    {label: 'Análises ás Fezes', value: '3'},
    {label: 'TAC', value: '4'},
  ]);

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
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderComponent navigation={navigation} userType={1} userId="1"/>
          <View style={styles().contentWrapper}>
          <View style={styles().titleWrapper}>
          <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
          <Text style={{fontSize:20,fontWeight:'bold'}}>Submeter Exame</Text>
          </View>
            <View style={styles().formWrapper}>
              <DropDownPicker
                placeholder='Selecionar categoria'
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
      
              <View
              style={{
                backgroundColor: desc,
                marginTop:10,
                width:'100%'
                
              }}>
              <TextInput
                editable
                multiline
                numberOfLines={6}
                maxLength={200}
                onChangeText={text => setDesc(text)}
                value={desc}
                style={{padding: 10, backgroundColor:'#fff',borderRadius:10}}
              />
            </View>
            
            <View style={styles().submitFileWrapper}>
            <TouchableOpacity onPress={handlePickDocument } style={styles().submitFile}>
              <FontAwessome style={{marginRight:10}}  name={"paperclip"} size={24} />
              <Text>{pickedDocument ? pickedDocument.assets[0].name : "Escolher Documento"}</Text>
            </TouchableOpacity>
            </View>

              {/* TODO: fazer o input de ficheiro */}
              <View style={styles().submitButton}>
              <TouchableOpacity>
                <Text>Enviar Exame</Text>
              </TouchableOpacity>
            </View>
            </View>
        </View>
        </SafeAreaView>
      );
}



const styles = () => StyleSheet.create({
    contentWrapper:{
        flex:1,
        width: '100%',
        marginTop:20,
        paddingHorizontal:10,
        //backgroundColor: 'red'
      },
      titleWrapper:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingLeft:10,
        marginVertical:10,
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
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
      },
      submitFileWrapper:{
        flexDirection: 'row',
        marginVertical:15,
        backgroundColor:'#fff',
        paddingVertical:15,
        borderRadius:5,
        width:'100%',
        alignItems:'center',
        justifyContent:'space-around',
      },
      submitFile:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        width:'100%',
        paddingLeft:10,
      }
})

export default DoctorExamScreen