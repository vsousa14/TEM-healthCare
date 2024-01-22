
import React, {useRef} from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import PillsCardComponent from '../../components/PillsCardComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomSheet from '../../components/BottomSheet';
import PrescriptionFormComponent from '../../components/PrescriptionFormComponent';

//! TODO: FALTA NO SIMBOLO DO "+" FAZER ABRIR O BOTTOMSHEET COM O FORMULARIO PARA ADICIONAR PRESCRIÇÃO

 function DoctorPillsScreen({navigation}) {
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
        <SafeAreaView>
          <HeaderComponent navigation={navigation} userType={1} userId="1"/>
          <ScrollView>
            <View style={styles(height).contentWrapper}>
            <View style={styles().titleWrapper}>
                <View style={styles().pageTitle}>
                    <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Prescrições</Text>
                </View>
                <View>
                    <FontAwessome style={{marginRight:10}} onPress={() =>{handleExpand()}} name={"plus"} size={24} /> 
                </View>
                </View>

                <PillsCardComponent isDoctor={true} btnType={1}/>
            
            </View>
          </ScrollView>
          <BottomSheet
          ref={bottomSheetRef}
          snapTo={'35%'}
          backgroundColor={'#fff'}
          backDropColor={'black'}
          >
            <PrescriptionFormComponent/>
          </BottomSheet>
        </SafeAreaView>
        </GestureHandlerRootView>
        </SafeAreaProvider>
      );
}



const styles = (yheight) => StyleSheet.create({
  contentWrapper:{
    width: '100%',
    height:yheight,
    marginTop:35,
    marginBottom:10,
    paddingHorizontal:10,
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