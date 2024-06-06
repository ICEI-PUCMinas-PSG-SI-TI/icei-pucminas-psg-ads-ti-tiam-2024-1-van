import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { auth, db } from "../Database/firebaseConfig";
import { setDoc, doc } from "firebase/firestore"; 
import van from '../assets/van.jpg';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [vanCode, setVanCode] = useState("");

  const handleSignup = async () => { 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        displayName: name,
        phoneNumber: phone,
        uid: user.uid, 
      });

      console.log("User information saved!");
      // Potentially navigate to another screen or show a success message
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during signup:", errorMessage);
      // Show an error alert to the user
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
});

export default Signup;
