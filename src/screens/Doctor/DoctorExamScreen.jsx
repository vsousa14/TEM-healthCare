import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useRoute } from '@react-navigation/native';
import cfg from '../../cfg.json'

function DoctorExamScreen({ navigation }) {
  const route = useRoute();
  const { uid, uname } = route.params;

  const [desc, setDesc] = useState('');
  const [isLoading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [pickedDocument, setPickedDocument] = useState(null);

  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);

      const response = await fetch(`http://${cfg.serverIP}:3000/api/exams/getcategories`, {
        method: "GET",
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error('Erro ao obter as categorias:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
      if (!result.cancelled) {
        setPickedDocument(result);
      }
    } catch (error) {
      console.error('Erro ao escolher documento:', error);
    }
  };

  const clearForm = () => {
    setDesc('');
    setValue(null);
    setPickedDocument(null);
    setSubmissionSuccess(false);
  };

  const submitExam = async () => {
    try {
      if (!value) {
        Alert.alert('Erro', 'Selecione uma categoria antes de enviar o exame.');
        return;
      }

      const response = await fetch(`http://${cfg.serverIP}:3000/api/exams/create`, {
        method: 'POST',
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          u_id: uid,
          exam_cat_id: Number(value),
          exam_desct: desc,
        }),
      });

      if (response.ok) {
        console.log('Exame enviado com sucesso!');
        setSubmissionSuccess(true);
        setTimeout(() => {
          clearForm();
        }, 2000);
      } else {
        console.error('Erro ao enviar exame:', response.statusText);
        Alert.alert('Erro', 'Erro ao enviar exame. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Erro na requisição. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent navigation={navigation} userType={1} userId={uid} uname={uname} />
      <View style={styles().contentWrapper}>
        <View style={styles().titleWrapper}>
          <FontAwessome style={{ marginRight: 10 }} onPress={() => { navigation.goBack() }} name={"chevron-left"} size={24} />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Submeter Exame</Text>
        </View>
        <View style={styles().formWrapper}>
        {submissionSuccess && (
          <View style={styles().successMessage}>
            <Text style={styles().successMessageText}>Exame Submetido</Text>
          </View>
        )}
          {isLoading ? (
            <ActivityIndicator size="large" color="#025688" style={{ marginTop: 10 }} />
          ) : (
              <DropDownPicker
                placeholder='Selecionar categoria'
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            )
          }

          <View
            style={{
              backgroundColor: desc,
              marginTop: 10,
              width: '100%'
            }}>
            <TextInput
              editable
              multiline
              numberOfLines={6}
              maxLength={200}
              onChangeText={text => setDesc(text)}
              value={desc}
              placeholder='Nota adicional (opcional)'
              style={{ padding: 10, backgroundColor: '#fff', borderRadius: 10 }}
            />
          </View>

          <View style={styles().submitFileWrapper}>
            <TouchableOpacity onPress={handlePickDocument} style={styles().submitFile}>
              <FontAwessome style={{ marginRight: 10 }} name={"paperclip"} size={24} />
              <Text>{pickedDocument ? pickedDocument.assets[0].name : "Escolher Documento"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles().submitButton} >
            <TouchableOpacity onPress={submitExam}>
              <Text>Enviar Exame</Text>
            </TouchableOpacity>
          </View>

          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = () => StyleSheet.create({
  contentWrapper: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    marginVertical: 10,
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitFileWrapper: {
    flexDirection: 'row',
    marginVertical: 15,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  submitFile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 10,
  },
  successMessage: {
    marginBottom: 5,
    padding: 5,
    width:'100%',
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
  },
  successMessageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DoctorExamScreen;
