import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function PressionTestComponent() {
  const [heartRate, setHeartRate] = useState();
  const [sysValue, setSysValue] = useState(120);
  const [diaValue, setDiaValue] = useState(80);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [fiveSecondsPassed, setFiveSecondsPassed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const startUpdating = () => {
    setIsUpdating(true);
    setShowButton(false);
    setFiveSecondsPassed(false);
    setShowMessage(false);
  };

  useEffect(() => {
    if (isUpdating) {
      const intervalId = setInterval(() => {
        if (!isUpdating) {
          clearInterval(intervalId);
          return;
        }

        const newHeartRate = Math.floor(Math.random() * (110 - 70 + 1)) + 70;
        setHeartRate(newHeartRate);

        const newSysValue = Math.floor(Math.random() * (130 - 110 + 1)) + 110;
        setSysValue(newSysValue);

        const newDiaValue = Math.floor(Math.random() * (90 - 70 + 1)) + 70;
        setDiaValue(newDiaValue);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isUpdating]);

  useEffect(() => {
    if (isUpdating) {
      const timeoutId = setTimeout(() => {
        setIsUpdating(false);
        setShowButton(false);
        setFiveSecondsPassed(true);
        setShowMessage(true);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isUpdating]);

  useEffect(() => {
    if (showMessage) {
      const timeoutId = setTimeout(() => {
        setShowMessage(false);
        setShowButton(true);
        console.log('Heart Rate:', heartRate);
        console.log('SYS Value:', sysValue);
        console.log('DIA Value:', diaValue);
        setHeartRate(0);
        setSysValue(0);
        setDiaValue(0);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [showMessage, heartRate, sysValue, diaValue]);

  return (
    <View style={styles().container}>
      {showMessage && (
        <View style={styles().messageContainer}>
          <Text style={styles().messageText}>Teste concluído</Text>
        </View>
      )}
      <View style={styles().contentWrapper}>
        {showButton && (
          <TouchableOpacity onPress={startUpdating}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Iniciar Teste</Text>
            </View>
          </TouchableOpacity>
        )}
        {!showButton && (
          <>
            <View style={styles().pulseContainer}>
              <FontAwesome name={'heart'} size={87} style={{ marginRight: 10 }} />
              <Text style={styles().valueText}>{heartRate}</Text>
            </View>
  
            <View style={styles().valuesContainer}>
              <Text style={styles().valueText}>{sysValue} SYS</Text>
              <Text style={styles().valueText}>{diaValue} DIA</Text>
            </View>
          </>
        )}
      </View>
      <View style={styles().statusBar}>
        <FontAwesome name={'signal'} size={24} style={{ marginRight: 10 }} />
        <Text>Excelente</Text>
      </View>
    </View>
  );
}

const styles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contentWrapper: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 20,
    },
    statusBar: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexDirection: 'row',
      paddingVertical: 10,
      marginBottom: 24,
      backgroundColor: '#369514',
    },
    pulseContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    valuesContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    valueText: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    messageContainer: {
      position:'absolute',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#2ecc71',
      padding: 10,
      borderRadius: 5,
      marginTop: -50,
      zIndex:2,
    },
    messageText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default PressionTestComponent;
