import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const users = [
  { name: 'Tatiana dos Santos', imageUrl: 'https://via.placeholder.com/100', schedule: ['Noite', 'Ida e Volta', 'Seg/Qua/Qui'] },
  { name: 'Valéria Almeida', imageUrl: 'https://via.placeholder.com/100', schedule: ['Noite', 'Somente Volta', 'Seg/Ter/Qui'] },
  { name: 'Giovanna Marinho', imageUrl: 'https://via.placeholder.com/100', schedule: ['Noite', 'Ida e Volta', 'Seg/Qui/Sex'] },
  { name: 'Oliver Germano', imageUrl: 'https://via.placeholder.com/100', schedule: ['Noite', 'Somente Volta', 'Seg/Qui'] },
  { name: 'Ronielson da Silva', imageUrl: 'https://via.placeholder.com/100', schedule: ['Manhã', 'Ida e Volta', 'Seg/Ter/Qua/Qui/Sex'] },
  { name: 'Mariana Alves', imageUrl: 'https://via.placeholder.com/100', schedule: ['Manhã', 'Ida e Volta', 'Seg/Ter/Qua'] },
];

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {users.map((user, index) => (
        <View key={index} style={styles.user}>
          <View style={styles.userImage}>
            <Image source={{ uri: user.imageUrl }} style={styles.image} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            {user.schedule.map((item, i) => (
              <Text key={i} style={styles.userLabel}>{item}</Text>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  userImage: {
    marginRight: 10,
    padding: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    color: '#808080',
    marginBottom: 5,
  },
  userLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ff0',
    marginBottom: 5,
  },
});
