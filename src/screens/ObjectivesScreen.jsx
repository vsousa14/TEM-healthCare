
import React, {useEffect,useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView,ActivityIndicator  } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import ActionCardComponent from '../components/ActionCardComponent';
import {useAuth} from '../context/AuthContext'
import cfg from '../cfg.json'

function ObjectivesScreen({ navigation }) {
  const {user} = useAuth();
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchObjectives = async () => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/objectives/get/${user.u_id}`, {
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const objectivesData = await response.json();
        setObjectives(objectivesData);
      } else {
        console.error('Erro ao obter objetivos');
      }
    } catch (error) {
      console.error('Erro ao obter objetivos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObjectives();
  }, []);

    return (
        <SafeAreaView>
          <ScrollView>
        <HeaderComponent navigation={navigation}/>
        
        <View style={styles().contentWrapper}>
          
        
        <View style={styles().objectivesTextWrapper}>
            <View style={styles().titleWrapper}>
                <FontAwessome style={{marginRight:10}} onPress={() =>{navigation.goBack()}} name={"chevron-left"} size={24} /> 
                <Text style={{fontSize:20,fontWeight:'bold'}}>Objetivos</Text>
            </View>
        </View>

        {loading ? (
                <ActivityIndicator size="large" color="#3498db" />
              ) : objectives.length > 0 ? (
                objectives.map((objective) => (
                  <ActionCardComponent key={objective.obj_id} text={objective.obj_desc} iconPos={'right'} />
                ))
              ) : (
                <Text style={styles().noObjectivesText}>Sem objetivos para mostrar</Text>
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
    objectivesTextWrapper:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    categorySubTitle:{
        fontSize: 12,
        paddingRight:10
      },
      noObjectivesText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#3498db',
      },
  })

  export default ObjectivesScreen