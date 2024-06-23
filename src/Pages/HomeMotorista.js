import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";



const HomeMotorista = ({ navigation }) => {
  const [nomeMotorista, setNomeMotorista] = useState("");
  const [vanCode, setVanCode] = useState("");
  const [alunos, setAlunos] = useState([]); 
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("vanCode do motorista:", docSnap.data().vanCode);
      
        if (docSnap.exists()) {
          setNomeMotorista(docSnap.data().displayName);
          const motoristaVanCode = docSnap.data().vanCode;
          setVanCode(motoristaVanCode); 

          if (motoristaVanCode) { // Verifica se vanCode está definido
            // Buscar alunos da van
            const alunosQuery = query(
              collection(db, "users"),
              where("vanCode", "==", motoristaVanCode.toUpperCase()),
              where("userType", "==", "aluno")
            );
            const alunosSnapshot = await getDocs(alunosQuery);
            const alunosData = alunosSnapshot.docs.map((doc) => doc.data());
            setAlunos(alunosData);
          }
        }
      }
    });
    return unsubscribe;
  }, [vanCode]);

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
          <Text style={styles.subtitulo}>Código da Van: {vanCode}</Text>
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
        {alunos.map((aluno) => ( // Exibir a lista de alunos
            <View key={aluno.uid} style={styles.itemLista}>
              {aluno.image ? ( // Renderização condicional da imagem
                <Image source={{ uri: aluno.image }} style={styles.fotoAluno} />
              ) : (
                <Image source={require('../img/unnamed.png')} style={styles.fotoAluno} /> // Imagem padrão
              )}
              <View style={styles.infoAluno}>
                <Text style={styles.nomeAluno}>{aluno.displayName}</Text>
                <View style={styles.status}>
                <View style={styles.statusIcon}>
                    <Icon 
                      name={aluno.ida === 'confirmado' ? 'check-circle' : aluno.ida === 'atrasado' ? 'hand-paper-o' : 'times-circle'} 
                      size={24} 
                      color={aluno.ida === 'confirmado' ? 'green' : aluno.ida === 'atrasado' ? 'orange' : 'red'} 
                    />
                  </View>
                  <View style={styles.statusIcon}>
                    <Icon
                      name={aluno.volta === 'confirmado' ? 'check-circle' : aluno.volta === 'atrasadovolta' ? 'hand-paper-o' : 'times-circle'}
                      size={24}
                      color={aluno.volta === 'confirmado' ? 'green' : aluno.volta === 'atrasadovolta' ? 'orange' : 'red'}
                    />
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

export default HomeMotorista;
