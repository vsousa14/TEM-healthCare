
import React,{useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView,ActivityIndicator } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import PillsCardComponent from '../components/PillsCardComponent';
import { useAuth } from '../context/AuthContext';
import cfg from '../cfg.json'

function MedicationScreen({ navigation }) {
  const {user} = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/prescriptions/getall/${user.u_id}`, {
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const prescriptionsData = await response.json();
        setPrescriptions(prescriptionsData);
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
    fetchPrescriptions();
  }, []);

    return (
        <SafeAreaView>
          <ScrollView>
        <HeaderComponent navigation={navigation}/>
        
        <View style={styles().contentWrapper}>
          <View style={styles().titleWrapper}>
          <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
          <Text style={{fontSize:20,fontWeight:'bold'}}>Prescrições</Text>
          </View>
        
            {loading ? (
                <ActivityIndicator size="large" color="#3498db" />
              ) : prescriptions.length > 0 ? (
                prescriptions.map((prescription) => (
                  <PillsCardComponent key={prescription.pills_id} pillId={prescription.pills_id} prescription={prescription.pills_name} isDoctor={false} btnType={0} fetchPrescriptions={fetchPrescriptions} />
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

  export default MedicationScreen