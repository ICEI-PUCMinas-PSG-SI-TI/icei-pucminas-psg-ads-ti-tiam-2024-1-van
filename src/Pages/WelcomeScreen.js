import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import van from '../assets/van.jpg'

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={van}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Bem-vindo!</Text>
      <Text style={styles.welcomeText2}>Selecione sua opção para usar o VanComigo</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { userType: 'aluno' })}
      >
        <Text style={styles.buttonText}>Aluno</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { userType: 'motorista' })}
      >
        <Text style={styles.buttonText}>Motorista</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile', { userType: 'motorista' })}
      >
        <Text style={styles.buttonText}>Editar Perfil Aluno</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
  },
    welcomeText2: {
    fontSize: 14,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFDE59',
    padding: 10,
    borderRadius: 9,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
    border: '1px solid'
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  }
});

export default WelcomeScreen;

