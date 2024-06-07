// Importações do React e React Native
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import van from '../assets/van.jpg'

// Definição do componente LoginScreen
const LoginScreen = ({ route, navigation }) => {
  const { userType } = route.params; // Extração segura do userType do objeto route

  // Uso do Hook useState para gerenciar o estado local
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Função para lidar com o processo de login
  const handleLogin = () => {
    // Aqui você adicionaria a lógica para lidar com o login
    console.log('Iniciar processo de autenticação');
  };

  // Layout do componente
  return (

    
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Image
          source={van}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu e-mail"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Digite sua senha"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color="grey"
            />
          </TouchableOpacity>
        </View>
        
        {/* Adicionando a opção Me mantenha conectado 
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setStayConnected(!stayConnected)}
                >
                    <Icon
                        name={stayConnected ? 'check-square' : 'square-o'}
                        size={24}
                        color="grey"
                    />
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Me mantenha conectado</Text>
            </View>
            */}
      
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen', { userType: userType })}
          >
        <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
          </TouchableOpacity>
        <View style={styles.orContainer}>
          <Text style={styles.orText}>Ou</Text>
        </View>
        <TouchableOpacity style={styles.facebookButton}>
          <Text style={styles.facebookButtonText}>Entre com o Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Entre com o Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton}
        onPress={() => navigation.navigate('Signup', { userType: userType })}>
          <Text style={styles.registerButtonText}>
            Não é cadastrado? Faça seu cadastro
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos para o componente
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
    height: 110, // Defina a altura conforme necessário
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 9,
    paddingHorizontal: 10,
    fontSize: 13,
    marginBottom: 20,
    width: '110%'
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 9,
    position: 'relative',
    marginBottom: 20,
    width: '110%'
  },
  passwordInput: {
    height: 40,
    fontSize: 13,
    flex: 1,
    paddingLeft: 10, // Ajuste conforme necessário para o texto não sobrepor o ícone
    paddingRight: 30, // Espaço para o ícone
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center', // Centraliza o ícone verticalmente
    paddingHorizontal: 10, // Espaço tocável ao redor do ícone
    color: 'black'
  },

  button: {
    backgroundColor: '#FFDE59',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: 'red', // Define a cor do texto para vermelho
    fontSize: 13, // Tamanho do texto
    textAlign: 'center', // Alinha o texto ao centro
    marginTop:6,
    marginBottom: 0, // Margem na parte inferior para separar do texto "Ou"
  },
  orContainer: {
     marginTop: 10, // Ajuste conforme necessário para espaçamento
    marginBottom: 10,
    alignItems: 'center',
  },
  orText: {
    fontSize: 13,
    color: '#333',
  },
  facebookButton: {
    backgroundColor: '#3B5998',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  facebookButtonText: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#DD4B39',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  googleButtonText: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
  registerButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  registerButtonText: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// Exportação do componente para uso em outras partes do aplicativo
export default LoginScreen;
