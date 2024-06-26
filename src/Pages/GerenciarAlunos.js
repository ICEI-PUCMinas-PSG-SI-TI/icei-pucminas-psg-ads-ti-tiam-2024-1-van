import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";
import { auth } from "../Database/firebaseConfig";
import { doc, getDoc, query, collection, where, getDocs, updateDoc  } from "firebase/firestore";
import { db } from "../Database/firebaseConfig";

export default function GerenciarAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [vanCode, setVanCode] = useState(''); // Estado para armazenar o código da van do motorista

  useEffect(() => {
    const fetchAlunosDoMotorista = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setVanCode(userDocSnap.data().vanCode); 
            // Busca os alunos com o mesmo vanCode do motorista
            const alunosQuery = query(
              collection(db, "users"),
              where("vanCode", "==", userDocSnap.data().vanCode),
              where("userType", "==", "aluno")
            );
            const querySnapshot = await getDocs(alunosQuery);
            const alunosData = querySnapshot.docs.map((doc) => doc.data());
            setAlunos(alunosData);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados dos alunos:", error);
        Alert.alert("Erro", "Erro ao buscar dados dos alunos.");
      }
    };

    fetchAlunosDoMotorista();
  }, [vanCode]); // Executa a busca sempre que o vanCode do motorista mudar (se aplicável)

  const handleDesvincularAluno = async (alunoUid) => {
    try {
      const alunoDocRef = doc(db, "users", alunoUid);
      await updateDoc(alunoDocRef, {
        vanCode: '', // Remove o código da van do aluno
      });
      Alert.alert("Sucesso", "Aluno desvinculado da van com sucesso!");

      // Atualiza a lista de alunos após desvincular
      setAlunos(alunos.filter((a) => a.uid !== alunoUid));
    } catch (error) {
      console.error("Erro ao desvincular aluno:", error);
      Alert.alert("Erro", "Ocorreu um erro ao desvincular o aluno.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {alunos.map((aluno) => (
        <View key={aluno.uid} style={styles.user}>
          <View style={styles.userImage}>
            <Image source={{ uri: aluno.image }} style={styles.image} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{aluno.displayName}</Text>
            <Text style={styles.userLabel}>Turno: {aluno.turno || "Não informado"}</Text>
            <Text style={styles.userLabel}>Frequência: {aluno.frequencia || "Não informado"}</Text>
            <Text style={styles.userLabel}>Dias de Aula: {aluno.diasAula || "Não informado"}</Text>
            <Text style={styles.userLabel}>Endereço: {aluno.endereco || "Não informado"}</Text>
            <TouchableOpacity style={styles.desvincularButton} onPress={() => handleDesvincularAluno(aluno.uid)}>
              <Text style={styles.desvincularButtonText}>Desvincular</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  userImage: {
    marginRight: 10,
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#FFDE59',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgba(34, 0, 0, 0.533333)",
    marginBottom: 5,
  },
  userLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: "#595D60",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  desvincularButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'flex-start', // Alinha o botão à esquerda
  },
  desvincularButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
