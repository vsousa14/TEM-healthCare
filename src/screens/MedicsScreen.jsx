
import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView,ActivityIndicator } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import ActionCardComponent from '../components/ActionCardComponent';
import cfg from '../cfg.json'

function MedicsScreen({ navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/users/getdocs`, {
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const doctorData = await response.json();
        console.log(doctorData.doctors[0]["DocCategoria.doc_cat_name"]);
        setDoctors(doctorData.doctors);
      } else {
        console.error('Erro ao obter prescrições');
      }
    } catch (error) {
      console.error('Erro ao obter prescrições:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

    return (
        <SafeAreaView>
          <ScrollView>
        <HeaderComponent navigation={navigation}/>
        
        <View style={styles().contentWrapper}>
          <View style={styles().titleWrapper}>
          <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
          <Text style={{fontSize:20,fontWeight:'bold'}}>Médicos</Text>
          </View>
        
          {loading ? (
                <ActivityIndicator size="large" color="#3498db" />
              ) : doctors.length > 0 ? (
                doctors.map((doc) => (
                  <ActionCardComponent key={doc.u_id} text={doc.u_nome} icon={"user-md"} subText={doc[["DocCategoria.doc_cat_name"]]} iconPos={"left"}/>
                ))
              ) : (
                <Text style={styles().noPrescriptionsText}>Sem prescrições para mostrar</Text>
              )}

        
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const styles = () => StyleSheet.create({
    contentWrapper:{
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
    noPrescriptionsText: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
      color: '#3498db',
    },
  })

  export default MedicsScreen