// Homepage.js
import React, {useRef} from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import ActionCardComponent from '../components/ActionCardComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomSheet from '../components/BottomSheet';
import PressionTestComponent from '../components/PressionTestComponent';

 function Homepage({navigation}) {
  const { height } = Dimensions.get('screen');
  const bottomSheetRef = useRef(null);
  const handleExpand = () => {
    bottomSheetRef.current?.expand();
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  return (
   
    <SafeAreaProvider>
      <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <ScrollView>
       
        <HeaderComponent navigation={navigation} userType={0}/>

        <View style={styles(height).contentWrapper}>
        <ActionCardComponent text={"Realizar exame Pressão Arterial"} icon={"heart"} bgColor={"#025688"} iconPos={"right"} clickEvent={handleExpand}/>
        <Text style={styles().categoryTitle}>Prescrições</Text>
        <ActionCardComponent text={"Consultar Prescrições"} icon={"medkit"} iconPos={"left"} navigation={navigation} pageToGo={"MedicationScreen"}/>
        <Text style={styles().categoryTitle}>Ultimos Exames</Text>
        <ActionCardComponent text={"Análise de sangue"} icon={"file"} subText={"07/10/2023"} iconPos={"left"}/>
        <View style={styles().objectivesTextWrapper}>
        <Text style={styles().categoryTitle}>Objetivos</Text>
        <Text style={styles().categorySubTitle}>Até 16/09/2023</Text>
        </View>
        <ActionCardComponent text={"Caminhada 30 minutos"}/>

        </View>  
        </ScrollView>
        <BottomSheet
        ref={bottomSheetRef}
        snapTo={'45%'}
        backgroundColor={'#fff'}
        backDropColor={'black'}
      >
        <PressionTestComponent/>
      </BottomSheet>
      </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
   
  );
}

const styles = (yheight) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentWrapper:{
    width: '100%',
    height: yheight,
    marginTop:35,
    marginBottom:10,
    paddingHorizontal:10,
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