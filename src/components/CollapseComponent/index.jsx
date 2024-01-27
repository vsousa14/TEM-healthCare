import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import cfg from '../../cfg.json'

const CollapseComponent = ({ dayofweek, items, isEditable, uid,dayofweeknumber }) => {
  const [expanded, setExpanded] = useState(false);
  const [meals, setMeals] = useState(null);
  let sendToBD;
  const onItemPress = () => {
    setExpanded(!expanded); 
  };

//TODO fazer algo que converta o dayofweek(string) no seu valor em numero

  useEffect(() => {
    // Pode realizar qualquer lógica necessária com os dados de "items" aqui
    if (items) {
      setMeals(items);
      //  if (meals && meals.length > 0) {
      //    console.log(dayofweek + " > DIA DA SEMANA!");
      //    console.log(meals[1]); // Acesso direto a nutr_desc
      //  }
    }
  }, [items, dayofweek, meals]);

  const updateMeal = async (newString, mealId, mealType, mealWeekday) => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/nutrition/update/${mealId}`, {
        method: 'PUT',
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64', // Substitua pelo seu token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          u_id:uid,
          nutr_desc: newString,
          mealtype: mealType,
          weekday: mealWeekday,
        }),
      });
      console.log(response.status);
      if (response.ok) {
        console.log('Meal atualizado com sucesso!');
        // Adicione qualquer lógica adicional, se necessário
      } else {
        console.error('Erro ao atualizar meal');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const createMeal = async (newString, mealType, mealWeekday, uid,index) => {
    try {
      const response = await fetch(`http://${cfg.serverIP}:3000/api/nutrition/create`, {
        method: 'POST',
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64', // Substitua pelo seu token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          u_id: uid,
          mealtype: mealType,
          weekday: mealWeekday,
          nutr_desc: newString,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("FROM RESPONSE: ",data)
        console.log('Meal adicionado com sucesso!');
        // Atualize o sinalizador de atualização para forçar o componente a renderizar novamente
        const updatedMeals = [...meals];
        updatedMeals[index] = {
          ...updatedMeals[index],
          nutr_id: data.nutr_id,
          u_id: data.u_id,
          mealtype: data.mealtype,
          weekday: data.weekday,
          nutr_desc: data.nutr_desc,
        };
        setMeals(updatedMeals);
  
        // Logue o novo valor
        console.log(updatedMeals[index]);
      } else {
        console.error('Erro ao adicionar meal');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleTextChange = (newValue, index) => {
    // Crie uma cópia do array meals
    const updatedMeals = [...meals];
    // Modifique o objeto dentro do array na cópia
    updatedMeals[index] = {
      ...updatedMeals[index],
      nutr_desc: newValue,
    };
  
    // Atualize o estado com a nova cópia
    setMeals(updatedMeals);
  
    // Logue o novo valor
    console.log(updatedMeals[index].nutr_desc);
  }


  const rotationTransform = expanded ? '90deg' : '0deg';
 
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
                onChangeText={(val) => handleTextChange(val, 0)}
                onBlur={() => {
                  if (meals && meals.length > 0 && meals[0]) {
                    if(meals[0].nutr_id){
                      const updatedString = meals[0].nutr_desc; // Pega o valor atualizado do estado
                    updateMeal(updatedString, meals[0].nutr_id, meals[0].mealtype, meals[0].weekday);
                    }else{
                      const updatedString = meals[0].nutr_desc; // Pega o valor atualizado do estado
                    createMeal(updatedString,1,dayofweeknumber,uid,0);
                    }
                    
                  }
                }}
                value={meals && meals.length > 0 && meals[0] ? meals[0].nutr_desc : ""}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>Meio da manhã</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 1)}
                onBlur={() => {
                  if (meals && meals.length > 0 && meals[1]) {
                    if(meals[1].nutr_id){
                      const updatedString = meals[1].nutr_desc; // Pega o valor atualizado do estado
                    updateMeal(updatedString, meals[1].nutr_id, meals[1].mealtype, meals[1].weekday);
                    }else{
                      const updatedString = meals[1].nutr_desc; // Pega o valor atualizado do estado
                    createMeal(updatedString,2,dayofweeknumber,uid,1);
                    }
                    
                  }
                }}
                value={meals && meals.length > 0 && meals[1] ? meals[1].nutr_desc : ""}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>Almoço</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 2)}
                onBlur={() => {
                  if (meals && meals.length > 0 && meals[2]) {
                    if(meals[2].nutr_id){
                      const updatedString = meals[2].nutr_desc; // Pega o valor atualizado do estado
                    updateMeal(updatedString, meals[2].nutr_id, meals[2].mealtype, meals[2].weekday);
                    }else{
                      const updatedString = meals[2].nutr_desc; // Pega o valor atualizado do estado
                    createMeal(updatedString,3,dayofweeknumber,uid,2);
                    }
                    
                  }
                }}
                value={meals && meals.length > 0 && meals[2] ? meals[2].nutr_desc : ""}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>1º Lanche</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 3)}
                onBlur={() => {
                  if (meals && meals.length > 0 && meals[3]) {
                    if(meals[3].nutr_id){
                      const updatedString = meals[3].nutr_desc; // Pega o valor atualizado do estado
                    updateMeal(updatedString, meals[3].nutr_id, meals[3].mealtype, meals[3].weekday);
                    }else{
                      const updatedString = meals[3].nutr_desc; // Pega o valor atualizado do estado
                    createMeal(updatedString,4,dayofweeknumber,uid,3);
                    }
                    
                  }
                }}
                value={meals && meals.length > 0 && meals[3] ? meals[3].nutr_desc : ""}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>2ª Lanche</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 4)}
                onBlur={() => {
                  if (meals && meals.length > 0 && meals[4]) {
                    if(meals[4].nutr_id){
                      const updatedString = meals[4].nutr_desc; // Pega o valor atualizado do estado
                    updateMeal(updatedString, meals[4].nutr_id, meals[4].mealtype, meals[4].weekday);
                    }else{
                      const updatedString = meals[4].nutr_desc; // Pega o valor atualizado do estado
                    createMeal(updatedString,5,dayofweeknumber,uid,4);
                    }
                    
                  }
                }}
                value={meals && meals.length > 0 && meals[4] ? meals[4].nutr_desc : ""}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>Jantar</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 5)}
                onBlur={() => {
                  if (meals && meals.length > 0 && meals[5]) {
                    if(meals[5].nutr_id){
                      const updatedString = meals[5].nutr_desc; // Pega o valor atualizado do estado
                    updateMeal(updatedString, meals[5].nutr_id, meals[5].mealtype, meals[5].weekday);
                    }else{
                      const updatedString = meals[5].nutr_desc; // Pega o valor atualizado do estado
                    createMeal(updatedString,6,dayofweeknumber,uid,5);
                    }
                    
                  }
                }}
                value={meals && meals.length > 0 && meals[5] ? meals[5].nutr_desc : ""}
                placeholder="Sem indicação"
              />
            </View>
            <View style={styles().itemContent}>
              <Text style={styles().itemTitle}>Ceia (Opcional)</Text>
              <TextInput
                onChangeText={(val) => handleTextChange(val, 6)}
                onBlur={() => {
                  if (meals && meals.length > 0 && meals[6]) {
                    if(meals[6].nutr_id){
                      const updatedString = meals[6].nutr_desc; // Pega o valor atualizado do estado
                    updateMeal(updatedString, meals[6].nutr_id, meals[6].mealtype, meals[6].weekday);
                    }else{
                      const updatedString = meals[6].nutr_desc; // Pega o valor atualizado do estado
                    createMeal(updatedString,7,dayofweeknumber,uid,6);
                    }
                    
                  }
                }}
                value={meals && meals.length > 0 && meals[6] ? meals[6].nutr_desc : ""}
                placeholder="Sem indicação"
              />
            </View>
          </>
              
          : 
                <>
                <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>Pequeno Almoço</Text>
                <Text style={styles().itemDesc}>{meals && meals.length > 0 && meals[0] ? meals[0].nutr_desc : "Sem Indicação"}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>Meio da manhã</Text>
                <Text style={styles().itemDesc}>{meals && meals.length > 0 && meals[1] ? meals[1].nutr_desc : "Sem Indicação"}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>Almoço</Text>
                <Text style={styles().itemDesc}>{meals && meals.length > 0 && meals[2] ? meals[2].nutr_desc : "Sem Indicação"}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>1º Lanche</Text>
                <Text style={styles().itemDesc}>{meals && meals.length > 0 && meals[3] ? meals[3].nutr_desc : "Sem Indicação"}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>2º Lanche</Text>
                <Text style={styles().itemDesc}>{meals && meals.length > 0 && meals[4] ? meals[4].nutr_desc : "Sem Indicação"}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>Jantar</Text>
                <Text style={styles().itemDesc}>{meals && meals.length > 0 && meals[5] ? meals[5].nutr_desc : "Sem Indicação"}</Text>
              </View>
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>Ceia (Opcional)</Text>
                <Text style={styles().itemDesc}>{meals && meals.length > 0 && meals[6] ? meals[6].nutr_desc : "Sem Indicação"}</Text>
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
