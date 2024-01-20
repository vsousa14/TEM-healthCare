import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet } from 'react-native';
import FontAwessome from '@expo/vector-icons/FontAwesome';
import ButtonComponent from '../buttonComponent';

const UserCollapseComponent = ({ navigation, username }) => {
  const [expanded, setExpanded] = useState(false);
  const onItemPress = () => {
    setExpanded(!expanded);
  };

  const rotationTransform = expanded ? '90deg' : '0deg';

  return (
    <View style={styles().collapseContainer}>
      <View style={styles().collapseWrapper}>
        <TouchableWithoutFeedback onPress={onItemPress}>
          <View style={styles().collapseTitleWrapper}>
            <Text style={styles().collapseTitle}>{username}</Text>
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
          <ButtonComponent icon={"file"} size={46} navigation={navigation} pageToNavigate={"DoctorExamScreen"}/>
          {/* <ButtonComponent icon={"history"} size={46}/> */}
          <ButtonComponent icon={"table"} size={46} navigation={navigation} pageToNavigate={"DoctorPressionScreen"}/>
          <ButtonComponent icon={"medkit"} size={46} navigation={navigation} pageToNavigate={"DoctorPillsScreen"}/>
          <ButtonComponent icon={"cutlery"} size={46}/>
          <ButtonComponent icon={"trophy"} size={46} navigation={navigation} pageToNavigate={"DoctorObjectivesScreen"}/>
        </View>
      )}
    </View>
  );
};

UserCollapseComponent.defaultProps = {

};

const styles = () =>
  StyleSheet.create({
    collapseContainer: {
      marginVertical: 8,
    },
    collapseWrapper: {
      backgroundColor: '#fff',
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
      flexDirection:'row',
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

export default UserCollapseComponent;
