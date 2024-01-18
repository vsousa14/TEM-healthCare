// Homepage.js
import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import ActionCardComponent from '../components/ActionCardComponent';

 function Homepage({navigation}) {
  return (
    <SafeAreaView>
      <ScrollView>
      
      <HeaderComponent navigation={navigation}/>
      
      <View style={styles().contentWrapper}>
      <ActionCardComponent text={"Realizar exame Pressão Arterial"} icon={"heart"} bgColor={"#025688"} iconPos={"right"}/>
      <Text style={styles().categoryTitle}>Nutrição</Text>
      <ActionCardComponent text={"Plano Nutrição"} icon={"cutlery"} iconPos={"left"}/>
      <Text style={styles().categoryTitle}>Ultimos Exames</Text>
      <ActionCardComponent text={"Análise de sangue"} icon={"file"} subText={"07/10/2023"} iconPos={"left"}/>
      <View style={styles().objectivesTextWrapper}>
      <Text style={styles().categoryTitle}>Objetivos</Text>
      <Text style={styles().categorySubTitle}>Até 16/09/2023</Text>
      </View>
      <ActionCardComponent text={"Caminhada 30 minutos"}/>
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
  categoryTitle:{
    fontSize: 20,
    fontWeight:"bold",
    paddingTop:30,
    paddingLeft:10
  },
  categorySubTitle:{
    fontSize: 12,
    paddingTop:30,
    paddingRight:10
  },
  objectivesTextWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
})

export default Homepage