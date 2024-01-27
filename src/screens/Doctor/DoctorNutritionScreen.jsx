
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
  const [planosTodosSeparados, setPlanosTodosSeparados] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
  });
//http://${cfg.serverIP}:3000/api/nutrition/get/${uid}/${weekday}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64


const fetchPlanoNutricional = async (weekday) => {
  try {
    const response = await fetch(`http://${cfg.serverIP}:3000/api/nutrition/get/${uid}/${weekday}`, {
      method: 'GET',
      headers: {
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64', // Substitua pelo seu token
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (data) {
        const planoNutricional = data.sort((a, b) => a.mealtype - b.mealtype);
        const novosPlanos = { ...planosTodosSeparados, [weekday]: data };
        setPlanosTodosSeparados(novosPlanos);
      }
    } else {
      console.log(`Erro ao obter plano nutricional para ${weekday}`);
    }

  } catch (error) {
    console.error('Erro ao obter o plano nutricional:', error);
  }
};

useEffect(() => {
  // Chama a função de fetch quando o componente montar
  // para cada dia da semana
  const fetchPlanos = async () => {
    for (let weekday = 1; weekday <= 8; weekday++) {
      await fetchPlanoNutricional(weekday);
    }
  };
  if (planosTodosSeparados && planosTodosSeparados.length > 0) {
        console.log(planosTodosSeparados); // Acesso direto a nutr_desc
      }

  fetchPlanos();
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
               
                <CollapseComponent dayofweek={"Segunda-feira"} items={planosTodosSeparados[1]} isEditable={true} uid={uid} dayofweeknumber={1}/>
                <CollapseComponent dayofweek={"Terça-feira"} items={planosTodosSeparados[2]} isEditable={true} uid={uid} dayofweeknumber={2}/>
                <CollapseComponent dayofweek={"Quarta-feira"} items={planosTodosSeparados[3]} isEditable={true} uid={uid} dayofweeknumber={3}/>
                <CollapseComponent dayofweek={"Quinta-feira"} items={planosTodosSeparados[4]} isEditable={true} uid={uid} dayofweeknumber={4}/>
                <CollapseComponent dayofweek={"Sexta-feira"} items={planosTodosSeparados[5]} isEditable={true} uid={uid} dayofweeknumber={5}/>
                <CollapseComponent dayofweek={"Sábado"} items={planosTodosSeparados[6]} isEditable={true} uid={uid} dayofweeknumber={6}/>
                <CollapseComponent dayofweek={"Domingo"} items={planosTodosSeparados[7]} isEditable={true} uid={uid} dayofweeknumber={7}/>
             
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
  }
})

export default DoctorNutritionScreen