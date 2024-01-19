import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import FontAwessome from '@expo/vector-icons/FontAwesome';

const CollapseComponent = ({ dayofweek, items }) => {
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
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles().itemContent}>
                <Text style={styles().itemTitle}>{item.title}</Text>
                <Text style={styles().itemDesc}>{item.desc}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

CollapseComponent.defaultProps = {
  dayofweek: '',
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
