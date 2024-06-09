import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EmailConfirmationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Logo mais você receberá as informações no seu e-mail para a recuperação da sua conta do VanComigo!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login', { userType: 'aluno' })}>
        <Text style={styles.buttonText}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFDE59',
    padding: 10,
    borderRadius: 9,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    border: '1px solid',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
});

export default EmailConfirmationScreen;
