
import React,{useState, useEffect, useRef} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView,ActivityIndicator, Dimensions } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ActionCardComponent from '../components/ActionCardComponent';
import BottomSheet from '../components/BottomSheet';
import ExamInfoComponent from '../components/ExamInfoComponent';
import { useAuth } from '../context/AuthContext';
import cfg from '../cfg.json'

function ExamsScreen({ navigation }) {
  const {user} = useAuth();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState([]);
  const { height } = Dimensions.get('screen');
  const bottomSheetExamsRef = useRef(null);

  const handleExpandExams = (examItem) => {
    setExam(examItem)
    bottomSheetExamsRef.current?.expand();
  };

  const fetchExams = async () => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/exams/get/${user.u_id}`, {
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const exames = await response.json();
        setExams(exames);
      } else {
        console.error('Erro ao obter exames');
      }
    } catch (error) {
      console.error('Erro ao obter exames:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

    return (
      <SafeAreaProvider>
      <GestureHandlerRootView>
        <SafeAreaView>
          <ScrollView>
        <HeaderComponent navigation={navigation}/>
        
        <View style={styles(height).contentWrapper}>
          <View style={styles().titleWrapper}>
          <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
          <Text style={{fontSize:20,fontWeight:'bold'}}>Exames</Text>
          </View>
        
        {loading ? (
                <ActivityIndicator size="large" color="#3498db" />
              ) : exams.length > 0 ? (
                exams.map((exam) => (
                  <ActionCardComponent key={exam.exam_id} text={exam["ExamCategoria.exam_cat_name"]} icon={"file"} subText={exam.createdAt} iconPos={"left"} clickEvent={() => handleExpandExams(exam)}/>
                ))
              ) : (
                <Text style={styles().noPrescriptionsText}>Sem exames para mostrar</Text>
              )}

        </View>
        </ScrollView>
        <BottomSheet
        ref={bottomSheetExamsRef}
        snapTo={'50%'}
        backgroundColor={'#fff'}
        backDropColor={'black'}
      >
       <ExamInfoComponent exam={exam}/>
      </BottomSheet>
      </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
    );
  }

  const styles = (yheight) => StyleSheet.create({
    contentWrapper:{
      width: '100%',
      height: yheight,
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
    noPrescriptionsText: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
      color: '#3498db',
    },
  })

  export default ExamsScreen