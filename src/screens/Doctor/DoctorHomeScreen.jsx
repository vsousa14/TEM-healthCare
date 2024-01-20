
import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import UserCollapseComponent from '../../components/UserCollapseComponent';

 function DoctorHomeScreen({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderComponent navigation={navigation} userType={1} userId="0"/>
          <ScrollView>
            <View style={styles().contentWrapper}>
              {users.map((user) => (
                <UserCollapseComponent key={user.id} navigation={navigation} username={user.username} />
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