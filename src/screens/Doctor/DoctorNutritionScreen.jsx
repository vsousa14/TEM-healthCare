
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import CollapseComponent from '../../components/CollapseComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import cfg from '../../cfg.json'

 function DoctorNutritionScreen({navigation}) {
  const route = useRoute();
  const { uid, uname } = route.params;
  const [planosTodosSeparados, setPlanosTodosSeparados] = useState(null);

  const separarPorDiaDaSemana = (planoNutricional) => {
    const planosSeparados = {};
  
    planoNutricional.forEach(item => {
      const { weekday } = item;
  
      if (!planosSeparados[weekday]) {
        planosSeparados[weekday] = [];
      }
      planosSeparados[weekday].push(item);
    });
  
    return planosSeparados;
  };

  const fetchPlanoNutricional = async () => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/nutrition/get/${uid}`, {
        method: 'GET',
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
          'Content-Type': 'application/json',
        },
      });

      if(response.ok){
        const data = await response.json();
       
        if (data) {
          const planoNutricional = data;
          const planosSeparados = separarPorDiaDaSemana(planoNutricional);
          setPlanosTodosSeparados(planosSeparados);
        }
      }else{
        console.log("Erro ao obter plano nutricional");
      }
     
    } catch (error) {
      console.error('Erro ao obter o plano nutricional:', error);
    }
  };

  useEffect(() => {
    // Chama a função de fetch quando o componente montar
    fetchPlanoNutricional();
  }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderComponent navigation={navigation} userType={1} userId={uid} uname={uname}/>
          <ScrollView>
            <View style={styles().contentWrapper}>
            <View style={styles().titleWrapper}>
                <View style={styles().pageTitle}>
                    <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Plano Nutricional</Text>
                </View>
                </View>
               {planosTodosSeparados ? 
               <>
               <CollapseComponent dayofweek={"Segunda-feira"} items={planosTodosSeparados[1]} isEditable={true}/>
               {/* <CollapseComponent dayofweek={"Terça-feira"} items={planosTodosSeparados[2]} isEditable={true}/>
               <CollapseComponent dayofweek={"Quarta-feira"} items={planosTodosSeparados[3]} isEditable={true}/>
               <CollapseComponent dayofweek={"Quinta-feira"} items={planosTodosSeparados[4]} isEditable={true}/>
               <CollapseComponent dayofweek={"Sexta-feira"} items={planosTodosSeparados[5]} isEditable={true}/>
               <CollapseComponent dayofweek={"Sábado"} items={planosTodosSeparados[6]} isEditable={true}/>
               <CollapseComponent dayofweek={"Domingo"} items={planosTodosSeparados[7]} isEditable={true}/> */}
               </>
               :
               <ActivityIndicator size="large" color="#3498db" />
               }
               
            
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}

const itemsPlan =  [
  {
  palmoco: '1 iogurte magro sem açucar + 4 colheres de sopa de cereais sem açucar +1 colher de chá de sementes de linhaça + uma maça fatiada',
  mmanha: '1 cenoura crua + 2 bolachas de arroz',
  almoco: 'Sopa sem batata + 1 posta de maruca a vapor com couve cozida + 2 batatas cozidas + 1 ovo',
  lanche1: '1 Laranja',
  lanche2: '2 fatias de queijo magro + 5 tomates cherry + 1 colher de chá de sementes de chia',
  jantar: '1 bife de peru grelhado com espinafres cozidos',
  ceia: '1 copo de leite magro',
  }
]

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
  }
})

export default DoctorNutritionScreen