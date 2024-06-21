import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import alunos from "../components/alunos"; // Importe a lista de alunos fictícios
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  logoutButton: {
    padding: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    color: "gray",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 12,
    color: "black",
    marginBottom: 10,
    fontWeight: "bold",
  },
  fotoPerfil: {
    width: 80,
    height: 80,
    borderRadius: 50,
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: 20,
    marginTop: 20,
  },
  conteudo: {
    flex: 1,
  },
  tituloLista: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  itemLista: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  fotoAluno: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoAluno: {
    flex: 1,
  },
  nomeAluno: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    flexDirection: "row",
  },
  statusIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  SubtituloLista: {
    position: "absolute",
    top: 40,
    right: 30,
    fontWeight: "bold",
  },
  icone: {
    width: 20,
    height: 20,

    position: "absolute",
    top: 0,
    right: 0,
    left: 145,
  },
  icones: {
    width: 20,
    height: 20,

    position: "absolute",
    top: 0,
    right: 0,
    left: 170,
  },
  historicoContainer: {
    marginTop: 20,
  },
  historicoTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  rota: {
    marginBottom: 5,
  },
});

const HomeMotorista = ({ route, navigation }) => {
  const [nomeMotorista, setNomeMotorista] = useState("");
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNomeMotorista(docSnap.data().nome); // Supondo que o campo no Firestore seja 'nome'
        }
      }
    });
    return unsubscribe; // Limpa o listener quando o componente desmonta
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Deslogar o usuário do Firebase
      console.log("Logout realizado com sucesso!");
      navigation.replace("Welcome"); // Navegar para a tela de boas-vindas
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Ocorreu um erro ao fazer logout.");
    }
  };

  const historicoRotas = [
    { imagem: require("../img/tela.png") },
    { imagem: require("../img/tela.png") },
    { imagem: require("../img/tela.png") },
  ];

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Welcome")}
        >
          <Icon name="sign-out" size={0} color="rgba(34, 0, 0, 0.533333)" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out" size={30} color="rgba(34, 0, 0, 0.533333)" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Olá, {nomeMotorista}!</Text>
          <Text style={styles.subtitulo}>Veículo cadastrado: SLH2008</Text>
        </View>
        <Image
          source={require("../img/iconTeste.png")}
          style={styles.fotoPerfil}
        />
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.tituloLista}>Situação dos Alunos</Text>
        <Text style={styles.SubtituloLista}>Ida Volta</Text>
        <ScrollView>
          {alunos.map((aluno, index) => (
            <View key={index} style={styles.itemLista}>
              <Image source={aluno.foto} style={styles.fotoAluno} />
              <View style={styles.infoAluno}>
                <Text style={styles.nomeAluno}>{aluno.nome}</Text>
                <View style={styles.status}>
                  <View style={styles.statusIcon}>
                    {aluno.ida ? (
                      <Image
                        source={require("../img/iconVe.png")}
                        style={styles.icone}
                      />
                    ) : (
                      <Image
                        source={require("../img/iconVe.png")}
                        style={styles.icone}
                      />
                    )}
                  </View>
                  <View style={styles.statusIcon}>
                    {aluno.volta ? (
                      <Image
                        source={require("../img/iconX.png")}
                        style={styles.icones}
                      />
                    ) : (
                      <Image
                        source={require("../img/iconX.png")}
                        style={styles.icones}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.historicoContainer}>
            <Text style={styles.historicoTitulo}>Histórico de Rotas</Text>
            {historicoRotas.map((rota, index) => (
              <View key={index} style={styles.rota}>
                <Image source={rota.imagem} style={styles.rotaImagem} />
                <Text style={styles.rotaTexto}>{rota.data}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeMotorista;
