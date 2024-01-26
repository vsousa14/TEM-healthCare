
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import ActionCardComponent from '../components/ActionCardComponent';

function ObjectivesScreen({ navigation }) {
    return (
        <SafeAreaView>
          <ScrollView>
        <HeaderComponent navigation={navigation}/>
        
        <View style={styles().contentWrapper}>
          
        
        <View style={styles().objectivesTextWrapper}>
            <View style={styles().titleWrapper}>
                <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
                <Text style={{fontSize:20,fontWeight:'bold'}}>Objetivos</Text>
            </View>
        </View>

      <ActionCardComponent text={"Caminhada 30 minutos"}/>
      <ActionCardComponent text={"testes de pressão arterial 1x semana"}/>

            
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
    objectivesTextWrapper:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    categorySubTitle:{
        fontSize: 12,
        paddingRight:10
      },
  })

  export default ObjectivesScreen