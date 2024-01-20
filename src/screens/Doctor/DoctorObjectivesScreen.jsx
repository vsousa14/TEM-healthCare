
import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import ActionCardComponent from '../../components/ActionCardComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';

//! TODO: FALTA NO SIMBOLO DO "+" FAZER ABRIR O BOTTOMSHEET COM O FORMULARIO PARA ADICIONAR OBJETIVO

 function DoctorObjectivesScreen({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderComponent navigation={navigation} userType={1} userId="1"/>
          <ScrollView>
            <View style={styles().contentWrapper}>
            <View style={styles().titleWrapper}>
                <View style={styles().pageTitle}>
                    <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Objetivos</Text>
                </View>
                <View>
                    <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"plus"} size={24} /> 
                </View>
                </View>
                {/* TODO, este ActionCard tem que dizer que é um delete e enviar o metodo certo para eliminar */}
                <ActionCardComponent text={"Caminhada 30 minutos"} icon={'trash'} iconPos={'right'}/>
            
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

export default DoctorObjectivesScreen