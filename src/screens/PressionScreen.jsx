
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView,ActivityIndicator } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import PressionCardComponent from '../components/PressionCardComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import {useAuth} from '../context/AuthContext'
import cfg from '../cfg.json'

 function PressionScreen({navigation}) {
  const {user} = useAuth();
  const [pressionTest,setPressionTest] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getPressionTests();
  }, []);

  const getPressionTests = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(`http://${cfg.serverIP}:3000/api/pressure/get/${user.u_id}`,{
        method: "GET",
          headers: {
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
            'Content-Type': 'application/json',
          },
      });
      if (response.ok) {
        const data = await response.json();
        setPressionTest(data);
      } else {
        console.error('Erro ao obter testes de pressão arterial:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false);
    }
  };

    return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderComponent navigation={navigation} userType={0} userId="0"/>
          <ScrollView>
            <View style={styles().contentWrapper}>
            <View style={styles().titleWrapper}>
                <View style={styles().pageTitle}>
                    <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Análise de dados</Text>
                </View>
                </View>
                {/* TODO, Isto tem de ser um scrollview para poder dar scroll de todos os resultados
                        pedido do backend para ir buscar todos os resultados menos o melhor, pois existirá um pedido para ir buscar o melhor
                        resultado
                */}
                <ScrollView>
                {isLoading ? (
          
                  <ActivityIndicator size="large" color="#025688" style={{ marginTop: 10 }} />
                ) : (
                  
                  pressionTest.length > 0 ? (
                    
                    pressionTest.map((testItem, index) => (
                      <PressionCardComponent key={index} dia={testItem.press_dia} sys={testItem.press_sys} date={testItem.createdAt} isBestResult={false}/>
                    ))
                  ) : (
                    
                    <Text style={styles().noObjectivesText}>
                      Sem exames para mostrar
                    </Text>
                  )
                )}
                
                </ScrollView>
            
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}



const styles = () => StyleSheet.create({
  contentWrapper:{
    width: '100%',
    marginTop:35,
    marginBottom:10,
    paddingHorizontal:10,
    //backgroundColor: 'red'
  },
  titleWrapper:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingLeft:10,
    width:'100%',
    marginVertical:10,
  },
  pageTitle:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  noObjectivesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#3498db',
  },
})

export default PressionScreen