import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, ScrollView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import CollapseComponent from '../components/CollapseComponent';

function NutritionScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent navigation={navigation} />

      <View style={styles().contentWrapper}>
        <View style={styles().titleWrapper}>
          <FontAwessome
            style={{ marginRight: 10 }}
            onPress={() => {
              navigation.goBack();
            }}
            name={"chevron-left"}
            size={24}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nutrição</Text>
        </View>

        <ScrollView>
        <CollapseComponent dayofweek={"Segunda-Feira"} items={itemsPlan} isEditable={true}/>
        </ScrollView>
        
      </View>
    </SafeAreaView>
  );
}

const itemsPlan =  [
    {
    palmoco: 'Alguma coisa para comer bla bla bla',
    mmanha: 'Alguma coisa para comer bla bla bla',
    almoco: 'Alguma coisa para comer bla bla bla',
    lanche1: 'Alguma coisa para comer bla bla bla',
    lanche2: 'Alguma coisa para comer bla bla bla',
    jantar: 'Alguma coisa para comer bla bla bla',
    ceia: 'Alguma coisa para comer bla bla bla',
    }
]

const styles = () =>
  StyleSheet.create({
    contentWrapper: {
      flex: 1,
      width: '100%',
      marginTop: 20,
      paddingHorizontal: 10,
    },
    titleWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: 10,
      marginVertical: 10,
    },
  });

export default NutritionScreen;
