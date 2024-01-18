import React, {memo} from 'react'
import { StyleSheet } from 'react-native';
import { View, Text,ScrollView  } from 'react-native';
import ButtonComponent from '../buttonComponent';

const HeaderComponent = memo(({navigation}) => {
    return (
        <View>
          <View style={styles.header}>
            <View style={styles.headerTextWrapper}>
            <Text style={styles.headerTexts}>Welcome back,</Text>
            <Text style={styles.headerTexts}>Vasco Sousa</Text>
            </View>
            
          </View>
          <View style={styles.buttonsWrapper}>
          <ScrollView horizontal={true} style={styles.srollButtons}> 
              <ButtonComponent text={"Resultados"} icon={"star"}/>
              <ButtonComponent text={"Exames"} icon={"file"} navigation={navigation} pageToNavigate={"ExamsScreen"}/>
              <ButtonComponent text={"Nutrição"} icon={"folder"} />
              <ButtonComponent text={"Médicos"} icon={"user-md"} navigation={navigation} pageToNavigate={"MedicsScreen"}/>
              <ButtonComponent text={"Objetivos"} icon={"trophy"} navigation={navigation} pageToNavigate={"ObjectivesScreen"}/>
            </ScrollView>
          </View>
         
        {/* <Text style={styles.headerText}></Text> */}
      </View>
    );
})

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