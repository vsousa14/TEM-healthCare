import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import UserCollapseComponent from '../../components/UserCollapseComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cfg from '../../cfg.json'

function DoctorHomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para fazer o pedido dos usuários
    const fetchUsers = async () => {
      try {
        const authKey = await AsyncStorage.getItem('token');
        const response = await fetch(`http://${cfg.serverIP}:3000/api/users/getall`, {
          method: "GET",
          headers: {
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMSwiaWF0IjoxNzA2MjgyMTkyfQ.pbn_XI-37BJtXgf-ovLo9AYniQLqH6HTbuldgT44j64',
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUsers(userData);
        } else {
          console.error('Erro ao obter usuários');
        }
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      } finally {
        // Atualiza o estado de loading, independentemente do resultado
        setLoading(false);
      }
    };

    // Chama a função para buscar os usuários
    fetchUsers();
  }, []); // O array vazio assegura que o pedido seja feito apenas uma vez durante o ciclo de vida do componente

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter(user => user.u_nome.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent navigation={navigation} userType={1} userId="0" onSearch={handleSearch} />
      <ScrollView>
        <View style={styles().contentWrapper}>
          {loading ? (
            <ActivityIndicator size="large" color="#3498db" />
          ) : users.length > 0 ? (
            filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserCollapseComponent key={user.u_id} navigation={navigation} user_id={user.u_id} username={user.u_nome} />
              ))
            ) : (
              <Text style={styles().noUsersText}>Nenhum usuário encontrado</Text>
            )
          ) : (
            <Text style={styles().noUsersText}>Sem pacientes para mostrar</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = () =>
  StyleSheet.create({
    contentWrapper: {
      width: '100%',
      marginTop: 35,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    noUsersText: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
      color: '#3498db',
    },
  });

export default DoctorHomeScreen;