import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth } from "../Database/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../Database/firebaseConfig";
import unnamed from "../img/unnamed.png";
import mapsvan from "../img/mapsvan.png";
import { signOut } from "firebase/auth";
import profilealuno from "../img/profilealuno.png";

const HomeAluno = ({ route, navigation }) => {
  const { studentData } = route.params;
  const [estudante, setEstudante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusIda, setStatusIda] = useState("");
  const [statusVolta, setStatusVolta] = useState("");
  const [image, setImage] = useState(""); // Estado para a imagem
  const [loadingImage, setLoadingImage] = useState(true); // Estado para carregamento da imagem

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setLoadingImage(true); // Inicia o carregamento da imagem

      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setEstudante(userData);

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
          } else {
            console.warn("Documento do usuário não encontrado.");
          }
        } else {
          navigation.replace("Login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Erro", "Erro ao buscar dados do usuário.");
      } finally {
        setLoading(false); // Finaliza o carregamento dos dados do usuário
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      fetchUserData(); // Recarrega os dados ao focar na tela
    });

    return unsubscribe; // Limpa o listener ao desmontar o componente
  }, [navigation]); // Adiciona navigation como dependência

  const handleStatusUpdate = async (type, status) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        // Atualiza o status no Firestore
        await updateDoc(userDocRef, {
          [type]: status, // Atualiza o campo 'ida' ou 'volta' dinamicamente
        });

        // Atualiza o estado local (opcional, mas recomendado para consistência da UI)
        if (type === "ida") {
          setStatusIda(status);
        } else if (type === "volta") {
          setStatusVolta(status);
        }
        console.log(`Atualização de status: ${type} - ${status}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      Alert.alert("Erro", "Ocorreu um erro ao atualizar seu status.");
    }
  };

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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="sign-out" size={30} color="rgba(34, 0, 0, 0.533333)" />
          </TouchableOpacity>
        </View>
        {/* Renderização Condicional da Imagem e Indicador de Carregamento */}
        <View style={styles.header}>
          {loading ? (
            <Text>Carregando...</Text>
          ) : estudante ? (
            <>
              {estudante.image ? (
                <Image
                  source={{ uri: estudante.image }}
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
              <View style={styles.textContainer}>
                <Text style={styles.greeting}>
                  Olá, {estudante?.displayName}
                </Text>
              </View>
            </>
          ) : (
            <Text>Erro ao carregar os dados do aluno.</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.mapContainer}
          onPress={() => navigation.navigate("AlunoLocationScreen")}
        >
          <Image source={mapsvan} style={styles.map} />
        </TouchableOpacity>

        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Atualize sua situação</Text>
          <View style={styles.buttonContainer1}>
            <View style={styles.statusButtons}>
              <Text style={styles.statusType}>Situação da ida</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    statusIda === "confirmado" && styles.selectedButton,
                  ]}
                  onPress={() => handleStatusUpdate("ida", "confirmado")}
                >
                  <Text style={styles.buttonText}>✅</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    statusIda === "naovai" && styles.selectedButton,
                  ]}
                  onPress={() => handleStatusUpdate("ida", "naovai")}
                >
                  <Text style={styles.buttonText}>❌</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    statusIda === "atrasado" && styles.selectedButton,
                  ]}
                  onPress={() => handleStatusUpdate("ida", "atrasado")}
                >
                  <Text style={styles.buttonText}>✋</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Text style={styles.statusType}>Situação da volta</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.button,
                  statusVolta === "confirmado" && styles.selectedButton,
                ]}
                onPress={() => handleStatusUpdate("volta", "confirmado")}
              >
                <Text style={styles.buttonText}>✅</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  statusVolta === "naovolta" && styles.selectedButton,
                ]}
                onPress={() => handleStatusUpdate("volta", "naovolta")}
              >
                <Text style={styles.buttonText}>❌</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  statusVolta === "atrasadovolta" && styles.selectedButton,
                ]}
                onPress={() => handleStatusUpdate("volta", "atrasadovolta")}
              >
                <Text style={styles.buttonText}>✋</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("AlunoLocationScreen")}
        >
          <View style={styles.tabButton}>
            <Icon name="map-pin" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.highlightedTabButton}>
          <Icon name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
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
  scrollContainer: {
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: "#FFDE59",
    borderWidth: 5,
    marginRight: 5,
  },
  greeting: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 10,
    color: "rgba(34, 0, 0, 0.533333)",
  },
  vanInfo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#595D60",
  },
  separatorLine: {
    height: 1,
    backgroundColor: "#595D60",
    marginVertical: 10,
  },
  mapContainer: {
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  map: {
    width: "90%",
    height: 200,
    borderRadius: 15,
    borderColor: "#FFDE59",
    borderWidth: 2,
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingBottom: 60,
  },
  statusTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#595D60",
  },
  statusButtons: {
    marginBottom: 20,
  },
  statusType: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#595D60",
  },
  buttonContainer1: {
    borderRadius: 15,
    borderColor: "#595D60",
    borderWidth: 2,
    marginBottom: 24,
  },
  buttonContainer: {
    borderRadius: 15,
    borderColor: "#595D60",
    borderWidth: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    backgroundColor: "#ddd",
    borderWidth: 5,
    borderColor: "#FFDE59",
  },
  buttonText: {
    fontSize: 24,
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
    alignItems: "center",
    justifyContent: "center",
  },
  highlightedTabButton: {
    width: 85,
    height: 70,
    top: -15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
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
  highlightBackground: {
    width: 80,
    height: 80,
    backgroundColor: "#D9D9D9",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
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

export default HomeAluno;
