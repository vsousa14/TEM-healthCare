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
        <CollapseComponent dayofweek={"Terça-Feira"} items={itemsPlan} isEditable={true}/>
        <CollapseComponent dayofweek={"Quarta-Feira"} items={itemsPlan} isEditable={true}/>
        <CollapseComponent dayofweek={"Quinta-Feira"} items={itemsPlan} isEditable={true}/>
        <CollapseComponent dayofweek={"Sexta-Feira"} items={itemsPlan} isEditable={true}/>
        <CollapseComponent dayofweek={"Sábado"} items={itemsPlan} isEditable={true}/>
        <CollapseComponent dayofweek={"Domingo"} items={itemsPlan} isEditable={true}/>
        </ScrollView>
        
      </View>
    </SafeAreaView>
  );
}

const itemsPlan =  [
    {
    palmoco: '1 iogurte magro sem açucar + 4 colheres de sopa de cereais sem açucar +1 colher de chá de sementes de linhaça + uma maça fatiada',
    mmanha: '1 cenoura crua + 2 bolachas de arroz',
    almoco: 'Sopa sem batata + 1 posta de maruca a vapor com couve cozida + 2 batatas cozidas + 1 ovo',
    lanche1: '1 Laranja',
    lanche2: '2 fatias de queijo magro + 5 tomates cherry + 1 colher de chá de sementes de chia',
    jantar: '1 bife de peru grelhado com espinafres cozidos',
    ceia: '1 copo de leite magro',
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
