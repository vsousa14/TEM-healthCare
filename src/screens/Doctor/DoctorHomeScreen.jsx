// Homepage.js
import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import UserCollapseComponent from '../../components/UserCollapseComponent';

 function DoctorHomeScreen({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderComponent navigation={navigation} userType={1} />
          <ScrollView>
            <View style={styles().contentWrapper}>
              {users.map((user) => (
                <UserCollapseComponent key={user.id} username={user.username} />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}

const users = [
    {
      id:1,
      username: 'John Doe',
    },
    {
        id:2,
        username: 'João Sousa',
      },
      {
        id:3,
        username: 'Leonardo Santos',
      },
  ];

const styles = () => StyleSheet.create({
  contentWrapper:{
    width: '100%',
    marginTop:35,
    marginBottom:10,
    paddingHorizontal:10,
    //backgroundColor: 'red'
  },
})

export default DoctorHomeScreen