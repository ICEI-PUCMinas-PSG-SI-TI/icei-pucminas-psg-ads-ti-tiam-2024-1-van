import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";
import { auth, db } from "../Database/firebaseConfig";
import { setDoc, doc } from "firebase/firestore"; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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
      <Text style={styles.title}>Cadastre-se</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder={"Digite seu Nome"}
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={"Digite seu Email"}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={"Digite sua Senha"}
        secureTextEntry={true}
        style={styles.input}
      />
      <TextInput
        value={phone}
        onChangeText={(text) => setPhone(text)}
        placeholder={"Digite seu número de celular"}
        style={styles.input}
      />
      <Button title={"Cadastrar"} onPress={handleSignup} color="#841584" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
  },
});

export default Signup;
