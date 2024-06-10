import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { auth, db } from "../Database/firebaseConfig";
import { setDoc, doc } from "firebase/firestore"; 
import van from '../assets/van.jpg';
import { RadioButton } from "react-native-paper";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [vanCode, setVanCode] = useState("");
  const [selectedUserType, setSelectedUserType] = useState(null); // Add state for userType

  const handleSignup = async () => {
    if (!selectedUserType) {
      Alert.alert("Erro", "Por favor, selecione o tipo de usuário.");
      return; // Prevent signup if userType is not selected
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        displayName: name,
        vanCode: vanCode,
        uid: user.uid,
        userType: selectedUserType,
      });

      console.log("User information saved!");
      // Navigate to the appropriate screen based on userType
      if (selectedUserType === 'aluno') {
        navigation.replace('HomeAluno', { studentData: { uid: user.uid } });
      } else if (selectedUserType === 'motorista') {
        navigation.replace('HomeMotorista', { driverData: { uid: user.uid }}); // Add relevant driver data
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during signup:", errorMessage);
      Alert.alert("Erro", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={van} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Faça seu cadastro!</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder={"Digite seu nome"}
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={"Digite seu e-mail"}
        style={styles.input}
      />
      <TextInput
        value={vanCode}
        onChangeText={(text) => setVanCode(text)}
        placeholder={"Código da Van"}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={"Digite sua senha"}
        secureTextEntry={true}
        style={styles.input}
      />
      {/* User Type Selection (with RadioButton) */}
      <View style={styles.userTypeContainer}>
        <Text style={styles.label}>Tipo de Usuário:</Text>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="aluno"
            status={selectedUserType === 'aluno' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedUserType('aluno')}
          />
          <Text>Aluno</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="motorista"
            status={selectedUserType === 'motorista' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedUserType('motorista')}
          />
          <Text>Motorista</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Feito</Text>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>Ou</Text>
        <View style={styles.separatorLine} />
      </View>
      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
        <Text style={styles.socialButtonText}>Entre com o Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
        <Text style={styles.socialButtonText}>Entre com o Google</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Já possui uma conta? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Faça seu login</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  logo: {
    width: '50%',
    height: 110,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 10,
    fontSize: 12,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: "#FFDE59",
    padding: 10,
    borderRadius: 9,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    border: '1px solid',
  },
  buttonText: {
    color: "black",
    fontSize: 18,
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
  separatorText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  socialButton: {
    padding: 10,
    borderRadius: 9,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    border: '1px solid',
  },
  facebookButton: {
    backgroundColor: "#3b5998",
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
  socialButtonText: {
    color: "white",
    fontSize: 16,
  },
  loginText: {
    fontSize: 14,
    color: "#333",
  },
  loginLink: {
    fontWeight: "bold",
  },
  userTypeContainer: {
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default Signup;
