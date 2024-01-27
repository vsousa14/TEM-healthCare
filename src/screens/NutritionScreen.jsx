import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, ScrollView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import CollapseComponent from '../components/CollapseComponent';
import {useAuth} from '../context/AuthContext'
import cfg from '../cfg.json'

function NutritionScreen({ navigation }) {
  const [planosTodosSeparados, setPlanosTodosSeparados] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
  });
  const {user} = useAuth();
  const fetchPlanoNutricional = async (weekday) => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/nutrition/get/${user.u_id}/${weekday}`, {
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
      for (let weekday = 1; weekday <= 7; weekday++) {
        await fetchPlanoNutricional(weekday);
        
      }
    };
  
    fetchPlanos();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent navigation={navigation} />

      <View style={styles().contentWrapper}>
        <View style={styles().titleWrapper}>
          <FontAwessome
            style={{ marginRight: 10 }}
            onPress={() => {
              navigation.goBack();
            }}
            name={"chevron-left"}
            size={24}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nutrição</Text>
        </View>

        <ScrollView>
                <CollapseComponent dayofweek={"Segunda-feira"} items={planosTodosSeparados[1]} isEditable={false}/>
                <CollapseComponent dayofweek={"Terça-feira"} items={planosTodosSeparados[2]} isEditable={false}/>
                <CollapseComponent dayofweek={"Quarta-feira"} items={planosTodosSeparados[3]} isEditable={false}/>
                <CollapseComponent dayofweek={"Quinta-feira"} items={planosTodosSeparados[4]} isEditable={false}/>
                <CollapseComponent dayofweek={"Sexta-feira"} items={planosTodosSeparados[5]} isEditable={false}/>
                <CollapseComponent dayofweek={"Sábado"} items={planosTodosSeparados[6]} isEditable={false}/>
                <CollapseComponent dayofweek={"Domingo"} items={planosTodosSeparados[7]} isEditable={false}/>         
        </ScrollView>
        
      </View>
    </SafeAreaView>
  );
}


const styles = () =>
  StyleSheet.create({
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
  });

export default NutritionScreen;
