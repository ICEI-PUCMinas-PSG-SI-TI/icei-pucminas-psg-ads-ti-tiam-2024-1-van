// Importações do React e React Native
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import van from '../assets/van.jpg'
import { auth, db } from '../Database/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Definição do componente LoginScreen
const LoginScreen = ({ route, navigation }) => {
  const { userType } = route.params; // Extração segura do userType do objeto route

  // Uso do Hook useState para gerenciar o estado local
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controlar a barra de carregamento

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in, check userType and navigate
        handleNavigationAfterLogin(user);
      }
    });

    return unsubscribe; // Clean up the listener
  }, []);

  // Função para lidar com o processo de login
  const handleLogin = async () => {
    setLoading(true); // Mostra a barra de carregamento
    try {
      console.log(email, password); // Add this line for debugging
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
     

      // Handle navigation based on user type
      handleNavigationAfterLogin(user);

    } catch (error) {
      // Handle errors here (e.g., invalid email/password, etc.)
      console.error("Error during login:", error.message);
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false); // Esconde a barra de carregamento, independentemente do resultado
    }
  };


  const handleNavigationAfterLogin = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
      if (!userData.userType) { // Check if userType is defined
        console.error('userType not found in user document');
        throw new Error('Tipo de usuário não encontrado.');
      } else if (userData.userType === 'aluno') {
        navigation.replace('HomeAluno', { studentData: userData });
      } else if (userData.userType === 'motorista') {
        navigation.replace('HomeMotorista', { driverData: userData });
      } else {
        console.error('Unknown user type:', userData.userType);
        throw new Error('Tipo de usuário desconhecido.');
      }
      } else {
        console.log("User document not found.");
        // Handle the case where the user document doesn't exist
        Alert.alert("Erro", "Documento de usuário não encontrado.");
      }
    } catch (error) {
      console.error("Error handling navigation:", error.message);
      Alert.alert("Erro", "Ocorreu um erro durante o login.");
    }
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
      
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}> 
          {loading ? ( // Renderiza a barra de carregamento se loading for true
            <ActivityIndicator size="small" color="#fff" /> 
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        {loading && ( // Renderiza o texto "Autenticando..." se loading for true
          <Text style={styles.loadingText}>Autenticando...</Text>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen', { userType: userType })}
          >
        <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
          </TouchableOpacity>
        <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}> Ou </Text>
        <View style={styles.separatorLine} />
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
    paddingRight: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
  formContainer: {
    width: '80%',
    padding: 20,
  },
  logo: {
    width: '110%',
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
    width: '110%',
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
    width: '110%',

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
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  facebookButton: {
    backgroundColor: '#3B5998',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '110%',
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
    width: '110%',
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
    width: '110%',

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
