
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import PillsCardComponent from '../components/PillsCardComponent';

function MedicationScreen({ navigation }) {
    return (
        <SafeAreaView>
          <ScrollView>
        <HeaderComponent navigation={navigation}/>
        
        <View style={styles().contentWrapper}>
          <View style={styles().titleWrapper}>
          <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
          <Text style={{fontSize:20,fontWeight:'bold'}}>Prescrições</Text>
          </View>
        
            <PillsCardComponent isDoctor={false} btnType={0}/>

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
  })

  export default MedicationScreen