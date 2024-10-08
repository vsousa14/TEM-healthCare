import React, {memo, useState} from 'react'
import { StyleSheet } from 'react-native';
import { View, Text,ScrollView  } from 'react-native';
import ButtonComponent from '../buttonComponent';
import SearchComponent from '../SearchComponent';
import {useAuth} from '../../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderComponent = memo(({navigation, userType, userId,uname ,onSearch }) => {
    const {user} = useAuth();

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          // We have data!!
          console.log(value);
          return value;
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    return (
        <View>
          <View style={styles.header}>
            <View style={styles.headerTextWrapper}>
            <Text style={styles.headerTexts}>Bem-vindo novamente,</Text>
            <Text style={styles.headerTexts}>{userType ? "Dr. " : ""}{user ? user.u_nome : 'Usuário não autenticado'}</Text>
            </View>
            
          </View>
          {userType === 0 ?
          <View style={styles.buttonsWrapper}>
          <ScrollView horizontal={true} style={styles.srollButtons}> 
              <ButtonComponent text={"Resultados"} icon={"star"} navigation={navigation} pageToNavigate={"PressionScreen"}/>
              <ButtonComponent text={"Exames"} icon={"file"} navigation={navigation} pageToNavigate={"ExamsScreen"}/>
              <ButtonComponent text={"Nutrição"} icon={"folder"} navigation={navigation} pageToNavigate={"NutritionScreen"}/>
              <ButtonComponent text={"Médicos"} icon={"user-md"} navigation={navigation} pageToNavigate={"MedicsScreen"}/>
              <ButtonComponent text={"Objetivos"} icon={"trophy"} navigation={navigation} pageToNavigate={"ObjectivesScreen"}/>
            </ScrollView>
          </View>
         : <SearchComponent userId={userId} onSearch={onSearch} uname={uname}/>}
        {/* <Text style={styles.headerText}></Text> */}
      </View>
    );
})

HeaderComponent.defaultProps = {
  userType:0
}

const styles = StyleSheet.create({
    header: {
        width: 393,
        height: 187,
        flexDirection:'row',
        backgroundColor: 'rgba(52, 108, 216, 1)',
        flexDirection:"row",
        alignItems: 'center',      // Centraliza horizontalmente
      },
      headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      buttonsWrapper:{
        flexDirection:'row',
        //backgroundColor: 'rgba(0, 0, 0, .6)',
        width:"100%",
        height:"auto",
        justifyContent:"center",
        alignItems: "flex-end",
        paddingLeft:10,
        marginTop:-55,
      },
      headerTexts:{
        fontWeight:'bold',
        fontSize:20
      },
      headerTextWrapper:{
        //backgroundColor:'red',
        marginLeft:15,
      },
     
})


export default HeaderComponent