// Importações do React e React Native
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import van from '../assets/van.jpg';
import LoginScreen from './LoginScreen';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    console.log('Iniciar processo de recuperação de senha');
    navigation.navigate('EmailConfirmationScreen');

  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Image
          source={van}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.label}>Insira seu e-mail para recuperar sua senha do VanComigo</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '80%',
    padding: 20,
  },
  logo: {
    width: '100%',
    height: 110, 
  },
  label: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    paddingTop: 50,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 9,
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 9,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    border: '1px solid'
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  }
});

export default ForgotPasswordScreen;
