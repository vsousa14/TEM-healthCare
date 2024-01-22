
import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import CollapseComponent from '../../components/CollapseComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';


 function DoctorNutritionScreen({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderComponent navigation={navigation} userType={1} userId="1"/>
          <ScrollView>
            <View style={styles().contentWrapper}>
            <View style={styles().titleWrapper}>
                <View style={styles().pageTitle}>
                    <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Plano Nutricional</Text>
                </View>
                </View>
               
               <CollapseComponent dayofweek={"Segunda-feira"} items={itemsPlan} isEditable={true}/>
               <CollapseComponent dayofweek={"Terça-feira"} items={itemsPlan} isEditable={true}/>
               <CollapseComponent dayofweek={"Quarta-feira"} items={itemsPlan} isEditable={true}/>
               <CollapseComponent dayofweek={"Quinta-feira"} items={itemsPlan} isEditable={true}/>
               <CollapseComponent dayofweek={"Sexta-feira"} items={itemsPlan} isEditable={true}/>
               <CollapseComponent dayofweek={"Sábado"} items={itemsPlan} isEditable={true}/>
               <CollapseComponent dayofweek={"Domingo"} items={itemsPlan} isEditable={true}/>
            
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}

const itemsPlan =  [
    {
    palmoco: 'Alguma coisa para comer bla bla bla',
    mmanha: 'Alguma coisa para comer bla bla bla',
    almoco: 'Alguma coisa para comer bla bla bla',
    lanche1: 'Alguma coisa para comer bla bla bla',
    lanche2: 'Alguma coisa para comer bla bla bla',
    jantar: 'Alguma coisa para comer bla bla bla',
    ceia: 'Alguma coisa para comer bla bla bla',
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