
import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import PillsCardComponent from '../../components/PillsCardComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';

//! TODO: FALTA NO SIMBOLO DO "+" FAZER ABRIR O BOTTOMSHEET COM O FORMULARIO PARA ADICIONAR PRESCRIÇÃO

 function DoctorPillsScreen({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderComponent navigation={navigation} userType={1} userId="1"/>
          <ScrollView>
            <View style={styles().contentWrapper}>
            <View style={styles().titleWrapper}>
                <View style={styles().pageTitle}>
                    <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Prescrições</Text>
                </View>
                <View>
                    <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"plus"} size={24} /> 
                </View>
                </View>

                <PillsCardComponent isDoctor={true} btnType={1}/>
            
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

export default DoctorPillsScreen