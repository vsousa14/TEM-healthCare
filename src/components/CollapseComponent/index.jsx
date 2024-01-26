import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import FontAwessome from '@expo/vector-icons/FontAwesome';

const CollapseComponent = ({ dayofweek, items, isEditable }) => {
 
  const [expanded, setExpanded] = useState(false);
  let sendToBD;
  const onItemPress = () => {
    setExpanded(!expanded);
  };

  const [mealTypes, setMealTypes] = useState({
    palmoco: items[0].palmoco,
    mmanha: items[0].mmanha,
    almoco: items[0].almoco,
    lanche1: items[0].lanche1,
    lanche2: items[0].lanche2,
    jantar: items[0].jantar,
    ceia: items[0].ceia,
  });
  // Adicione estados semelhantes para outros tipos de refeição...

  useEffect(() => {
    // Atualiza os estados locais quando os itens mudam
    setMealTypes({
      palmoco: items[0].palmoco,
      mmanha: items[0].mmanha,
      almoco: items[0].almoco,
      lanche1: items[0].lanche1,
      lanche2: items[0].lanche2,
      jantar: items[0].jantar,
      ceia: items[0].ceia,
    });
  }, [items]);

  const handleTextChange = (val, type) => {
    switch (type) {
      case 'palmoco':
        sendToBD = val;
        //TODO no onBlur usar o valor da variavel sendToDB e dar reset do valor
        setMealTypes((prevMealTypes) => ({ ...prevMealTypes, palmoco: val }));
        break;
      case 'mmanha':
        setMealTypes((prevMealTypes) => ({ ...prevMealTypes, mmanha: val }));
        break;
      case 'almoco':
        setMealTypes((prevMealTypes) => ({ ...prevMealTypes, almoco: val }));
        break;
      case 'lanche1':
        setMealTypes((prevMealTypes) => ({ ...prevMealTypes, lanche1: val }));
        break;
      case 'lanche2':
        setMealTypes((prevMealTypes) => ({ ...prevMealTypes, lanche2: val }));
        break;
      case 'jantar':
        setMealTypes((prevMealTypes) => ({ ...prevMealTypes, jantar: val }));
        break;
      case 'ceia':
        setMealTypes((prevMealTypes) => ({ ...prevMealTypes, ceia: val }));
        break;
      default:
        break;
    }
  };

  const handleOnBlur = () => {
    //TODO quando o input perder o focus, enviar os dados para o backend
  }

  //TODO fazer states para todos os tipos de meal para poder salvar os valores ao editar

  const rotationTransform = expanded ? '90deg' : '0deg';
 //TODO: Colocar isto menos dinamico, em vez de ter uma flatlist que dinamicamente coloca o mealtype e desc, a unica coisa que passa a ser
 //TODO: dinamico é a descrição
  return (
    <View style={styles().collapseContainer}>
      <View style={styles().collapseWrapper}>
        <TouchableWithoutFeedback onPress={onItemPress}>
          <View style={styles().collapseTitleWrapper}>
            <Text style={styles().collapseTitle}>{dayofweek}</Text>
            <FontAwessome
              name="chevron-right"
              style={{ transform: [{ rotate: rotationTransform }] }}
              size={16}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {expanded && (
        
        <View style={styles().collapseInnerContent}>
          {isEditable ? 
         <>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>Pequeno Almoço</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 'palmoco')}
                onBlur={() => {handleOnBlur()}}
                value={mealTypes.palmoco}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>Meio da manhã</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 'mmanha')}
                onBlur={() => {handleOnBlur()}}
                value={mealTypes.mmanha}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>Almoço</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 'almoco')}
                onBlur={() => {handleOnBlur()}}
                value={mealTypes.almoco}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>1º Lanche</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 'lanche1')}
                onBlur={() => {handleOnBlur()}}
                value={mealTypes.lanche1}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>2ª Lanche</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 'lanche2')}
                onBlur={() => {handleOnBlur()}}
                value={mealTypes.lanche2}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>Jantar</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 'jantar')}
                onBlur={() => {handleOnBlur()}}
                value={mealTypes.jantar}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>Ceia (Opcional)</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 'ceia')}
                onBlur={() => {handleOnBlur()}}
                value={mealTypes.ceia}
                placeholder="Sem indicação"
              />
            </View>
          </>
              
          : 
                <>
                <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>Pequeno Almoço</Text>
                <Text style={styles().itemDesc}>{items[0].palmoco}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>Meio da manhã</Text>
                <Text style={styles().itemDesc}>{items[0].mmanha}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>Almoço</Text>
                <Text style={styles().itemDesc}>{items[0].almoco}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>1º Lanche</Text>
                <Text style={styles().itemDesc}>{items[0].lanche1}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>2º Lanche</Text>
                <Text style={styles().itemDesc}>{items[0].lanche2}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>Jantar</Text>
                <Text style={styles().itemDesc}>{items[0].jantar}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>Ceia (Opcional)</Text>
                <Text style={styles().itemDesc}>{items[0].ceia}</Text>
              </View>
                </>
          }
              
              
        </View>
      )}
    </View>
  );
};

CollapseComponent.defaultProps = {
  dayofweek: '',
  items: [],
  isEditable: false
};

const styles = () =>
  StyleSheet.create({
    collapseContainer: {
      marginVertical: 8,
    },
    collapseWrapper: {
      backgroundColor: '#025688',
      height: 45,
      borderRadius: 6,
    },
    collapseTitleWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      paddingHorizontal: 10,
    },
    collapseTitle: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    collapseInnerContent: {
      backgroundColor: '#ffffff',
      marginVertical: 3,
      paddingVertical: 10,
      paddingHorizontal: 8,
      borderRadius: 6,
    },
    itemContent: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginVertical: 5,
    },
    itemTitle: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    itemDesc: {
      fontSize: 14,
    },
  });

export default CollapseComponent;
