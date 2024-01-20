import {StyleSheet, View, Text } from 'react-native';
import React from 'react'


function PressionCardComponent({dia, sys, date, isBestResult}) {

    return (
        <View>
            {isBestResult ? 
             <View style={styles().btnContainerBest}>
                <View style={styles().bestResultContainer}>
                    <Text style={styles().bestText}>Melhor Análise</Text>
                    <Text style={styles().dateItem}>07/10/2023</Text>
                </View>
                <View style={styles().valuesContainer}>
                    <Text style={styles().valueItem}>120 SYS</Text>
                    <Text style={styles().valueItem}>80 DIA</Text>
                </View>
            </View> 
        : 
            <View style={styles().btnContainer}>
                <View style={styles().valuesContainer}>
                    <Text style={styles().valueItem}>120 SYS</Text>
                    <Text style={styles().valueItem}>80 DIA</Text>
                </View>
            <Text style={styles().dateItem}>07/10/2023</Text>
    </View>
    }
        </View>
        
    )
  }
  

  PressionCardComponent.defaultProps = {
    dia: "",
    sys: "",
    date: "",
    isBestResult: false,
  }

  const styles = (color,cWidth,cHeight) => StyleSheet.create({
    btnContainer: {
        backgroundColor: '#fff',
        flexDirection:'row',
        justifyContent:'space-between',  // Centraliza verticalmente
        alignItems: 'center',      // Centraliza horizontalmente
        borderRadius: 5,
        marginHorizontal: 7,
        marginVertical: 7,
        paddingHorizontal: 8,
        paddingVertical:15,
        paddingHorizontal:15,
      },
      btnContainerBest:{
        backgroundColor: '#fff',
        flexDirection:'column',
        justifyContent:'space-between',  // Centraliza verticalmente
        alignItems: 'flex-start',      // Centraliza horizontalmente
        borderRadius: 5,
        marginHorizontal: 7,
        marginVertical: 7,
        paddingHorizontal: 8,
        paddingVertical:15,
        paddingHorizontal:15,
      },
      valuesContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '55%',
      },
      valueItem:{
        fontWeight: 'bold',
        fontSize:20,
        color:'#025688'
      },
      dateItem:{
        fontSize:10
      },
      bestResultContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom:14
      },
      bestText:{
        color:'#025688'
      }
})

export default PressionCardComponent