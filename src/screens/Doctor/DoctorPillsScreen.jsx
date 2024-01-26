import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import PillsCardComponent from '../../components/PillsCardComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomSheet from '../../components/BottomSheet';
import PrescriptionFormComponent from '../../components/PrescriptionFormComponent';
import { useRoute } from '@react-navigation/native';
import cfg from '../../cfg.json';

function DoctorPillsScreen({ navigation }) {
  const route = useRoute();
  const { uid, uname } = route.params;

  const { height } = Dimensions.get('screen');
  const bottomSheetRef = useRef(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(prescriptions);
  const handleExpand = () => {
    bottomSheetRef.current?.expand();
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/prescriptions/getall/${uid}`, {
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const prescriptionsData = await response.json();
        setPrescriptions(prescriptionsData);
      } else {
        console.error('Erro ao obter prescrições');
      }
    } catch (error) {
      console.error('Erro ao obter prescrições:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
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
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Prescrições</Text>
                </View>
                <View>
                  <FontAwessome style={{ marginRight: 10 }} onPress={() => { handleExpand() }} name={"plus"} size={24} />
                </View>
              </View>

              {loading ? (
                <ActivityIndicator size="large" color="#3498db" />
              ) : prescriptions.length > 0 ? (
                prescriptions.map((prescription) => (
                  <PillsCardComponent key={prescription.pills_id} pillId={prescription.pills_id} prescription={prescription.pills_name} isDoctor={true} btnType={1} fetchPrescriptions={fetchPrescriptions} />
                ))
              ) : (
                <Text style={styles().noPrescriptionsText}>Sem prescrições para mostrar</Text>
              )}

            </View>
          </ScrollView>
          <BottomSheet
            ref={bottomSheetRef}
            snapTo={'55%'}
            backgroundColor={'#fff'}
            backDropColor={'black'}
          >
            <PrescriptionFormComponent uid={uid} updatePillsList={fetchPrescriptions} closeForm={handleClose} />
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
  noPrescriptionsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#3498db',
  },
});

export default DoctorPillsScreen;
