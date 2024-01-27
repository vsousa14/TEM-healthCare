// Homepage.js
import React, {useState,useEffect,useRef} from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import ActionCardComponent from '../components/ActionCardComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomSheet from '../components/BottomSheet';
import PressionTestComponent from '../components/PressionTestComponent';
import cfg from '../cfg.json'
import {useAuth} from '../context/AuthContext'

 function Homepage({navigation}) {
  const {user} = useAuth();
  const [lastExams, setLastExams] = useState([]);
  const [lastObjectives, setLastObjectives] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingObjectives, setIsLoadingObjectives] = useState(true);

  const { height } = Dimensions.get('screen');
  const bottomSheetRef = useRef(null);
  const handleExpand = () => {
    bottomSheetRef.current?.expand();
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    getLastExams();
   getLastObjectives();
  }, []);

  const getLastExams = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(`http://${cfg.serverIP}:3000/api/exams/lasthree/${user.u_id}`,{
        method: "GET",
          headers: {
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
            'Content-Type': 'application/json',
          },
      });
      if (response.ok) {
        const data = await response.json();
        setLastExams(data);
      } else {
        console.error('Erro ao obter os últimos exames:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLastObjectives = async () => {
    try {
      setIsLoadingObjectives(true);
      const response = await fetch(`http://${cfg.serverIP}:3000/api/objectives/lasthree/${user.u_id}`,{
        method: "GET",
          headers: {
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
            'Content-Type': 'application/json',
          },
      });
      console.log("CODE: ",response.status);
      if (response.ok) {
        const data = await response.json();
        setLastObjectives(data);
      } else {
        console.error('Erro ao obter os últimos objetivos:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setIsLoadingObjectives(false);
    }
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
        {isLoading ? (
          
          <ActivityIndicator size="large" color="#025688" style={{ marginTop: 10 }} />
        ) : (
          
          lastExams.length > 0 ? (
            
            lastExams.map((exam, index) => (
              <ActionCardComponent
                key={index}
                text={exam["ExamCategoria.exam_cat_name"]}
                icon={"file"}
                subText={exam.updatedAt}
                iconPos={"left"}
              />
            ))
          ) : (
            
            <Text style={styles().noObjectivesText}>
              Sem exames para mostrar
            </Text>
          )
        )}
        <View style={styles().objectivesTextWrapper}>
        <Text style={styles().categoryTitle}>Objetivos</Text>
        {/* <Text style={styles().categorySubTitle}>Até 16/09/2023</Text> */}
        </View>
        {isLoadingObjectives ? (
         
          <ActivityIndicator size="large" color="#025688" style={{ marginTop: 10 }} />
        ) : (
        
          lastObjectives.length > 0 ? (
            
            lastObjectives.map((objective, index) => (
              <ActionCardComponent key={index} text={objective.obj_desc} />
            ))
          ) : (
            
            <Text style={styles().noObjectivesText}>Sem objetivos para mostrar</Text>
          )
        )}
        

        </View>  
        </ScrollView>
        <BottomSheet
        ref={bottomSheetRef}
        snapTo={'30%'}
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
  },
  noObjectivesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#3498db',
  },
})

export default Homepage