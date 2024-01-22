
import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import PressionCardComponent from '../components/PressionCardComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';


 function PressionScreen({navigation}) {
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
                <PressionCardComponent isBestResult={true}/>
                <PressionCardComponent isBestResult={false}/>
            
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

export default PressionScreen