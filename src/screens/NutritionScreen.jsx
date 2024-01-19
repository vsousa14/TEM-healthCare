import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
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

        <FlatList
          data={nutritionplan}
          keyExtractor={(item) => item.dayofweek}
          renderItem={({ item }) => (
            <CollapseComponent dayofweek={item.dayofweek} items={item.items} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const nutritionplan = [
  {
    dayofweek: 'Segunda-Feira',
    items: [
        {
        id: 1,
        title: 'Pequeno Almoço',
        desc: 'Alguma coisa para comer bla bla bla',
        }
    ]
  },
  {
    dayofweek: 'Terça-Feira',
    items: [
        {
        id: 1,
        title: 'Pequeno Almoço',
        desc: 'Alguma coisa para comer bla bla bla',
        }
    ]
  },
];

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
