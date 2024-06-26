import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db , storage} from '../Database/firebaseConfig'; 
import {
  getFirestore,
  doc,
  getDoc,
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import iconTeste from "../img/iconTeste.png";
import unnamed from '../img/unnamed.png';
import { auth } from '../Database/firebaseConfig';
import profilealuno from "../img/profilealuno.png";

const HomeMotorista = ({ navigation }) => {
  const [nomeMotorista, setNomeMotorista] = useState("");
  const [vanCode, setVanCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true); // Estado para carregamento da imagem
  const [alunos, setAlunos] = useState([]); 
  const [motorista, setMotorista] = useState(null);
  const [image, setImage] = useState(""); // Estado para a imagem
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    let unsubscribeAuth;
    let unsubscribeSnapshot;
  
    const fetchMotoristaData = async () => {
      setLoading(true);
      setLoadingImage(true); // Inicia o carregamento da imagem
    try{
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("vanCode do motorista:", docSnap.data().vanCode);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setMotorista(userData);
          setNomeMotorista(docSnap.data().displayName);
          const motoristaVanCode = docSnap.data().vanCode.toUpperCase();
          setVanCode(motoristaVanCode);
          // Busca a URL da imagem do Storage apenas se existir
          if (userData.image) { 
            try {
              const imageRef = ref(storage, userData.image); 
              const imageUrl = await getDownloadURL(imageRef);
              console.log("Imagem carregada:", imageUrl); // Adicione este log
              setImage(imageUrl);
            } catch (error) {
              console.error("Erro ao buscar imagem do Storage:", error);
              setImage(profilealuno); // Imagem padrão em caso de erro
            }
          } else {
            setImage(profilealuno); // Define a imagem padrão se não existir
          }
  
          // Busca alunos da van apenas se o vanCode for válido
          if (motoristaVanCode) {
            const alunosQuery = query(
              collection(db, "users"),
              where("vanCode", "==", motoristaVanCode),
              where("userType", "==", "aluno")
            );
  
            unsubscribeSnapshot = onSnapshot(alunosQuery, (querySnapshot) => {
              const alunosData = querySnapshot.docs.map((doc) => doc.data());
              setAlunos(alunosData);
            });
          }
        }
      
      }
    }catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Erro", "Erro ao buscar dados do usuário.");
    } finally {
      setLoading(false); // Finaliza o carregamento dos dados do usuário
    }
    };
  
    unsubscribeAuth = onAuthStateChanged(auth, fetchMotoristaData);
  
    return () => {
      unsubscribeAuth && unsubscribeAuth(); // Cancela a assinatura do auth
      unsubscribeSnapshot && unsubscribeSnapshot(); // Cancela a assinatura do snapshot
    };
  }, []); // Sem dependências para garantir que execute apenas uma vez ao montar
  

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
    { imagem: require("../img/mapsvan.png") },
    { imagem: require("../img/mapsvan.png") },
    { imagem: require("../img/mapsvan.png") },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
      <View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="sign-out" size={30} color="rgba(34, 0, 0, 0.533333)" />
          </TouchableOpacity>
        </View>


      <View style={styles.header}>
      {loading ? (
            <Text>Carregando...</Text>
          ) : motorista ? (
            <>
              <View>
              <Text style={styles.titulo}>Olá, {nomeMotorista}!</Text>
              <Text style={styles.subtitulo}>Código da Van: {vanCode}</Text>
            </View>
            {motorista.image ? (
                <Image
                  source={{ uri: motorista.image }}
                  style={styles.profilePic}
                  onLoadEnd={() => setLoadingImage(false)}
                  onError={(error) => {
                    console.error(
                      "Erro ao carregar a imagem:",
                      error.nativeEvent.error
                    );
                    setLoadingImage(false);
                  }}
                />
              ) : (
                <Image source={unnamed} style={styles.profilePic} /> // Imagem padrão se não houver imagem
              )}
            </>
          ): (
            <Text>Erro ao carregar os dados do aluno.</Text>
          )}
          </View>
        
        <Text style={styles.tituloLista}>Situação dos Alunos</Text>
        <Text style={styles.SubtituloLista}>Ida  Volta</Text>
        {alunos.map((aluno) => ( // Exibir a lista de alunos
        <View style={styles.conteudo}>
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
            </View>
          ))}
          <View style={styles.historicoContainer}>
            <Text style={styles.historicoTitulo}>Histórico de Rotas</Text>
            {historicoRotas.map((rota, index) => (
              <View style={styles.conteudo}>
              <View key={index} style={styles.rota}>
                <Image source={rota.imagem} style={styles.rotaImagem} />
                <Text style={styles.rotaTexto}>{rota.data}</Text>
              </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.tabBar}>
      {/* ... (seus botões existentes para mapa e home) */}
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('LocationScreen')}>
        <View style={styles.tabButton}>
          <Icon name="map-pin" size={24} color="#000" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.highlightedTabButton}>
        <Icon name="home" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('GerenciarAlunos')}>
        <Icon name="users" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ConfigProfileMotorista')}>
        <Icon name="cog" size={24} color="#000" />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoutButton: {
    padding: 10,
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 50,
    fontWeight: "bold",
    color: "rgba(34, 0, 0, 0.533333)",
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#A0A0A0",
    marginLeft: 5,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderColor: "#FFDE59",
    borderWidth: 5,
    marginRight: 5,
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tituloLista: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#595D60",
  },
  SubtituloLista: {
    fontSize: 15,
    color: "#595D60",
    fontWeight: "bold",
    marginBottom: 10,
    marginRight: 15,
    alignSelf: "flex-end",
  },
  itemLista: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#F9F9F9",
  },
  fotoAluno: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: "#FFDE59",
    borderWidth: 2,
    marginRight: 15,
  },
  infoAluno: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nomeAluno: {
    fontSize: 20,
    color: "#4C4C4C",
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  icone: {
    marginRight: 5,
  },
  historicoContainer: {
    marginTop: 20,
  },
  historicoTitulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#595D60",
  },
  rota: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderColor: "#595D60",
    borderWidth: 2,
    borderRadius: 10,
  },
  rotaImagem: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  rotaTexto: {
    fontSize: 14,
    color: "#4C4C4C",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 59,
    backgroundColor: "#D9D9D9",
    borderTopColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightedTabButton: {
    width: 85,
    height: 70,
    top: -15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default HomeMotorista;
