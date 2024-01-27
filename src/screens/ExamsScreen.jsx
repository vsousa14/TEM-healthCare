
import React,{useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView,ActivityIndicator } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import ActionCardComponent from '../components/ActionCardComponent';
import { useAuth } from '../context/AuthContext';
import cfg from '../cfg.json'

function ExamsScreen({ navigation }) {
  const {user} = useAuth();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <SafeAreaView>
          <ScrollView>
        <HeaderComponent navigation={navigation}/>
        
        <View style={styles().contentWrapper}>
          <View style={styles().titleWrapper}>
          <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
          <Text style={{fontSize:20,fontWeight:'bold'}}>Exames</Text>
          </View>
        
        {loading ? (
                <ActivityIndicator size="large" color="#3498db" />
              ) : exams.length > 0 ? (
                exams.map((exam) => (
                  <ActionCardComponent key={exam.exam_id} text={exam.exam_desct} icon={"file"} subText={exam.createdAt} iconPos={"left"}/>
                ))
              ) : (
                <Text style={styles().noPrescriptionsText}>Sem exames para mostrar</Text>
              )}

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
    noPrescriptionsText: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
      color: '#3498db',
    },
  })

  export default ExamsScreen