import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import ActionCardComponent from '../../components/ActionCardComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomSheet from '../../components/BottomSheet';
import ObjectivesFormComponent from '../../components/ObjectivesFormComponent';
import { useRoute } from '@react-navigation/native';
import cfg from '../../cfg.json'

function DoctorObjectivesScreen({ navigation }) {
  const route = useRoute();
  const { uid, uname } = route.params;

  const { height } = Dimensions.get('screen');
  const bottomSheetRef = useRef(null);
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleExpand = () => {
    bottomSheetRef.current?.expand();
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  const fetchObjectives = async () => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/objectives/get/${uid}`, {
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

  const handleRemoveObjective = async (objectiveId) => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/objectives/delete/${objectiveId}`, {
        method: 'DELETE',
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Objetivo removido com sucesso!');
        // Atualize a lista de objetivos após a remoção
        fetchObjectives();
      } else {
        console.error('Erro ao remover objetivo');
      }
    } catch (error) {
      console.error('Erro no fetch:', error);
    }
  };

  useEffect(() => {
    fetchObjectives();
  }, [uid]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <SafeAreaView>
          <HeaderComponent navigation={navigation} userType={1} userId={uid} uname={uname} />
          <ScrollView>
            <View style={styles(height).contentWrapper}>
              <View style={styles().titleWrapper}>
                <View style={styles().pageTitle}>
                  <FontAwessome style={{ marginRight: 10 }} onPress={() => { navigation.goBack() }} name={"chevron-left"} size={24} />
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Objetivos</Text>
                </View>
                <View>
                  <FontAwessome style={{ marginRight: 10 }} onPress={() => { handleExpand() }} name={"plus"} size={24} />
                </View>
              </View>

              {loading ? (
                <ActivityIndicator size="large" color="#3498db" />
              ) : objectives.length > 0 ? (
                objectives.map((objective) => (
                  <ActionCardComponent key={objective.obj_id} text={objective.obj_desc} clickEvent={() => handleRemoveObjective(objective.obj_id)} icon={'trash'} iconPos={'right'} />
                ))
              ) : (
                <Text style={styles().noObjectivesText}>Sem objetivos para mostrar</Text>
              )}

            </View>
          </ScrollView>
          <BottomSheet
            ref={bottomSheetRef}
            snapTo={'55%'}
            backgroundColor={'#fff'}
            backDropColor={'black'}
          >
            <ObjectivesFormComponent uid={uid} updateObjectivesList={fetchObjectives} closeForm={handleClose}/>
          </BottomSheet>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = (yheight) => StyleSheet.create({
  contentWrapper: {
    width: '100%',
    height: yheight,
    marginTop: 35,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    width: '100%',
    marginVertical: 10,
  },
  pageTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noObjectivesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#3498db',
  },
});

export default DoctorObjectivesScreen;
